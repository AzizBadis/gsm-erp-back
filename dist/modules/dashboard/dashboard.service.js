"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const repair_status_1 = require("../../common/constants/repair-status");
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async topbar(user) {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date(startOfToday);
        endOfToday.setDate(endOfToday.getDate() + 1);
        const isAdmin = user.role === client_1.UserRole.ADMIN;
        const isCashier = user.role === client_1.UserRole.CASHIER;
        const isTechnician = user.role === client_1.UserRole.TECHNICIAN;
        const [myTasks, technicianRepairs, openRepairs, todayReservations, pendingPartRequests, unpaidInvoices,] = await Promise.all([
            this.prisma.essentialTask.count({ where: { assignedUserId: user.sub, status: 'NEW' } }),
            isTechnician && user.technicianId
                ? this.prisma.repair.count({
                    where: {
                        technicianId: user.technicianId,
                        status: { notIn: [repair_status_1.RepairStatus.DELIVERED, repair_status_1.RepairStatus.CANCELLED, repair_status_1.RepairStatus.FINISHED] },
                    },
                })
                : Promise.resolve(0),
            isAdmin
                ? this.prisma.repair.count({ where: { status: { notIn: [repair_status_1.RepairStatus.DELIVERED, repair_status_1.RepairStatus.CANCELLED] } } })
                : Promise.resolve(0),
            (isAdmin || isCashier)
                ? this.prisma.reservation.count({ where: { startsAt: { gte: startOfToday, lt: endOfToday } } })
                : Promise.resolve(0),
            (isAdmin || isCashier)
                ? this.prisma.partRequest.count({ where: { status: client_1.PartRequestStatus.PENDING } })
                : Promise.resolve(0),
            (isAdmin || isCashier)
                ? this.prisma.invoice.count({ where: { paymentStatus: { not: 'PAID' } } })
                : Promise.resolve(0),
        ]);
        return {
            myTasks,
            activeRepairs: isTechnician ? technicianRepairs : openRepairs,
            todayReservations,
            pendingPartRequests,
            unpaidInvoices,
            serverTime: new Date().toISOString(),
        };
    }
    async admin() {
        const [users, contacts, repairs, openRepairs, unpaidInvoices, lowStockProducts] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.contact.count(),
            this.prisma.repair.count(),
            this.prisma.repair.count({ where: { status: { notIn: [repair_status_1.RepairStatus.DELIVERED, repair_status_1.RepairStatus.CANCELLED] } } }),
            this.prisma.invoice.count({ where: { paymentStatus: { not: 'PAID' } } }),
            this.prisma.product.count({ where: { stockQty: { lte: this.prisma.product.fields.minStockQty } } }),
        ]);
        return { users, contacts, repairs, openRepairs, unpaidInvoices, lowStockProducts };
    }
    async repairsByStatus() {
        const [groupedStatuses, customStatuses] = await Promise.all([
            this.prisma.repair.groupBy({ by: ['status'], _count: { status: true } }),
            this.prisma.customStatus.findMany(),
        ]);
        return groupedStatuses.map((statusGroup) => {
            const custom = customStatuses.find((cs) => cs.name === statusGroup.status);
            return {
                status: statusGroup.status,
                name: custom?.label ?? statusGroup.status,
                color: custom?.color ?? '#94a3b8',
                count: statusGroup._count.status,
            };
        });
    }
    async repairsByTechnician() {
        const groupedTechnicians = await this.prisma.repair.groupBy({
            by: ['technicianId'],
            where: { technicianId: { not: null } },
            _count: { technicianId: true },
        });
        const technicians = await this.prisma.technician.findMany({ include: { user: true } });
        return groupedTechnicians.map((technicianGroup) => ({
            technicianId: technicianGroup.technicianId,
            technician: technicians.find((tech) => tech.id === technicianGroup.technicianId)?.user.fullName,
            count: technicianGroup._count.technicianId,
        }));
    }
    cashierPartRequests() {
        return this.prisma.partRequest.groupBy({ by: ['status'], _count: { status: true } });
    }
    async technicianStats(technicianId) {
        const [assigned, finished, waitingParts, timer] = await Promise.all([
            this.prisma.repair.count({ where: { technicianId } }),
            this.prisma.repair.count({ where: { technicianId, status: repair_status_1.RepairStatus.FINISHED } }),
            this.prisma.repair.count({ where: { technicianId, status: repair_status_1.RepairStatus.WAITING_PARTS } }),
            this.prisma.repairTimerLog.aggregate({ where: { repair: { technicianId } }, _sum: { durationSec: true } }),
        ]);
        return { assigned, finished, waitingParts, totalDurationSec: timer._sum.durationSec ?? 0 };
    }
    partRequestStatusLabels() {
        return Object.values(client_1.PartRequestStatus);
    }
    async accounting() {
        const [invoices, purchases, expenses, products, accounts] = await Promise.all([
            this.prisma.invoice.findMany({ select: { total: true, paidAmount: true, documentType: true } }),
            this.prisma.purchase.findMany({ select: { total: true, paidAmount: true, kind: true } }),
            this.prisma.expense.findMany({ select: { total: true } }),
            this.prisma.product.findMany({ select: { stockQty: true, unitPrice: true } }),
            this.prisma.paymentAccount.findMany({ include: { transactions: true } }),
        ]);
        const sales = invoices.filter(i => i.documentType === 'SALE').reduce((sum, i) => sum + Number(i.total), 0);
        const receivables = invoices.reduce((sum, i) => sum + Math.max(0, Number(i.total) - Number(i.paidAmount)), 0);
        const purchaseCost = purchases.filter(p => p.kind === 'PURCHASE').reduce((sum, p) => sum + Number(p.total), 0);
        const payables = purchases.reduce((sum, p) => sum + Math.max(0, Number(p.total) - Number(p.paidAmount)), 0);
        const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.total), 0);
        const inventory = products.reduce((sum, p) => sum + p.stockQty * Number(p.unitPrice), 0);
        const cash = accounts.reduce((sum, account) => sum + Number(account.initialBalance) + account.transactions.reduce((s, t) => s + (t.direction === client_1.AccountTransactionDirection.CREDIT ? Number(t.amount) : -Number(t.amount)), 0), 0);
        const revenue = sales;
        const assets = Math.max(0, cash) + receivables + inventory;
        const liabilities = payables;
        const equity = assets - liabilities;
        return {
            plan: [
                { name: 'Actif', balance: assets },
                { name: 'Dépenses', balance: expenseTotal + purchaseCost },
                { name: 'Revenus', balance: revenue },
                { name: 'Capitaux propres', balance: equity },
                { name: 'Passif', balance: liabilities },
            ],
            assets: [
                { name: 'Comptes clients', value: receivables },
                { name: 'Actifs courants', value: Math.max(0, cash) },
                { name: 'Comptes et règlements de trésorerie', value: Math.max(0, cash) },
                { name: 'Immobilisations corporelles', value: inventory },
            ],
            expenses: [{ name: 'Coût des ventes', value: purchaseCost }, { name: 'Dépenses', value: expenseTotal }],
            revenue: [{ name: 'Revenus', value: revenue }],
            equity: [{ name: "Capitaux propres de l'entreprise", value: equity }],
            liabilities: [{ name: 'Comptes fournisseurs', value: payables }],
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map