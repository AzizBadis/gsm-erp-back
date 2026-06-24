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
exports.EssentialTasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EssentialTasksService = class EssentialTasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.essentialTask.create({
            data: {
                title: dto.title,
                status: dto.status,
                priority: dto.priority,
                startAt: dto.startAt ? new Date(dto.startAt) : undefined,
                endAt: dto.endAt ? new Date(dto.endAt) : undefined,
                estimatedHours: dto.estimatedHours,
                assignedTo: dto.assignedTo,
                assignedUserId: dto.assignedUserId,
                documents: dto.documents,
                reference: await this.nextReference(),
            },
        });
    }
    async findAll(query) {
        const where = query.search
            ? {
                OR: [
                    { reference: { contains: query.search, mode: 'insensitive' } },
                    { title: { contains: query.search, mode: 'insensitive' } },
                    { assignedTo: { contains: query.search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [data, total] = await Promise.all([
            this.prisma.essentialTask.findMany({
                where,
                include: { assignedUser: { select: { id: true, fullName: true, email: true } } },
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.essentialTask.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    findOne(id) {
        return this.prisma.essentialTask.findUniqueOrThrow({ where: { id }, include: { assignedUser: { select: { id: true, fullName: true, email: true } } } });
    }
    async findMine(query, user) {
        const where = {
            AND: [
                {
                    OR: [
                        { assignedUserId: user.sub },
                        { assignedTo: { equals: user.email, mode: 'insensitive' } },
                    ],
                },
                query.search
                    ? {
                        OR: [
                            { reference: { contains: query.search, mode: 'insensitive' } },
                            { title: { contains: query.search, mode: 'insensitive' } },
                        ],
                    }
                    : {},
            ],
        };
        const [data, total] = await Promise.all([
            this.prisma.essentialTask.findMany({
                where,
                include: { assignedUser: { select: { id: true, fullName: true, email: true } } },
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.essentialTask.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    async updateMineStatus(id, status, user) {
        const task = await this.prisma.essentialTask.findFirstOrThrow({
            where: {
                id,
                OR: [
                    { assignedUserId: user.sub },
                    { assignedTo: { equals: user.email, mode: 'insensitive' } },
                ],
            },
        });
        return this.prisma.essentialTask.update({ where: { id: task.id }, data: { status } });
    }
    update(id, dto) {
        return this.prisma.essentialTask.update({ where: { id }, data: this.toTaskData(dto) });
    }
    remove(id) {
        return this.prisma.essentialTask.delete({ where: { id }, select: { id: true } });
    }
    toTaskData(dto) {
        return {
            ...dto,
            startAt: dto.startAt ? new Date(dto.startAt) : undefined,
            endAt: dto.endAt ? new Date(dto.endAt) : undefined,
        };
    }
    async nextReference() {
        const year = new Date().getFullYear();
        const count = await this.prisma.essentialTask.count({
            where: {
                reference: {
                    startsWith: `${year}/`,
                },
            },
        });
        return `${year}/${String(count + 1).padStart(4, '0')}`;
    }
};
exports.EssentialTasksService = EssentialTasksService;
exports.EssentialTasksService = EssentialTasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EssentialTasksService);
//# sourceMappingURL=essential-tasks.service.js.map