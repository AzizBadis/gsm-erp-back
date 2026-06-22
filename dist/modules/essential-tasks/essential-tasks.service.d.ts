import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEssentialTaskDto, UpdateEssentialTaskDto } from './dto/essential-task.dto';
export declare class EssentialTasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateEssentialTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reference: string;
        status: import(".prisma/client").$Enums.EssentialTaskStatus;
        title: string;
        priority: import(".prisma/client").$Enums.EssentialTaskPriority;
        startAt: Date | null;
        endAt: Date | null;
        estimatedHours: string | null;
        assignedTo: string;
        documents: string[];
    }>;
    findAll(query: PaginationDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            reference: string;
            status: import(".prisma/client").$Enums.EssentialTaskStatus;
            title: string;
            priority: import(".prisma/client").$Enums.EssentialTaskPriority;
            startAt: Date | null;
            endAt: Date | null;
            estimatedHours: string | null;
            assignedTo: string;
            documents: string[];
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__EssentialTaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reference: string;
        status: import(".prisma/client").$Enums.EssentialTaskStatus;
        title: string;
        priority: import(".prisma/client").$Enums.EssentialTaskPriority;
        startAt: Date | null;
        endAt: Date | null;
        estimatedHours: string | null;
        assignedTo: string;
        documents: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateEssentialTaskDto): import(".prisma/client").Prisma.Prisma__EssentialTaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reference: string;
        status: import(".prisma/client").$Enums.EssentialTaskStatus;
        title: string;
        priority: import(".prisma/client").$Enums.EssentialTaskPriority;
        startAt: Date | null;
        endAt: Date | null;
        estimatedHours: string | null;
        assignedTo: string;
        documents: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__EssentialTaskClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    private toTaskData;
    private nextReference;
}
