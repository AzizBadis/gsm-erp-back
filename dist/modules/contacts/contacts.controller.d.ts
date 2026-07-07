import { PaginationDto } from '../../common/dto/pagination.dto';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
export declare class ContactsController {
    private readonly service;
    constructor(service: ContactsService);
    create(dto: CreateContactDto): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
        fullName: string;
        phone: string;
        email: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(query: PaginationDto): Promise<{
        data: ({
            abonnements: {
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
            }[];
        } & {
            id: string;
            fullName: string;
            phone: string;
            email: string | null;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
        fullName: string;
        phone: string;
        email: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateContactDto): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
        fullName: string;
        phone: string;
        email: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
