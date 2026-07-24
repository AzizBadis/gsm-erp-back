import { AbonnementStatus } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AbonnementsService } from './abonnements.service';
import { CreateAbonnementDto, UpdateAbonnementDto } from './dto/abonnement.dto';
export declare class AbonnementsController {
    private readonly service;
    constructor(service: AbonnementsService);
    findAll(query: PaginationDto & {
        contactId?: string;
        status?: AbonnementStatus;
    }): Promise<{
        data: ({
            contact: {
                id: string;
                email: string | null;
                fullName: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string;
                address: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            endsAt: Date;
            contactId: string;
            label: string;
            startsAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.AbonnementStatus;
            notes: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateAbonnementDto): Promise<{
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endsAt: Date;
        contactId: string;
        label: string;
        startsAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.AbonnementStatus;
        notes: string | null;
    }>;
    update(id: string, dto: UpdateAbonnementDto): Promise<{
        contact: {
            id: string;
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endsAt: Date;
        contactId: string;
        label: string;
        startsAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.AbonnementStatus;
        notes: string | null;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__AbonnementClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
