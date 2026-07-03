import type { AuthUser } from '../../common/decorators/current-user.decorator';
import { PrismaService } from '../../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    home(): Promise<{
        generatedAt: string;
        locations: string[];
        kpis: {
            salesTotal: number;
            net: number;
            unpaidInvoices: number;
            salesReturns: number;
            purchasesTotal: number;
            unpaidPurchases: number;
            purchaseReturns: number;
            expenses: number;
        };
        charts: {
            sales30Days: {
                date: string;
                'Tous les lieux': number;
            }[];
            commercialYear: {
                date: string;
                'Tous les lieux': number;
            }[];
        };
        tables: {
            unpaidInvoices: {
                client: string;
                invoiceNumber: string;
                dueAmount: number;
            }[];
            unpaidPurchases: {
                supplier: string;
                reference: string;
                dueAmount: number;
            }[];
            stockAlerts: {
                product: string;
                location: string;
                stock: number;
            }[];
            saleOrders: never[];
            purchaseRequests: {
                action: string;
                date: Date;
                reference: string;
                location: string;
                status: string;
                requiredBefore: null;
                addedBy: string;
            }[];
            purchaseOrders: {
                action: string;
                date: Date;
                reference: string;
                location: string;
                supplier: string;
                status: import(".prisma/client").$Enums.PurchaseStatus;
                remainingQuantity: number;
                addedBy: string;
            }[];
            pendingShipments: {
                action: string;
                date: Date;
                invoiceNumber: string;
                client: string;
                phone: string;
                location: string;
                shippingStatus: string;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            }[];
        };
        totals: {
            unpaidInvoices: number;
            unpaidPurchases: number;
            stockAlerts: number;
            saleOrders: number;
            purchaseRequests: number;
            purchaseOrders: number;
            pendingShipments: number;
        };
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
    technicianStats(technicianId: string): Promise<{
        assigned: number;
        finished: number;
        waitingParts: number;
        totalDurationSec: number;
    }>;
    partRequestStatusLabels(): ("DELIVERED" | "PENDING" | "APPROVED" | "REJECTED")[];
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
    private dailySeries;
    private monthlySeries;
    private purchaseTableRow;
    private sum;
    private due;
}
