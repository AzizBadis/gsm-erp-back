export declare class CreateRepairTypeDto {
    name: string;
    commissionRate: number;
    managedByAdmin?: boolean;
}
export declare class UpdateRepairTypeDto {
    name?: string;
    commissionRate?: number;
    managedByAdmin?: boolean;
}
export declare class BulkRepairTypeItemDto {
    id?: string;
    name: string;
    commissionRate: number;
    managedByAdmin: boolean;
}
export declare class BulkSaveRepairTypesDto {
    types: BulkRepairTypeItemDto[];
}
export declare class BulkStatusMappingItemDto {
    event: string;
    status: string;
}
export declare class BulkSaveStatusMappingsDto {
    mappings: BulkStatusMappingItemDto[];
}
export declare class CommissionQueryDto {
    page?: number;
    limit?: number;
    technicianId?: string;
    startDate?: string;
    endDate?: string;
}
