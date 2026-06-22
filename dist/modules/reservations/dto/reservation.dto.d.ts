import { ReservationStatus } from '@prisma/client';
export declare class CreateReservationDto {
    contactId?: string;
    clientName: string;
    startsAt: string;
    endsAt: string;
    tableName?: string;
    location: string;
    servicePerson?: string;
    status?: ReservationStatus;
    notes?: string;
    repeatEvery?: number;
    repeatUnit?: string;
    repeatCount?: number;
}
