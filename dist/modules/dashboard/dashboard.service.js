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
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async admin() {
        const [users, contacts, repairs, openRepairs, unpaidInvoices, lowStockProducts] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.contact.count(),
            this.prisma.repair.count(),
            this.prisma.repair.count({ where: { status: { notIn: [client_1.RepairStatus.DELIVERED, client_1.RepairStatus.CANCELLED] } } }),
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
    async technicianStats(technicianId) {
        const [assigned, finished, waitingParts, timer] = await Promise.all([
            this.prisma.repair.count({ where: { technicianId } }),
            this.prisma.repair.count({ where: { technicianId, status: client_1.RepairStatus.FINISHED } }),
            this.prisma.repair.count({ where: { technicianId, status: client_1.RepairStatus.WAITING_PARTS } }),
            this.prisma.repairTimerLog.aggregate({ where: { repair: { technicianId } }, _sum: { durationSec: true } }),
        ]);
        return { assigned, finished, waitingParts, totalDurationSec: timer._sum.durationSec ?? 0 };
    }
    partRequestStatusLabels() {
        return Object.values(client_1.PartRequestStatus);
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map