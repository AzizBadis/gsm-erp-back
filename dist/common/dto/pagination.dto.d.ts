export declare class PaginationDto {
    page: number;
    limit: number;
    search?: string;
}
export declare class RepairFilterDto extends PaginationDto {
    status?: string;
    technicianId?: string;
    from?: string;
    to?: string;
}
