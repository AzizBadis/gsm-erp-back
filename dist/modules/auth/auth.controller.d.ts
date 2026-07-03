import { AuthService } from './auth.service';
import { LoginDto, VerifyOtpDto } from './dto/login.dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
        otpRequired: boolean;
        challengeId: string;
        expiresAt: Date;
        email: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        accessToken: string;
        user: {
            [key: string]: unknown;
        };
    }>;
    me(user: {
        sub: string;
    }): Promise<{
        [key: string]: unknown;
    }>;
}
