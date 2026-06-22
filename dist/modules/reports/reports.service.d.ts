import { PrismaService } from '../../prisma/prisma.service';
type Report = {
    title: string;
    summary?: Array<{
        label: string;
        value: number | string;
    }>;
    columns: Array<{
        key: string;
        label: string;
    }>;
    rows: Record<string, unknown>[];
    chart?: Array<{
        name: string;
        value: number;
    }>;
};
export declare class ReportsService {
    private readonly p;
    constructor(p: PrismaService);
    get(type: string): Promise<Report>;
}
export {};
