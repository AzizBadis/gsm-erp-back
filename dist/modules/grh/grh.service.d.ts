import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGrhRecordDto, UpdateGrhRecordDto } from './dto/grh-record.dto';
export declare class GrhService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    dashboard(): Promise<{
        activeEmployees: number;
        presentToday: number;
        pendingLeaves: number;
        payrollTotal: number;
        counts: {
            [k: string]: number;
        };
    }>;
    findAll(type: string, search?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: Prisma.JsonValue;
        description: string | null;
        type: string;
    }[]>;
    create(type: string, dto: CreateGrhRecordDto): Prisma.Prisma__GrhRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: Prisma.JsonValue;
        description: string | null;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateGrhRecordDto): Prisma.Prisma__GrhRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        data: Prisma.JsonValue;
        description: string | null;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Prisma.Prisma__GrhRecordClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    private assertType;
}
