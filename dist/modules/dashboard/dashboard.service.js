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
    async home() {
        const now = new Date();
        const start30 = new Date(now);
        start30.setDate(start30.getDate() - 29);
        start30.setHours(0, 0, 0, 0);
        const startYear = new Date(now.getFullYear(), 0, 1);
        const [invoices, purchases, expenses, products, purchaseRequests, purchaseOrders, locationsFromPurchases, locationsFromExpenses, locationsFromReservations,] = await Promise.all([
            this.prisma.invoice.findMany({
                include: { contact: true, repair: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.purchase.findMany({
                include: { items: { include: { product: true } } },
                orderBy: { purchaseDate: 'desc' },
            }),
            this.prisma.expense.findMany({ orderBy: { expenseDate: 'desc' } }),
            this.prisma.product.findMany({ orderBy: { name: 'asc' } }),
            this.prisma.purchase.findMany({
                where: { kind: client_1.PurchaseKind.REQUEST },
                include: { items: { include: { product: true } } },
                orderBy: { purchaseDate: 'desc' },
                take: 25,
            }),
            this.prisma.purchase.findMany({
                where: { kind: client_1.PurchaseKind.ORDER },
                include: { items: { include: { product: true } } },
                orderBy: { purchaseDate: 'desc' },
                take: 25,
            }),
            this.prisma.purchase.findMany({ distinct: ['location'], select: { location: true } }),
            this.prisma.expense.findMany({ distinct: ['location'], select: { location: true } }),
            this.prisma.reservation.findMany({ distinct: ['location'], select: { location: true } }),
        ]);
        const saleInvoices = invoices.filter((invoice) => invoice.documentType === client_1.InvoiceDocumentType.SALE);
        const returnInvoices = invoices.filter((invoice) => invoice.documentType === client_1.InvoiceDocumentType.RETURN);
        const purchaseRows = purchases.filter((purchase) => purchase.kind === client_1.PurchaseKind.PURCHASE);
        const purchaseReturns = purchases.filter((purchase) => purchase.kind === client_1.PurchaseKind.RETURN);
        const unpaidInvoices = saleInvoices.filter((invoice) => invoice.paymentStatus !== 'PAID');
        const unpaidPurchases = purchaseRows.filter((purchase) => purchase.paymentStatus !== 'PAID');
        const stockAlerts = products.filter((product) => product.stockQty <= product.minStockQty);
        const pendingShipments = saleInvoices.filter((invoice) => invoice.shippingStatus !== 'SHIPPED');
        const locations = Array.from(new Set([
            ...locationsFromPurchases.map((row) => row.location),
            ...locationsFromExpenses.map((row) => row.location),
            ...locationsFromReservations.map((row) => row.location),
        ].filter(Boolean))).sort();
        return {
            generatedAt: now.toISOString(),
            locations,
            kpis: {
                salesTotal: this.sum(saleInvoices, (invoice) => invoice.total),
                net: this.sum(saleInvoices, (invoice) => invoice.paidAmount),
                unpaidInvoices: this.sum(unpaidInvoices, (invoice) => this.due(invoice.total, invoice.paidAmount)),
                salesReturns: this.sum(returnInvoices, (invoice) => invoice.total),
                purchasesTotal: this.sum(purchaseRows, (purchase) => purchase.total),
                unpaidPurchases: this.sum(unpaidPurchases, (purchase) => this.due(purchase.total, purchase.paidAmount)),
                purchaseReturns: this.sum(purchaseReturns, (purchase) => purchase.total),
                expenses: this.sum(expenses, (expense) => expense.total),
            },
            charts: {
                sales30Days: this.dailySeries(saleInvoices, start30, now),
                commercialYear: this.monthlySeries(saleInvoices, now.getFullYear()),
            },
            tables: {
                unpaidInvoices: unpaidInvoices.slice(0, 25).map((invoice) => ({
                    client: invoice.contact?.fullName ?? '-',
                    invoiceNumber: invoice.number,
                    dueAmount: this.due(invoice.total, invoice.paidAmount),
                })),
                unpaidPurchases: unpaidPurchases.slice(0, 25).map((purchase) => ({
                    supplier: purchase.supplierName,
                    reference: purchase.reference,
                    dueAmount: this.due(purchase.total, purchase.paidAmount),
                })),
                stockAlerts: stockAlerts.slice(0, 25).map((product) => ({
                    product: `${product.name} (${product.sku})`,
                    location: locations[0] ?? '-',
                    stock: product.stockQty,
                })),
                saleOrders: [],
                purchaseRequests: purchaseRequests.map((purchase) => this.purchaseTableRow(purchase)),
                purchaseOrders: purchaseOrders.map((purchase) => ({
                    action: 'Actions',
                    date: purchase.purchaseDate,
                    reference: purchase.reference,
                    location: purchase.location,
                    supplier: purchase.supplierName,
                    status: purchase.status,
                    remainingQuantity: purchase.items.reduce((total, item) => total + item.quantity, 0),
                    addedBy: purchase.addedBy,
                })),
                pendingShipments: pendingShipments.slice(0, 25).map((invoice) => ({
                    action: 'Actions',
                    date: invoice.createdAt,
                    invoiceNumber: invoice.number,
                    client: invoice.contact?.fullName ?? '-',
                    phone: invoice.contact?.phone ?? '-',
                    location: locations[0] ?? '-',
                    shippingStatus: invoice.shippingStatus,
                    paymentStatus: invoice.paymentStatus,
                })),
            },
            totals: {
                unpaidInvoices: unpaidInvoices.length,
                unpaidPurchases: unpaidPurchases.length,
                stockAlerts: stockAlerts.length,
                saleOrders: 0,
                purchaseRequests: purchaseRequests.length,
                purchaseOrders: purchaseOrders.length,
                pendingShipments: pendingShipments.length,
            },
        };
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
    dailySeries(invoices, start, end) {
        const rows = [];
        const cursor = new Date(start);
        while (cursor <= end) {
            const dayStart = new Date(cursor);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayEnd.getDate() + 1);
            rows.push({
                date: dayStart.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
                'Tous les lieux': this.sum(invoices.filter((invoice) => invoice.createdAt >= dayStart && invoice.createdAt < dayEnd), (invoice) => invoice.total),
            });
            cursor.setDate(cursor.getDate() + 1);
        }
        return rows;
    }
    monthlySeries(invoices, year) {
        return Array.from({ length: 12 }, (_, month) => {
            const monthStart = new Date(year, month, 1);
            const monthEnd = new Date(year, month + 1, 1);
            return {
                date: monthStart.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
                'Tous les lieux': this.sum(invoices.filter((invoice) => invoice.createdAt >= monthStart && invoice.createdAt < monthEnd), (invoice) => invoice.total),
            };
        });
    }
    purchaseTableRow(purchase) {
        return {
            action: 'Actions',
            date: purchase.purchaseDate,
            reference: purchase.reference,
            location: purchase.location,
            status: purchase.status,
            requiredBefore: null,
            addedBy: purchase.addedBy,
        };
    }
    sum(rows, getValue) {
        return rows.reduce((total, row) => total + Number(getValue(row) ?? 0), 0);
    }
    due(total, paid) {
        return Math.max(0, Number(total ?? 0) - Number(paid ?? 0));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map