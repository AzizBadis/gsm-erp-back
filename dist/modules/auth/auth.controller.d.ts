import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
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
