export declare class CreateProjectDto {
    name: string;
    description?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    categoryId?: string;
    customFields?: Record<string, unknown>;
}
export declare class CreateTaskDto {
    projectId: string;
    subject: string;
    description?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
    startDate?: string;
    endDate?: string;
    customFields?: Record<string, unknown>;
}
export declare class CategoryDto {
    name: string;
    description?: string;
}
export declare class TimeLogDto {
    projectId: string;
    taskId?: string;
    userName: string;
    minutes: number;
    note?: string;
}
export declare class SettingsDto {
    customField1?: string;
    customField2?: string;
    customField3?: string;
    customField4?: string;
}
