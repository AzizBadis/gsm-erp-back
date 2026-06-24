import { EssentialTaskPriority, EssentialTaskStatus } from '@prisma/client';
export declare class CreateEssentialTaskDto {
    title: string;
    status?: EssentialTaskStatus;
    priority?: EssentialTaskPriority;
    startAt?: string;
    endAt?: string;
    estimatedHours?: string;
    assignedTo: string;
    assignedUserId?: string;
    documents?: string[];
}
export declare class UpdateEssentialTaskDto {
    title?: string;
    status?: EssentialTaskStatus;
    priority?: EssentialTaskPriority;
    startAt?: string;
    endAt?: string;
    estimatedHours?: string;
    assignedTo?: string;
    assignedUserId?: string;
    documents?: string[];
}
