import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
export declare class ContactsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateContactDto): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
        email: string | null;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        address: string | null;
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
            email: string | null;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            address: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
        email: string | null;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        address: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateContactDto): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
        email: string | null;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        address: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ContactClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
