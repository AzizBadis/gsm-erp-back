export declare class CreateRepairDto {
    contactId: string;
    deviceId: string;
    deviceModelId?: string;
    technicianId?: string;
    repairTypeId?: string;
    imei?: string;
    simNumber?: string;
    gpsIdentifier?: string;
    clientCode?: string;
    gpsModelId?: string;
    operatorId?: string;
    checklist?: string[];
    devicePassword?: string;
    lockReason?: string;
    problem: string;
    diagnosis?: string;
    notes?: string;
    photos?: string[];
    estimatedCost?: number;
}
export declare class AssignRepairDto {
    technicianId: string;
    repairTypeId?: string;
}
export declare class UpdateRepairNotesDto {
    diagnosis?: string;
    notes?: string;
    photos?: string[];
}
export declare class UpdateRepairStatusDto {
    status: string;
}
export declare class RequestPartItemDto {
    productId: string;
    quantity: number;
}
export declare class RequestPartsDto {
    reason?: string;
    items: RequestPartItemDto[];
}
