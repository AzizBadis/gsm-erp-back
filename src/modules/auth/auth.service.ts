import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, VerifyOtpDto } from './dto/login.dto';

// const OTP_EXPIRES_IN_MINUTES = 10;
// const MAX_OTP_ATTEMPTS = 5;

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

    // OTP login step disabled: keep this block as a reference if two-step
    // verification needs to be restored later.
    // const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    // const expiresAt = new Date(Date.now() + OTP_EXPIRES_IN_MINUTES * 60 * 1000);
    // const challenge = await this.prisma.authOtpChallenge.create({
    //   data: {
    //     userId: user.id,
    //     codeHash: await bcrypt.hash(code, 12),
    //     expiresAt,
    //   },
    // });
    //
    // await this.sendOtpEmail(user.email, code);
    //
    // return {
    //   otpRequired: true,
    //   challengeId: challenge.id,
    //   expiresAt,
    //   email: user.email,
    // };

    const payload = this.buildJwtPayload(user);

    return {
      accessToken: await this.jwt.signAsync(payload),
      user: this.toPublicUser(user),
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    void dto;
    // OTP verification disabled. Historical implementation kept below for
    // quick rollback if the project needs email verification again.
    // const challenge = await this.prisma.authOtpChallenge.findUnique({
    //   where: { id: dto.challengeId },
    //   include: { user: { include: { technician: true, roleDefinition: true } } },
    // });
    //
    // if (!challenge || challenge.usedAt || challenge.expiresAt <= new Date() || challenge.attempts >= MAX_OTP_ATTEMPTS) {
    //   throw new UnauthorizedException('Invalid or expired verification code');
    // }
    //
    // const isValid = await bcrypt.compare(dto.code, challenge.codeHash);
    // if (!isValid) {
    //   await this.prisma.authOtpChallenge.update({
    //     where: { id: challenge.id },
    //     data: { attempts: { increment: 1 } },
    //   });
    //   throw new UnauthorizedException('Invalid or expired verification code');
    // }
    //
    // if (!challenge.user.isActive) {
    //   throw new UnauthorizedException('Inactive user');
    // }
    //
    // await this.prisma.authOtpChallenge.update({
    //   where: { id: challenge.id },
    //   data: { usedAt: new Date() },
    // });
    //
    // const payload = this.buildJwtPayload(challenge.user);
    //
    // return {
    //   accessToken: await this.jwt.signAsync(payload),
    //   user: this.toPublicUser(challenge.user),
    // };
    throw new UnauthorizedException('OTP verification is disabled');
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

  // private async sendOtpEmail(to: string, code: string) {
  //   const smtpUser = this.config.get<string>('GMAIL_SMTP_USER');
  //   const smtpPass = this.config.get<string>('GMAIL_SMTP_APP_PASSWORD');
  //
  //   if (!smtpUser) {
  //     throw new InternalServerErrorException('GMAIL_SMTP_USER is not configured');
  //   }
  //   if (!smtpPass) {
  //     throw new InternalServerErrorException('GMAIL_SMTP_APP_PASSWORD is not configured');
  //   }
  //
  //   const fromName = this.config.get<string>('GMAIL_SMTP_FROM_NAME', 'ERP System');
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: smtpUser,
  //       pass: smtpPass,
  //     },
  //   });
  //
  //   try {
  //     await transporter.sendMail({
  //       from: `"${fromName}" <${smtpUser}>`,
  //       to,
  //       subject: 'Votre code de connexion ERP System',
  //       text: `Votre code de connexion ERP System est ${code}. Ce code expire dans ${OTP_EXPIRES_IN_MINUTES} minutes.`,
  //       html: `
  //         <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
  //           <h2 style="margin:0 0 12px">Code de connexion</h2>
  //           <p>Utilisez ce code pour terminer votre connexion a ERP System.</p>
  //           <div style="font-size:28px;font-weight:700;letter-spacing:6px;margin:18px 0">${code}</div>
  //           <p>Ce code expire dans ${OTP_EXPIRES_IN_MINUTES} minutes.</p>
  //         </div>
  //       `,
  //     });
  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : 'Unknown SMTP error';
  //     console.error('Gmail SMTP OTP email failed', {
  //       message,
  //       from: smtpUser,
  //       to,
  //     });
  //     throw new InternalServerErrorException(`Unable to send verification email: ${message}`);
  //   }
  // }
}
