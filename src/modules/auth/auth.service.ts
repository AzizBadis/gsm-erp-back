import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { technician: true, roleDefinition: true },
    });

    if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      roleId: user.roleId,
      technicianId: user.technician?.id,
    };

    return {
      accessToken: await this.jwt.signAsync(payload),
      user: this.toPublicUser(user),
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
}
