import { ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto } from './dto/reservation.dto';
export declare class ReservationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(from?: string, to?: string, location?: string): import(".prisma/client").Prisma.PrismaPromise<({
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        } | null;
    } & {
        id: string;
        contactId: string | null;
        startsAt: Date;
        endsAt: Date;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        location: string;
        clientName: string;
        tableName: string | null;
        servicePerson: string | null;
        recurrenceId: string | null;
    })[]>;
    create(dto: CreateReservationDto, createdBy: string): Promise<({
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        } | null;
    } & {
        id: string;
        contactId: string | null;
        startsAt: Date;
        endsAt: Date;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        location: string;
        clientName: string;
        tableName: string | null;
        servicePerson: string | null;
        recurrenceId: string | null;
    })[]>;
    updateStatus(id: string, status: ReservationStatus): import(".prisma/client").Prisma.Prisma__ReservationClient<{
        contact: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
        } | null;
    } & {
        id: string;
        contactId: string | null;
        startsAt: Date;
        endsAt: Date;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        location: string;
        clientName: string;
        tableName: string | null;
        servicePerson: string | null;
        recurrenceId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
