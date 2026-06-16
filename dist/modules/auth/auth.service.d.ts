import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            [key: string]: unknown;
        };
    }>;
    me(userId: string): Promise<{
        [key: string]: unknown;
    }>;
    private toPublicUser;
}
