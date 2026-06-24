export type AuthUser = {
    sub: string;
    email: string;
    role: string;
    roleId?: string;
    technicianId?: string;
};
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
