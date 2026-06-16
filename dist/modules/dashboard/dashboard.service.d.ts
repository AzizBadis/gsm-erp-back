import { PrismaService } from '../../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    admin(): Promise<{
        users: number;
        contacts: number;
        repairs: number;
        openRepairs: number;
        unpaidInvoices: number;
        lowStockProducts: number;
    }>;
    repairsByStatus(): Promise<{
        status: import(".prisma/client").$Enums.RepairStatus;
        count: number;
    }[]>;
    repairsByTechnician(): Promise<{
        technicianId: string | null;
        technician: string | undefined;
        count: number;
    }[]>;
    cashierPartRequests(): import(".prisma/client").Prisma.GetPartRequestGroupByPayload<{
        by: "status"[];
        _count: {
            status: true;
        };
    }>;
    technicianStats(technicianId: string): Promise<{
        assigned: number;
        finished: number;
        waitingParts: number;
        totalDurationSec: number;
    }>;
    partRequestStatusLabels(): ("DELIVERED" | "PENDING" | "APPROVED" | "REJECTED")[];
}
