import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly s;
    constructor(s: ReportsService);
    get(type: string): Promise<{
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
    }>;
}
