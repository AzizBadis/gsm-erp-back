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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DevicesService = class DevicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) { return this.prisma.device.create({ data: dto }); }
    async findAll(query) {
        const where = query.search ? { name: { contains: query.search, mode: 'insensitive' } } : {};
        const [data, total] = await Promise.all([
            this.prisma.device.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
            this.prisma.device.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    findOne(id) { return this.prisma.device.findUniqueOrThrow({ where: { id } }); }
    update(id, dto) { return this.prisma.device.update({ where: { id }, data: dto }); }
    remove(id) { return this.prisma.device.delete({ where: { id }, select: { id: true } }); }
    createModel(dto) { return this.prisma.deviceModel.create({ data: dto, include: { brand: true, device: true } }); }
    async findModels(query) {
        const where = query.search ? { name: { contains: query.search, mode: 'insensitive' } } : {};
        const [data, total] = await Promise.all([
            this.prisma.deviceModel.findMany({ where, include: { brand: true, device: true }, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
            this.prisma.deviceModel.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    findModel(id) { return this.prisma.deviceModel.findUniqueOrThrow({ where: { id }, include: { brand: true, device: true } }); }
    updateModel(id, dto) { return this.prisma.deviceModel.update({ where: { id }, data: dto, include: { brand: true, device: true } }); }
    removeModel(id) { return this.prisma.deviceModel.delete({ where: { id }, select: { id: true } }); }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevicesService);
//# sourceMappingURL=devices.service.js.map