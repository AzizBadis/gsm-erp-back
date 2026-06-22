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
exports.TechnicianManagementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TechnicianManagementService = class TechnicianManagementService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const mappings = await this.prisma.technicianStatusMapping.findMany();
        const completedStatuses = mappings.filter((m) => m.event === 'REPAIR_COMPLETED').map((m) => m.status);
        const returnStatuses = mappings.filter((m) => m.event === 'RETURN_SAV').map((m) => m.status);
        const brokenStatuses = mappings.filter((m) => m.event === 'BROKEN_LOST').map((m) => m.status);
        const technicians = await this.prisma.technician.findMany({
            include: {
                user: true,
                repairs: {
                    include: {
                        timerLogs: true,
                        repairType: true,
                    },
                },
                commissions: true,
            },
        });
        let totalRepaired = 0;
        let totalReturns = 0;
        let totalBroken = 0;
        let totalPending = 0;
        let totalLosses = 0;
        let totalCommissions = 0;
        let bestTechId = null;
        let maxCommissions = -1;
        const techniciansPerformance = [];
        const allTatHours = [];
        for (const tech of technicians) {
            let repairedCount = 0;
            let returnsCount = 0;
            let brokenCount = 0;
            let pendingCount = 0;
            const techTatHours = [];
            for (const repair of tech.repairs) {
                if (completedStatuses.includes(repair.status)) {
                    repairedCount++;
                    if (repair.deliveredAt && repair.receivedAt) {
                        const diffMs = repair.deliveredAt.getTime() - repair.receivedAt.getTime();
                        const diffHours = diffMs / (1000 * 60 * 60);
                        techTatHours.push(diffHours);
                        allTatHours.push(diffHours);
                    }
                }
                else if (returnStatuses.includes(repair.status)) {
                    returnsCount++;
                }
                else if (brokenStatuses.includes(repair.status)) {
                    brokenCount++;
                }
                else if (repair.status !== 'CANCELLED') {
                    pendingCount++;
                }
            }
            const commissionsSum = tech.commissions.reduce((acc, c) => acc + Number(c.commissionNette), 0);
            const lossesSum = tech.commissions.reduce((acc, c) => acc + Number(c.deductionPerte), 0);
            totalRepaired += repairedCount;
            totalReturns += returnsCount;
            totalBroken += brokenCount;
            totalPending += pendingCount;
            totalLosses += lossesSum;
            totalCommissions += commissionsSum;
            if (commissionsSum > maxCommissions) {
                maxCommissions = commissionsSum;
                bestTechId = tech.id;
            }
            const avgTat = techTatHours.length > 0
                ? Math.round((techTatHours.reduce((a, b) => a + b, 0) / techTatHours.length) * 10) / 10
                : 0;
            techniciansPerformance.push({
                technicianId: tech.id,
                name: tech.user.fullName,
                specialty: tech.specialty ?? 'N/A',
                repairedCount,
                returnsCount,
                brokenCount,
                commissionsSum,
                avgTat,
            });
        }
        let bestTechnician = null;
        if (bestTechId) {
            const bestTech = technicians.find((t) => t.id === bestTechId);
            if (bestTech) {
                bestTechnician = {
                    name: bestTech.user.fullName,
                    commission: maxCommissions,
                };
            }
        }
        const avgTatGlobal = allTatHours.length > 0
            ? Math.round((allTatHours.reduce((a, b) => a + b, 0) / allTatHours.length) * 10) / 10
            : 0;
        const MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const chartLabels = [];
        const chartMonths = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const label = `${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
            chartLabels.push(label);
            chartMonths.push({ year: d.getFullYear(), month: d.getMonth(), label });
        }
        const repairDatasets = technicians.map((tech) => {
            const data = chartMonths.map((m) => {
                return tech.repairs.filter((repair) => {
                    if (!completedStatuses.includes(repair.status))
                        return false;
                    const rDate = repair.deliveredAt || repair.createdAt;
                    return rDate.getFullYear() === m.year && rDate.getMonth() === m.month;
                }).length;
            });
            return {
                label: tech.user.fullName,
                data,
            };
        });
        const commissionDatasets = technicians.map((tech) => {
            const data = chartMonths.map((m) => {
                return tech.commissions.filter((c) => {
                    const cDate = c.createdAt;
                    return cDate.getFullYear() === m.year && cDate.getMonth() === m.month;
                }).reduce((acc, c) => acc + Number(c.commissionNette), 0);
            });
            return {
                label: tech.user.fullName,
                data,
            };
        });
        return {
            totalRepaired,
            totalReturns,
            totalBroken,
            totalPending,
            totalLosses,
            totalCommissions,
            bestTechnician,
            avgTat: avgTatGlobal,
            techniciansPerformance,
            chartData: {
                labels: chartLabels,
                repairDatasets,
                commissionDatasets,
            },
        };
    }
    async getCommissions(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const where = {};
        if (query.technicianId) {
            where.technicianId = query.technicianId;
        }
        if (query.startDate || query.endDate) {
            where.createdAt = {};
            if (query.startDate) {
                where.createdAt.gte = new Date(query.startDate);
            }
            if (query.endDate) {
                where.createdAt.lte = new Date(query.endDate);
            }
        }
        const [data, total] = await Promise.all([
            this.prisma.technicianCommission.findMany({
                where,
                include: {
                    technician: {
                        include: {
                            user: true,
                        },
                    },
                    repair: {
                        include: {
                            repairType: true,
                        },
                    },
                    repairType: true,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.technicianCommission.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async getRepairTypes() {
        return this.prisma.repairType.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async createRepairType(dto) {
        return this.prisma.repairType.create({
            data: dto,
        });
    }
    async updateRepairType(id, dto) {
        return this.prisma.repairType.update({
            where: { id },
            data: dto,
        });
    }
    async deleteRepairType(id) {
        return this.prisma.repairType.delete({
            where: { id },
        });
    }
    async bulkSaveRepairTypes(types) {
        return this.prisma.$transaction(async (tx) => {
            const idsToKeep = types.filter((t) => t.id).map((t) => t.id);
            await tx.repairType.deleteMany({
                where: {
                    id: { notIn: idsToKeep },
                },
            });
            const results = [];
            for (const t of types) {
                if (t.id) {
                    const res = await tx.repairType.update({
                        where: { id: t.id },
                        data: {
                            name: t.name,
                            commissionRate: t.commissionRate,
                            managedByAdmin: t.managedByAdmin,
                        },
                    });
                    results.push(res);
                }
                else {
                    const res = await tx.repairType.create({
                        data: {
                            name: t.name,
                            commissionRate: t.commissionRate,
                            managedByAdmin: t.managedByAdmin,
                        },
                    });
                    results.push(res);
                }
            }
            return results;
        });
    }
    async getStatusMappings() {
        return this.prisma.technicianStatusMapping.findMany({
            orderBy: [{ event: 'asc' }, { status: 'asc' }],
        });
    }
    async createStatusMapping(dto) {
        return this.prisma.technicianStatusMapping.create({
            data: {
                event: dto.event,
                status: dto.status,
                statusId: dto.status,
            },
        });
    }
    async updateStatusMapping(id, dto) {
        return this.prisma.technicianStatusMapping.update({
            where: { id },
            data: {
                event: dto.event,
                status: dto.status,
                statusId: dto.status,
            },
        });
    }
    async deleteStatusMapping(id) {
        return this.prisma.technicianStatusMapping.delete({
            where: { id },
        });
    }
    async bulkSaveStatusMappings(mappings) {
        return this.prisma.$transaction(async (tx) => {
            await tx.technicianStatusMapping.deleteMany({});
            const results = [];
            for (const m of mappings) {
                const res = await tx.technicianStatusMapping.create({
                    data: {
                        event: m.event,
                        status: m.status,
                        statusId: m.status,
                    },
                });
                results.push(res);
            }
            return results;
        });
    }
    async handleStatusChange(repairId, newStatus) {
        const repair = await this.prisma.repair.findUnique({
            where: { id: repairId },
            include: {
                repairType: true,
                technician: true,
            },
        });
        if (!repair || !repair.technicianId) {
            return;
        }
        const mappings = await this.prisma.technicianStatusMapping.findMany({
            where: { status: newStatus },
        });
        if (mappings.length === 0) {
            return;
        }
        for (const m of mappings) {
            const event = m.event;
            const existingCommission = await this.prisma.technicianCommission.findFirst({
                where: { repairId: repair.id, technicianId: repair.technicianId },
            });
            const rate = repair.repairType?.commissionRate ? Number(repair.repairType.commissionRate) : 0;
            let commissionBrute = existingCommission ? Number(existingCommission.commissionBrute) : 0;
            let deductionRetour = existingCommission ? Number(existingCommission.deductionRetour) : 0;
            let deductionPerte = existingCommission ? Number(existingCommission.deductionPerte) : 0;
            if (event === 'REPAIR_COMPLETED') {
                commissionBrute = rate;
            }
            else if (event === 'RETURN_SAV') {
                deductionRetour = commissionBrute || rate;
            }
            else if (event === 'BROKEN_LOST') {
                deductionPerte = commissionBrute || rate;
            }
            const commissionNette = Math.max(0, commissionBrute - deductionRetour - deductionPerte);
            if (existingCommission) {
                await this.prisma.technicianCommission.update({
                    where: { id: existingCommission.id },
                    data: {
                        repairTypeId: repair.repairTypeId,
                        commissionBrute,
                        deductionRetour,
                        deductionPerte,
                        commissionNette,
                    },
                });
            }
            else {
                await this.prisma.technicianCommission.create({
                    data: {
                        technicianId: repair.technicianId,
                        repairId: repair.id,
                        repairTypeId: repair.repairTypeId,
                        commissionBrute,
                        deductionRetour,
                        deductionPerte,
                        commissionNette,
                    },
                });
            }
        }
    }
};
exports.TechnicianManagementService = TechnicianManagementService;
exports.TechnicianManagementService = TechnicianManagementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TechnicianManagementService);
//# sourceMappingURL=technician-management.service.js.map