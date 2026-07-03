import { AbonnementStatus } from '@prisma/client';
export declare class CreateAbonnementDto {
    contactId: string;
    label: string;
    startsAt: string;
    endsAt: string;
    amount?: number;
    status?: AbonnementStatus;
    notes?: string;
}
export declare class UpdateAbonnementDto {
    label?: string;
    startsAt?: string;
    endsAt?: string;
    amount?: number;
    status?: AbonnementStatus;
    notes?: string;
}
