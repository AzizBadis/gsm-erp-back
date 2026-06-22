import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PartRequestStatus, UserRole } from '@prisma/client';
import { RepairStatus } from '../../common/constants/repair-status';
import { RepairFilterDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignRepairDto, CreateRepairDto, RequestPartsDto, UpdateRepairNotesDto, UpdateRepairStatusDto } from './dto/repair.dto';
import { TechnicianManagementService } from '../technician-management/technician-management.service';

@Injectable()
export class RepairsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly technicianManagement: TechnicianManagementService,
  ) {}

  async create(dto: CreateRepairDto) {
    return this.prisma.$transaction(async (tx) => {
      const count = await tx.repair.count();
      const repair = await tx.repair.create({
        data: {
          ...dto,
          reference: `REP-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`,
          status: dto.technicianId ? RepairStatus.ASSIGNED : RepairStatus.RECEIVED,
        },
        include: this.repairInclude(),
      });
      await this.technicianManagement.handleStatusChange(repair.id, repair.status);
      return repair;
    });
  }

  async assign(id: string, dto: AssignRepairDto) {
    const repair = await this.prisma.repair.update({
      where: { id },
      data: {
        technicianId: dto.technicianId,
        repairTypeId: dto.repairTypeId,
        status: RepairStatus.ASSIGNED,
      },
      include: this.repairInclude(),
    });
    await this.technicianManagement.handleStatusChange(repair.id, repair.status);
    return repair;
  }

  async updateStatus(id: string, dto: UpdateRepairStatusDto) {
    const statusExists = await this.prisma.customStatus.findUnique({
      where: { name: dto.status },
    });
    if (!statusExists) {
      throw new NotFoundException(`Status ${dto.status} not found`);
    }

    const repair = await this.prisma.repair.update({
      where: { id },
      data: {
        status: dto.status,
        deliveredAt: dto.status === RepairStatus.DELIVERED ? new Date() : undefined,
      },
      include: this.repairInclude(),
    });
    await this.technicianManagement.handleStatusChange(repair.id, repair.status);
    return repair;
  }

  async findAll(query: RepairFilterDto) {
    const where: Record<string, unknown> = {};
    if (query.status) where.status = query.status;
    if (query.technicianId) where.technicianId = query.technicianId;
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

  findOne(id: string) {
    return this.prisma.repair.findUniqueOrThrow({ where: { id }, include: this.repairInclude() });
  }

  async technicianTasks(technicianId: string, query: RepairFilterDto) {
    if (!technicianId) throw new ForbiddenException('Technician profile is required');
    return this.findAll({ ...query, technicianId });
  }

  async technicianTask(id: string, technicianId: string) {
    await this.ensureAssigned(id, technicianId);
    return this.findOne(id);
  }

  async start(id: string, technicianId: string) {
    await this.ensureAssigned(id, technicianId);
    await this.ensureNoActiveTimer(id);
    await this.prisma.repairTimerLog.create({ data: { repairId: id, startedAt: new Date() } });
    const repair = await this.prisma.repair.update({ where: { id }, data: { status: RepairStatus.IN_PROGRESS }, include: this.repairInclude() });
    await this.technicianManagement.handleStatusChange(repair.id, repair.status);
    return repair;
  }

  async pause(id: string, technicianId: string) {
    await this.ensureAssigned(id, technicianId);
    await this.closeActiveTimer(id);
    const repair = await this.prisma.repair.update({ where: { id }, data: { status: RepairStatus.PAUSED }, include: this.repairInclude() });
    await this.technicianManagement.handleStatusChange(repair.id, repair.status);
    return repair;
  }

  async resume(id: string, technicianId: string) {
    return this.start(id, technicianId);
  }

  async finish(id: string, technicianId: string) {
    await this.ensureAssigned(id, technicianId);
    await this.closeActiveTimer(id, false);
    const repair = await this.prisma.repair.update({ where: { id }, data: { status: RepairStatus.FINISHED }, include: this.repairInclude() });
    await this.technicianManagement.handleStatusChange(repair.id, repair.status);
    return repair;
  }

  async updateNotes(id: string, technicianId: string, dto: UpdateRepairNotesDto) {
    await this.ensureAssigned(id, technicianId);
    return this.prisma.repair.update({ where: { id }, data: dto, include: this.repairInclude() });
  }

  async requestParts(id: string, technicianId: string, dto: RequestPartsDto) {
    await this.ensureAssigned(id, technicianId);
    return this.prisma.$transaction(async (tx) => {
      const request = await tx.partRequest.create({
        data: {
          repairId: id,
          technicianId,
          reason: dto.reason,
          status: PartRequestStatus.PENDING,
          items: { create: dto.items },
        },
        include: { items: { include: { product: true } }, repair: true, technician: { include: { user: true } } },
      });
      const repair = await tx.repair.update({ where: { id }, data: { status: RepairStatus.WAITING_PARTS } });
      await this.technicianManagement.handleStatusChange(repair.id, repair.status);
      return request;
    });
  }

  partRequestsForTechnician(technicianId: string) {
    if (!technicianId) throw new ForbiddenException('Technician profile is required');
    return this.prisma.partRequest.findMany({
      where: { technicianId },
      include: { items: { include: { product: true } }, repair: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deliverToClient(id: string) {
    const repair = await this.prisma.repair.update({
      where: { id },
      data: { status: RepairStatus.DELIVERED, deliveredAt: new Date() },
      include: this.repairInclude(),
    });
    await this.technicianManagement.handleStatusChange(repair.id, repair.status);
    return repair;
  }

  async totalDurationSec(id: string) {
    const result = await this.prisma.repairTimerLog.aggregate({ where: { repairId: id }, _sum: { durationSec: true } });
    return result._sum.durationSec ?? 0;
  }

  private async ensureAssigned(id: string, technicianId: string) {
    const repair = await this.prisma.repair.findUnique({ where: { id }, select: { technicianId: true } });
    if (!repair) throw new NotFoundException('Repair not found');
    if (repair.technicianId !== technicianId) throw new ForbiddenException('Repair is not assigned to this technician');
  }

  private async ensureNoActiveTimer(repairId: string) {
    const active = await this.prisma.repairTimerLog.findFirst({ where: { repairId, endedAt: null } });
    if (active) throw new ForbiddenException('Repair already has an active timer');
  }

  private async closeActiveTimer(repairId: string, required = true) {
    const active = await this.prisma.repairTimerLog.findFirst({ where: { repairId, endedAt: null }, orderBy: { startedAt: 'desc' } });
    if (!active) {
      if (required) throw new ForbiddenException('No active timer found');
      return;
    }
    const endedAt = new Date();
    const durationSec = Math.max(0, Math.floor((endedAt.getTime() - active.startedAt.getTime()) / 1000));
    await this.prisma.repairTimerLog.update({ where: { id: active.id }, data: { endedAt, durationSec } });
  }

  private repairInclude() {
    return {
      contact: true,
      device: true,
      deviceModel: { include: { brand: true, device: true } },
      technician: { include: { user: true } },
      timerLogs: true,
      partRequests: { include: { items: { include: { product: true } } } },
      invoices: true,
      repairType: true,
    };
  }

  // ----------------------------------------------------
  // CustomStatus (CRUD)
  // ----------------------------------------------------
  async getStatuses() {
    return this.prisma.customStatus.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async createStatus(dto: { name: string; label: string; color?: string }) {
    return this.prisma.customStatus.create({
      data: dto,
    });
  }

  async updateStatusDetail(id: string, dto: { name?: string; label?: string; color?: string }) {
    return this.prisma.customStatus.update({
      where: { id },
      data: dto,
    });
  }

  async deleteStatus(id: string) {
    const status = await this.prisma.customStatus.findUniqueOrThrow({ where: { id } });
    
    // Delete status mapping referencing this status name
    await this.prisma.technicianStatusMapping.deleteMany({
      where: { status: status.name },
    });

    return this.prisma.customStatus.delete({
      where: { id },
    });
  }
}
