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
exports.GrhService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const TYPES = ['leave-types', 'leaves', 'attendance', 'payroll', 'holidays', 'departments', 'positions', 'targets'];
let GrhService = class GrhService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async dashboard() {
        const [users, grouped, pendingLeaves, presentToday, payroll] = await Promise.all([
            this.prisma.user.count({ where: { isActive: true } }),
            this.prisma.grhRecord.groupBy({ by: ['type'], _count: { _all: true } }),
            this.prisma.grhRecord.count({ where: { type: 'leaves', data: { path: ['status'], equals: 'En attente' } } }),
            this.prisma.grhRecord.count({ where: { type: 'attendance', data: { path: ['status'], equals: 'Présent' } } }),
            this.prisma.grhRecord.findMany({ where: { type: 'payroll' }, select: { data: true } }),
        ]);
        const counts = Object.fromEntries(TYPES.map((type) => [type, grouped.find((item) => item.type === type)?._count._all ?? 0]));
        const payrollTotal = payroll.reduce((total, record) => {
            const data = record.data;
            return total + (Number(data.amount) || 0);
        }, 0);
        return { activeEmployees: users, presentToday, pendingLeaves, payrollTotal, counts };
    }
    async findAll(type, search) {
        this.assertType(type);
        return this.prisma.grhRecord.findMany({
            where: { type, ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}) },
            orderBy: { createdAt: 'desc' },
        });
    }
    create(type, dto) {
        this.assertType(type);
        return this.prisma.grhRecord.create({ data: { type, name: dto.name, description: dto.description, data: (dto.data ?? {}) } });
    }
    update(id, dto) {
        return this.prisma.grhRecord.update({ where: { id }, data: { ...dto, data: dto.data } });
    }
    remove(id) {
        return this.prisma.grhRecord.delete({ where: { id }, select: { id: true } });
    }
    assertType(type) {
        if (!TYPES.includes(type))
            throw new Error('Invalid GRH record type');
    }
};
exports.GrhService = GrhService;
exports.GrhService = GrhService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GrhService);
//# sourceMappingURL=grh.service.js.map