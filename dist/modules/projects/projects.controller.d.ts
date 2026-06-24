import { type AuthUser } from '../../common/decorators/current-user.decorator';
import { CategoryDto, CreateProjectDto, CreateTaskDto, SettingsDto, TimeLogDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly s;
    constructor(s: ProjectsService);
    projects(): import(".prisma/client").Prisma.PrismaPromise<({
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: string;
            priority: string;
            assignedTo: string | null;
            startDate: Date | null;
            endDate: Date | null;
            customFields: import("@prisma/client/runtime/library").JsonValue;
            projectId: string;
            subject: string;
        }[];
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        } | null;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        status: string;
        createdBy: string;
        categoryId: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    create(d: CreateProjectDto, u: AuthUser): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        status: string;
        createdBy: string;
        categoryId: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: import("@prisma/client/runtime/library").JsonValue;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    tasks(): import(".prisma/client").Prisma.PrismaPromise<({
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            status: string;
            createdBy: string;
            categoryId: string | null;
            startDate: Date | null;
            endDate: Date | null;
            customFields: import("@prisma/client/runtime/library").JsonValue;
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
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        priority: string;
        assignedTo: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: import("@prisma/client/runtime/library").JsonValue;
        projectId: string;
        subject: string;
    })[]>;
    createTask(d: CreateTaskDto): import(".prisma/client").Prisma.Prisma__ProjectTaskClient<{
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            status: string;
            createdBy: string;
            categoryId: string | null;
            startDate: Date | null;
            endDate: Date | null;
            customFields: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        priority: string;
        assignedTo: string | null;
        startDate: Date | null;
        endDate: Date | null;
        customFields: import("@prisma/client/runtime/library").JsonValue;
        projectId: string;
        subject: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    time(d: TimeLogDto): import(".prisma/client").Prisma.Prisma__ProjectTimeLogClient<{
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
    categories(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }[]>;
    category(d: CategoryDto): import(".prisma/client").Prisma.Prisma__ProjectCategoryClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    removeCategory(id: string): import(".prisma/client").Prisma.Prisma__ProjectCategoryClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    settings(): import(".prisma/client").Prisma.Prisma__ProjectSettingsClient<{
        id: string;
        updatedAt: Date;
        customField1: string | null;
        customField2: string | null;
        customField3: string | null;
        customField4: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    save(d: SettingsDto): import(".prisma/client").Prisma.Prisma__ProjectSettingsClient<{
        id: string;
        updatedAt: Date;
        customField1: string | null;
        customField2: string | null;
        customField3: string | null;
        customField4: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
