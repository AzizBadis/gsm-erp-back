"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const prisma_service_1 = require("../../prisma/prisma.service");
const OTP_EXPIRES_IN_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 5;
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: { technician: true, roleDefinition: true },
        });
        if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const code = String((0, crypto_1.randomInt)(0, 1_000_000)).padStart(6, '0');
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
    async verifyOtp(dto) {
        const challenge = await this.prisma.authOtpChallenge.findUnique({
            where: { id: dto.challengeId },
            include: { user: { include: { technician: true, roleDefinition: true } } },
        });
        if (!challenge || challenge.usedAt || challenge.expiresAt <= new Date() || challenge.attempts >= MAX_OTP_ATTEMPTS) {
            throw new common_1.UnauthorizedException('Invalid or expired verification code');
        }
        const isValid = await bcrypt.compare(dto.code, challenge.codeHash);
        if (!isValid) {
            await this.prisma.authOtpChallenge.update({
                where: { id: challenge.id },
                data: { attempts: { increment: 1 } },
            });
            throw new common_1.UnauthorizedException('Invalid or expired verification code');
        }
        if (!challenge.user.isActive) {
            throw new common_1.UnauthorizedException('Inactive user');
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
    async me(userId) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            include: { technician: true, roleDefinition: true },
        });
        return this.toPublicUser(user);
    }
    toPublicUser(user) {
        const { passwordHash: _, ...publicUser } = user;
        return publicUser;
    }
    buildJwtPayload(user) {
        return {
            sub: user.id,
            email: user.email,
            role: user.role,
            roleId: user.roleId,
            technicianId: user.technician?.id,
        };
    }
    async sendOtpEmail(to, code) {
        const smtpUser = this.config.get('GMAIL_SMTP_USER');
        const smtpPass = this.config.get('GMAIL_SMTP_APP_PASSWORD');
        if (!smtpUser) {
            throw new common_1.InternalServerErrorException('GMAIL_SMTP_USER is not configured');
        }
        if (!smtpPass) {
            throw new common_1.InternalServerErrorException('GMAIL_SMTP_APP_PASSWORD is not configured');
        }
        const fromName = this.config.get('GMAIL_SMTP_FROM_NAME', 'GPS Tunisie');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });
        try {
            await transporter.sendMail({
                from: `"${fromName}" <${smtpUser}>`,
                to,
                subject: 'Votre code de connexion GPS Tunisie',
                text: `Votre code de connexion GPS Tunisie est ${code}. Ce code expire dans ${OTP_EXPIRES_IN_MINUTES} minutes.`,
                html: `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
            <h2 style="margin:0 0 12px">Code de connexion</h2>
            <p>Utilisez ce code pour terminer votre connexion a GPS Tunisie.</p>
            <div style="font-size:28px;font-weight:700;letter-spacing:6px;margin:18px 0">${code}</div>
            <p>Ce code expire dans ${OTP_EXPIRES_IN_MINUTES} minutes.</p>
          </div>
        `,
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown SMTP error';
            console.error('Gmail SMTP OTP email failed', {
                message,
                from: smtpUser,
                to,
            });
            throw new common_1.InternalServerErrorException(`Unable to send verification email: ${message}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map