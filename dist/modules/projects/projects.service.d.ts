import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryDto, CreateProjectDto, CreateTaskDto, SettingsDto, TimeLogDto } from './dto/project.dto';
export declare class ProjectsService {
    private readonly p;
    constructor(p: PrismaService);
    projects(): Prisma.PrismaPromise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        } | null;
        tasks: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            priority: string;
            assignedTo: string | null;
            startDate: Date | null;
            endDate: Date | null;
            customFields: Prisma.JsonValue;
            projectId: string;
            subject: string;
        }[];
        timeLogs: {
            id: string;
            note: string | null;
            projectId: string;
            userName: string;
            minutes: number;
            loggedAt: Date;
            taskId: string | null;
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        createdBy: string;
        categoryId: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: Prisma.JsonValue;
    })[]>;
    createProject(d: CreateProjectDto, createdBy: string): Prisma.Prisma__ProjectClient<{
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        } | null;
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        createdBy: string;
        categoryId: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: Prisma.JsonValue;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    tasks(): Prisma.PrismaPromise<({
        project: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            createdBy: string;
            categoryId: string | null;
            startDate: Date | null;
            endDate: Date | null;
            customFields: Prisma.JsonValue;
        };
        timeLogs: {
            id: string;
            note: string | null;
            projectId: string;
            userName: string;
            minutes: number;
            loggedAt: Date;
            taskId: string | null;
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        priority: string;
        assignedTo: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: Prisma.JsonValue;
        projectId: string;
        subject: string;
    })[]>;
    createTask(d: CreateTaskDto): Prisma.Prisma__ProjectTaskClient<{
        project: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            createdBy: string;
            categoryId: string | null;
            startDate: Date | null;
            endDate: Date | null;
            customFields: Prisma.JsonValue;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        priority: string;
        assignedTo: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: Prisma.JsonValue;
        projectId: string;
        subject: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    categories(): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }[]>;
    createCategory(d: CategoryDto): Prisma.Prisma__ProjectCategoryClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteCategory(id: string): Prisma.Prisma__ProjectCategoryClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createTimeLog(d: TimeLogDto): Prisma.Prisma__ProjectTimeLogClient<{
        id: string;
        note: string | null;
        projectId: string;
        userName: string;
        minutes: number;
        loggedAt: Date;
        taskId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    reports(): Promise<{
        byProject: {
            name: string;
            minutes: number;
        }[];
        byUser: {
            name: string;
            minutes: number;
        }[];
    }>;
    settings(): Prisma.Prisma__ProjectSettingsClient<{
        id: string;
        updatedAt: Date;
        customField1: string | null;
        customField2: string | null;
        customField3: string | null;
        customField4: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    saveSettings(d: SettingsDto): Prisma.Prisma__ProjectSettingsClient<{
        id: string;
        updatedAt: Date;
        customField1: string | null;
        customField2: string | null;
        customField3: string | null;
        customField4: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
