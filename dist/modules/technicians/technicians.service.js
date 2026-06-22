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
exports.TechniciansService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
let TechniciansService = class TechniciansService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { userId, specialty } = dto;
        if (userId) {
            return this.prisma.$transaction(async (tx) => {
                await tx.user.update({ where: { id: userId }, data: { role: client_1.UserRole.TECHNICIAN } });
                return tx.technician.create({
                    data: { userId, specialty },
                    include: { user: true },
                });
            });
        }
        const { fullName, email, password } = dto;
        if (!fullName || !email || !password) {
            throw new common_1.BadRequestException('fullName, email and password are required when userId is not provided');
        }
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    fullName,
                    role: client_1.UserRole.TECHNICIAN,
                    passwordHash: await bcrypt.hash(password, 12),
                },
            });
            return tx.technician.create({
                data: { userId: user.id, specialty },
                include: { user: true },
            });
        });
    }
    async findAll(query) {
        const where = query.search
            ? { user: { fullName: { contains: query.search, mode: 'insensitive' } } }
            : {};
        const [data, total] = await Promise.all([
            this.prisma.technician.findMany({
                where,
                include: { user: true },
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.technician.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    findOne(id) {
        return this.prisma.technician.findUniqueOrThrow({ where: { id }, include: { user: true, repairs: true } });
    }
    update(id, dto) {
        return this.prisma.technician.update({ where: { id }, data: dto, include: { user: true } });
    }
    remove(id) {
        return this.prisma.technician.delete({ where: { id }, select: { id: true } });
    }
};
exports.TechniciansService = TechniciansService;
exports.TechniciansService = TechniciansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TechniciansService);
//# sourceMappingURL=technicians.service.js.map