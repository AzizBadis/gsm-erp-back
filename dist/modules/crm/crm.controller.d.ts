import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { CreateCrmRecordDto } from './dto/crm.dto';
import { CrmService } from './crm.service';
export declare class CrmController {
    private readonly s;
    constructor(s: CrmService);
    dashboard(): Promise<{
        contacts: number;
        prospects: number;
        followUps: number;
        campaigns: number;
        proposals: number;
        sources: number;
        byStatus: Record<string, number>;
    }>;
    reports(): Promise<{
        type: string;
        total: number;
    }[]>;
    list(t: string, q?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        type: string;
        createdBy: string;
    }[]>;
    create(t: string, d: CreateCrmRecordDto, u: AuthUser): import(".prisma/client").Prisma.Prisma__CrmRecordClient<{
        id: string;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        type: string;
        createdBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, d: CreateCrmRecordDto): import(".prisma/client").Prisma.Prisma__CrmRecordClient<{
        id: string;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        type: string;
        createdBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__CrmRecordClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
