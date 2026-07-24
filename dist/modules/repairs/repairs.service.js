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
exports.RepairsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const repair_status_1 = require("../../common/constants/repair-status");
const prisma_service_1 = require("../../prisma/prisma.service");
const technician_management_service_1 = require("../technician-management/technician-management.service");
let RepairsService = class RepairsService {
    constructor(prisma, technicianManagement) {
        this.prisma = prisma;
        this.technicianManagement = technicianManagement;
    }
    async create(dto) {
        return this.prisma.$transaction(async (tx) => {
            const count = await tx.repair.count();
            const repair = await tx.repair.create({
                data: {
                    ...dto,
                    reference: `REP-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`,
                    status: dto.technicianId ? repair_status_1.RepairStatus.ASSIGNED : repair_status_1.RepairStatus.RECEIVED,
                },
                include: this.repairInclude(),
            });
            await this.technicianManagement.handleStatusChange(repair.id, repair.status);
            return repair;
        });
    }
    async assign(id, dto) {
        const current = await this.prisma.repair.findUniqueOrThrow({
            where: { id },
            select: { technicianId: true, status: true },
        });
        const status = current.technicianId ? current.status : repair_status_1.RepairStatus.ASSIGNED;
        const repair = await this.prisma.repair.update({
            where: { id },
            data: {
                technicianId: dto.technicianId,
                repairTypeId: dto.repairTypeId,
                status,
            },
            include: this.repairInclude(),
        });
        if (status !== current.status) {
            await this.technicianManagement.handleStatusChange(repair.id, repair.status);
        }
        return repair;
    }
    async updateStatus(id, dto) {
        const statusExists = await this.prisma.customStatus.findUnique({
            where: { name: dto.status },
        });
        if (!statusExists) {
            throw new common_1.NotFoundException(`Status ${dto.status} not found`);
        }
        const repair = await this.prisma.repair.update({
            where: { id },
            data: {
                status: dto.status,
                deliveredAt: dto.status === repair_status_1.RepairStatus.DELIVERED ? new Date() : undefined,
            },
            include: this.repairInclude(),
        });
        await this.technicianManagement.handleStatusChange(repair.id, repair.status);
        return repair;
    }
    async findAll(query) {
        const where = {};
        if (query.status)
            where.status = query.status;
        if (query.technicianId)
            where.technicianId = query.technicianId;
        if (query.from || query.to) {
            where.createdAt = {
                gte: query.from ? new Date(query.from) : undefined,
                lte: query.to ? new Date(query.to) : undefined,
            };
        }
        if (query.search) {
            where.OR = [
                { reference: { contains: query.search, mode: 'insensitive' } },
                { problem: { contains: query.search, mode: 'insensitive' } },
                { contact: { fullName: { contains: query.search, mode: 'insensitive' } } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.repair.findMany({
                where,
                include: this.repairInclude(),
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.repair.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    findOne(id) {
        return this.prisma.repair.findUniqueOrThrow({ where: { id }, include: this.repairInclude() });
    }
    async technicianTasks(technicianId, query) {
        if (!technicianId)
            throw new common_1.ForbiddenException('Technician profile is required');
        return this.findAll({ ...query, technicianId });
    }
    async technicianTask(id, technicianId) {
        await this.ensureAssigned(id, technicianId);
        return this.findOne(id);
    }
    async start(id, technicianId) {
        await this.ensureAssigned(id, technicianId);
        await this.ensureNoActiveTimer(id);
        await this.prisma.repairTimerLog.create({ data: { repairId: id, startedAt: new Date() } });
        const repair = await this.prisma.repair.update({ where: { id }, data: { status: repair_status_1.RepairStatus.IN_PROGRESS }, include: this.repairInclude() });
        await this.technicianManagement.handleStatusChange(repair.id, repair.status);
        return repair;
    }
    async pause(id, technicianId) {
        await this.ensureAssigned(id, technicianId);
        await this.closeActiveTimer(id);
        const repair = await this.prisma.repair.update({ where: { id }, data: { status: repair_status_1.RepairStatus.PAUSED }, include: this.repairInclude() });
        await this.technicianManagement.handleStatusChange(repair.id, repair.status);
        return repair;
    }
    async resume(id, technicianId) {
        return this.start(id, technicianId);
    }
    async finish(id, technicianId) {
        await this.ensureAssigned(id, technicianId);
        await this.closeActiveTimer(id, false);
        const repair = await this.prisma.repair.update({ where: { id }, data: { status: repair_status_1.RepairStatus.FINISHED }, include: this.repairInclude() });
        await this.technicianManagement.handleStatusChange(repair.id, repair.status);
        return repair;
    }
    async updateNotes(id, technicianId, dto) {
        await this.ensureAssigned(id, technicianId);
        return this.prisma.repair.update({ where: { id }, data: dto, include: this.repairInclude() });
    }
    async requestParts(id, technicianId, dto) {
        await this.ensureAssigned(id, technicianId);
        return this.prisma.$transaction(async (tx) => {
            const request = await tx.partRequest.create({
                data: {
                    repairId: id,
                    technicianId,
                    reason: dto.reason,
                    status: client_1.PartRequestStatus.PENDING,
                    items: { create: dto.items },
                },
                include: { items: { include: { product: true } }, repair: true, technician: { include: { user: true } } },
            });
            const repair = await tx.repair.update({ where: { id }, data: { status: repair_status_1.RepairStatus.WAITING_PARTS } });
            await this.technicianManagement.handleStatusChange(repair.id, repair.status);
            return request;
        });
    }
    partRequestsForTechnician(technicianId) {
        if (!technicianId)
            throw new common_1.ForbiddenException('Technician profile is required');
        return this.prisma.partRequest.findMany({
            where: { technicianId },
            include: { items: { include: { product: true } }, repair: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async deliverToClient(id) {
        const repair = await this.prisma.repair.update({
            where: { id },
            data: { status: repair_status_1.RepairStatus.DELIVERED, deliveredAt: new Date() },
            include: this.repairInclude(),
        });
        await this.technicianManagement.handleStatusChange(repair.id, repair.status);
        return repair;
    }
    async totalDurationSec(id) {
        const result = await this.prisma.repairTimerLog.aggregate({ where: { repairId: id }, _sum: { durationSec: true } });
        return result._sum.durationSec ?? 0;
    }
    async ensureAssigned(id, technicianId) {
        const repair = await this.prisma.repair.findUnique({ where: { id }, select: { technicianId: true } });
        if (!repair)
            throw new common_1.NotFoundException('Repair not found');
        if (repair.technicianId !== technicianId)
            throw new common_1.ForbiddenException('Repair is not assigned to this technician');
    }
    async ensureNoActiveTimer(repairId) {
        const active = await this.prisma.repairTimerLog.findFirst({ where: { repairId, endedAt: null } });
        if (active)
            throw new common_1.ForbiddenException('Repair already has an active timer');
    }
    async closeActiveTimer(repairId, required = true) {
        const active = await this.prisma.repairTimerLog.findFirst({ where: { repairId, endedAt: null }, orderBy: { startedAt: 'desc' } });
        if (!active) {
            if (required)
                throw new common_1.ForbiddenException('No active timer found');
            return;
        }
        const endedAt = new Date();
        const durationSec = Math.max(0, Math.floor((endedAt.getTime() - active.startedAt.getTime()) / 1000));
        await this.prisma.repairTimerLog.update({ where: { id: active.id }, data: { endedAt, durationSec } });
    }
    repairInclude() {
        return {
            contact: true,
            device: true,
            deviceModel: { include: { brand: true, device: true } },
            gpsModel: true,
            operator: true,
            technician: { include: { user: true } },
            timerLogs: true,
            partRequests: { include: { items: { include: { product: true } } } },
            invoices: true,
            repairType: true,
        };
    }
    async getStatuses() {
        return this.prisma.customStatus.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async createStatus(dto) {
        return this.prisma.customStatus.create({
            data: dto,
        });
    }
    async updateStatusDetail(id, dto) {
        return this.prisma.customStatus.update({
            where: { id },
            data: dto,
        });
    }
    async deleteStatus(id) {
        const status = await this.prisma.customStatus.findUniqueOrThrow({ where: { id } });
        await this.prisma.technicianStatusMapping.deleteMany({
            where: { status: status.name },
        });
        return this.prisma.customStatus.delete({
            where: { id },
        });
    }
};
exports.RepairsService = RepairsService;
exports.RepairsService = RepairsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        technician_management_service_1.TechnicianManagementService])
], RepairsService);
//# sourceMappingURL=repairs.service.js.map