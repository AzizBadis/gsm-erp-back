import { ReservationStatus } from '@prisma/client';
import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { CreateReservationDto } from './dto/reservation.dto';
import { ReservationsService } from './reservations.service';
export declare class ReservationsController {
    private readonly s;
    constructor(s: ReservationsService);
    list(f?: string, t?: string, l?: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    create(d: CreateReservationDto, u: AuthUser): Promise<({
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
    status(id: string, status: ReservationStatus): import(".prisma/client").Prisma.Prisma__ReservationClient<{
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
