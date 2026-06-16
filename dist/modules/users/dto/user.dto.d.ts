import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    isActive?: boolean;
}
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    fullName?: string;
    role?: UserRole;
    isActive?: boolean;
}
