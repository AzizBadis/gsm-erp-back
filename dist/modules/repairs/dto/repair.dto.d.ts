import { RepairStatus } from '@prisma/client';
export declare class CreateRepairDto {
    contactId: string;
    deviceId: string;
    deviceModelId?: string;
    technicianId?: string;
    imei?: string;
    problem: string;
    diagnosis?: string;
    notes?: string;
    photos?: string[];
    estimatedCost?: number;
}
export declare class AssignRepairDto {
    technicianId: string;
}
export declare class UpdateRepairNotesDto {
    diagnosis?: string;
    notes?: string;
    photos?: string[];
}
export declare class UpdateRepairStatusDto {
    status: RepairStatus;
}
export declare class RequestPartItemDto {
    productId: string;
    quantity: number;
}
export declare class RequestPartsDto {
    reason?: string;
    items: RequestPartItemDto[];
}
