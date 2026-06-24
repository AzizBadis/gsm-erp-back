import { Injectable } from '@nestjs/common';
import { AccountTransactionDirection, PartRequestStatus, UserRole } from '@prisma/client';
import type { AuthUser } from '../../common/decorators/current-user.decorator';
import { RepairStatus } from '../../common/constants/repair-status';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async topbar(user: AuthUser) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);

    const isAdmin = user.role === UserRole.ADMIN;
    const isCashier = user.role === UserRole.CASHIER;
    const isTechnician = user.role === UserRole.TECHNICIAN;

    const [
      myTasks,
      technicianRepairs,
      openRepairs,
      todayReservations,
      pendingPartRequests,
      unpaidInvoices,
    ] = await Promise.all([
      this.prisma.essentialTask.count({ where: { assignedUserId: user.sub, status: 'NEW' } }),
      isTechnician && user.technicianId
        ? this.prisma.repair.count({
            where: {
              technicianId: user.technicianId,
              status: { notIn: [RepairStatus.DELIVERED, RepairStatus.CANCELLED, RepairStatus.FINISHED] },
            },
          })
        : Promise.resolve(0),
      isAdmin
        ? this.prisma.repair.count({ where: { status: { notIn: [RepairStatus.DELIVERED, RepairStatus.CANCELLED] } } })
        : Promise.resolve(0),
      (isAdmin || isCashier)
        ? this.prisma.reservation.count({ where: { startsAt: { gte: startOfToday, lt: endOfToday } } })
        : Promise.resolve(0),
      (isAdmin || isCashier)
        ? this.prisma.partRequest.count({ where: { status: PartRequestStatus.PENDING } })
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
      this.prisma.repair.count({ where: { status: { notIn: [RepairStatus.DELIVERED, RepairStatus.CANCELLED] } } }),
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

  async technicianStats(technicianId: string) {
    const [assigned, finished, waitingParts, timer] = await Promise.all([
      this.prisma.repair.count({ where: { technicianId } }),
      this.prisma.repair.count({ where: { technicianId, status: RepairStatus.FINISHED } }),
      this.prisma.repair.count({ where: { technicianId, status: RepairStatus.WAITING_PARTS } }),
      this.prisma.repairTimerLog.aggregate({ where: { repair: { technicianId } }, _sum: { durationSec: true } }),
    ]);
    return { assigned, finished, waitingParts, totalDurationSec: timer._sum.durationSec ?? 0 };
  }

  partRequestStatusLabels() {
    return Object.values(PartRequestStatus);
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
    const cash = accounts.reduce((sum, account) => sum + Number(account.initialBalance) + account.transactions.reduce((s, t) => s + (t.direction === AccountTransactionDirection.CREDIT ? Number(t.amount) : -Number(t.amount)), 0), 0);
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
}
