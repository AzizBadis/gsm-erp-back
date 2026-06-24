import { CreateGrhRecordDto, UpdateGrhRecordDto } from './dto/grh-record.dto';
import { GrhService } from './grh.service';
export declare class GrhController {
    private readonly grh;
    constructor(grh: GrhService);
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
        description: string | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        type: string;
    }[]>;
    create(type: string, dto: CreateGrhRecordDto): import(".prisma/client").Prisma.Prisma__GrhRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateGrhRecordDto): import(".prisma/client").Prisma.Prisma__GrhRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__GrhRecordClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
