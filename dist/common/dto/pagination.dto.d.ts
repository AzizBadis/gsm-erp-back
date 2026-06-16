import { RepairStatus } from '@prisma/client';
export declare class PaginationDto {
    page: number;
    limit: number;
    search?: string;
}
export declare class RepairFilterDto extends PaginationDto {
    status?: RepairStatus;
    technicianId?: string;
    from?: string;
    to?: string;
}
