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
        contactId: string | null;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
        createdBy: string;
        location: string;
        startsAt: Date;
        endsAt: Date;
        clientName: string;
        tableName: string | null;
        servicePerson: string | null;
        recurrenceId: string | null;
    })[]>;
    create(d: CreateReservationDto, u: AuthUser): Promise<({
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
        contactId: string | null;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
        createdBy: string;
        location: string;
        startsAt: Date;
        endsAt: Date;
        clientName: string;
        tableName: string | null;
        servicePerson: string | null;
        recurrenceId: string | null;
    })[]>;
    status(id: string, status: ReservationStatus): import(".prisma/client").Prisma.Prisma__ReservationClient<{
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
        contactId: string | null;
        status: import(".prisma/client").$Enums.ReservationStatus;
        notes: string | null;
        createdBy: string;
        location: string;
        startsAt: Date;
        endsAt: Date;
        clientName: string;
        tableName: string | null;
        servicePerson: string | null;
        recurrenceId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
