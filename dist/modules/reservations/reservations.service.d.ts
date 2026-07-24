import { ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto } from './dto/reservation.dto';
export declare class ReservationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(from?: string, to?: string, location?: string): import(".prisma/client").Prisma.PrismaPromise<({
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endsAt: Date;
        contactId: string | null;
        startsAt: Date;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
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
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endsAt: Date;
        contactId: string | null;
        startsAt: Date;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
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
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endsAt: Date;
        contactId: string | null;
        startsAt: Date;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
        createdBy: string;
        location: string;
        clientName: string;
        tableName: string | null;
        servicePerson: string | null;
        recurrenceId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
