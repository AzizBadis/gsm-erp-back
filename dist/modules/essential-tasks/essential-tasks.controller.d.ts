import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateEssentialTaskDto, UpdateEssentialTaskDto } from './dto/essential-task.dto';
import { EssentialTasksService } from './essential-tasks.service';
export declare class EssentialTasksController {
    private readonly service;
    constructor(service: EssentialTasksService);
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
        assignedUserId: string | null;
    }>;
    findAll(query: PaginationDto): Promise<{
        data: ({
            assignedUser: {
                id: string;
                email: string;
                fullName: string;
            } | null;
        } & {
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
            assignedUserId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findMine(query: PaginationDto, user: AuthUser): Promise<{
        data: ({
            assignedUser: {
                id: string;
                email: string;
                fullName: string;
            } | null;
        } & {
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
            assignedUserId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    updateMineStatus(id: string, status: UpdateEssentialTaskDto['status'], user: AuthUser): Promise<{
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
        assignedUserId: string | null;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__EssentialTaskClient<{
        assignedUser: {
            id: string;
            email: string;
            fullName: string;
        } | null;
    } & {
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
        assignedUserId: string | null;
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
        assignedUserId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__EssentialTaskClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
