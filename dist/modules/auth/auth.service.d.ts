import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, VerifyOtpDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            [key: string]: unknown;
        };
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<void>;
    me(userId: string): Promise<{
        [key: string]: unknown;
    }>;
    private toPublicUser;
    private buildJwtPayload;
}
