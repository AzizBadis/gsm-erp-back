import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, VerifyOtpDto } from './dto/login.dto';

const OTP_EXPIRES_IN_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 5;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { technician: true, roleDefinition: true },
    });

    if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    const expiresAt = new Date(Date.now() + OTP_EXPIRES_IN_MINUTES * 60 * 1000);
    const challenge = await this.prisma.authOtpChallenge.create({
      data: {
        userId: user.id,
        codeHash: await bcrypt.hash(code, 12),
        expiresAt,
      },
    });

    await this.sendOtpEmail(user.email, code);

    return {
      otpRequired: true,
      challengeId: challenge.id,
      expiresAt,
      email: user.email,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const challenge = await this.prisma.authOtpChallenge.findUnique({
      where: { id: dto.challengeId },
      include: { user: { include: { technician: true, roleDefinition: true } } },
    });

    if (!challenge || challenge.usedAt || challenge.expiresAt <= new Date() || challenge.attempts >= MAX_OTP_ATTEMPTS) {
      throw new UnauthorizedException('Invalid or expired verification code');
    }

    const isValid = await bcrypt.compare(dto.code, challenge.codeHash);
    if (!isValid) {
      await this.prisma.authOtpChallenge.update({
        where: { id: challenge.id },
        data: { attempts: { increment: 1 } },
      });
      throw new UnauthorizedException('Invalid or expired verification code');
    }

    if (!challenge.user.isActive) {
      throw new UnauthorizedException('Inactive user');
    }

    await this.prisma.authOtpChallenge.update({
      where: { id: challenge.id },
      data: { usedAt: new Date() },
    });

    const payload = this.buildJwtPayload(challenge.user);

    return {
      accessToken: await this.jwt.signAsync(payload),
      user: this.toPublicUser(challenge.user),
    };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: { technician: true, roleDefinition: true },
    });
    return this.toPublicUser(user);
  }

  private toPublicUser(user: { passwordHash: string; [key: string]: unknown }) {
    const { passwordHash: _, ...publicUser } = user;
    return publicUser;
  }

  private buildJwtPayload(user: { id: string; email: string; role: string; roleId?: string | null; technician?: { id: string } | null }) {
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
      roleId: user.roleId,
      technicianId: user.technician?.id,
    };
  }

  private async sendOtpEmail(to: string, code: string) {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('RESEND_API_KEY is not configured');
    }

    const from = this.config.get<string>('RESEND_FROM_EMAIL', 'GPS Tunisie <onboarding@resend.dev>');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: 'Votre code de connexion GPS Tunisie',
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
            <h2 style="margin:0 0 12px">Code de connexion</h2>
            <p>Utilisez ce code pour terminer votre connexion a GPS Tunisie.</p>
            <div style="font-size:28px;font-weight:700;letter-spacing:6px;margin:18px 0">${code}</div>
            <p>Ce code expire dans ${OTP_EXPIRES_IN_MINUTES} minutes.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      console.error('Resend OTP email failed', {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
        from,
        to,
      });
      throw new InternalServerErrorException('Unable to send verification email');
    }
  }
}
