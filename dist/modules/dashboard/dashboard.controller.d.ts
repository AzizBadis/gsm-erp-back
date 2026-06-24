import { AuthUser } from '../../common/decorators/current-user.decorator';
import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboard;
    constructor(dashboard: DashboardService);
    topbar(user: AuthUser): Promise<{
        myTasks: number;
        activeRepairs: number;
        todayReservations: number;
        pendingPartRequests: number;
        unpaidInvoices: number;
        serverTime: string;
    }>;
    admin(): Promise<{
        users: number;
        contacts: number;
        repairs: number;
        openRepairs: number;
        unpaidInvoices: number;
        lowStockProducts: number;
    }>;
    repairsByStatus(): Promise<{
        status: string;
        name: string;
        color: string;
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
    myStats(user: AuthUser): Promise<{
        assigned: number;
        finished: number;
        waitingParts: number;
        totalDurationSec: number;
    }>;
    accounting(): Promise<{
        plan: {
            name: string;
            balance: number;
        }[];
        assets: {
            name: string;
            value: number;
        }[];
        expenses: {
            name: string;
            value: number;
        }[];
        revenue: {
            name: string;
            value: number;
        }[];
        equity: {
            name: string;
            value: number;
        }[];
        liabilities: {
            name: string;
            value: number;
        }[];
    }>;
}
