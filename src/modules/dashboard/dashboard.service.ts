import { Injectable } from '@nestjs/common';
import { PartRequestStatus, RepairStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

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
    const groupedStatuses = await this.prisma.repair.groupBy({ by: ['status'], _count: { status: true } });
    return groupedStatuses.map((statusGroup) => ({ status: statusGroup.status, count: statusGroup._count.status }));
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
}
