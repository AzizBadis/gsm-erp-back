import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCrmRecordDto } from './dto/crm.dto';
export declare class CrmService {
    private readonly p;
    constructor(p: PrismaService);
    dashboard(): Promise<{
        contacts: number;
        prospects: number;
        followUps: number;
        campaigns: number;
        proposals: number;
        sources: number;
        byStatus: Record<string, number>;
    }>;
    findAll(type: string, search?: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: Prisma.JsonValue;
        status: string | null;
        description: string | null;
        type: string;
        createdBy: string;
    }[]>;
    create(type: string, dto: CreateCrmRecordDto, createdBy: string): Prisma.Prisma__CrmRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: Prisma.JsonValue;
        status: string | null;
        description: string | null;
        type: string;
        createdBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: CreateCrmRecordDto): Prisma.Prisma__CrmRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: Prisma.JsonValue;
        status: string | null;
        description: string | null;
        type: string;
        createdBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Prisma.Prisma__CrmRecordClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    reports(): Promise<{
        type: string;
        total: number;
    }[]>;
    private assert;
}
