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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const sku = dto.sku?.trim() || await this.nextSku(dto.name);
        const barcode = dto.barcode?.trim() || this.barcodeFromSku(sku);
        return this.prisma.product.create({ data: { ...dto, sku, barcode } });
    }
    async findAll(query) {
        const where = query.search ? { OR: [
                { name: { contains: query.search, mode: 'insensitive' } },
                { sku: { contains: query.search, mode: 'insensitive' } },
                { barcode: { contains: query.search, mode: 'insensitive' } },
                { brand: { contains: query.search, mode: 'insensitive' } },
                { category: { contains: query.search, mode: 'insensitive' } },
            ] } : {};
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { name: 'asc' } }),
            this.prisma.product.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    findOne(id) { return this.prisma.product.findUniqueOrThrow({ where: { id }, include: { movements: true } }); }
    update(id, dto) { return this.prisma.product.update({ where: { id }, data: dto }); }
    remove(id) { return this.prisma.product.delete({ where: { id }, select: { id: true } }); }
    async movements(query) {
        const where = query.search ? {
            product: {
                OR: [
                    { name: { contains: query.search, mode: 'insensitive' } },
                    { sku: { contains: query.search, mode: 'insensitive' } },
                    { barcode: { contains: query.search, mode: 'insensitive' } },
                ],
            },
        } : {};
        const [data, total] = await Promise.all([
            this.prisma.stockMovement.findMany({
                where,
                include: { product: true },
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.stockMovement.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    async nextSku(name) {
        const prefix = this.slugPrefix(name);
        const count = await this.prisma.product.count({
            where: { sku: { startsWith: prefix } },
        });
        return `${prefix}-${String(count + 1).padStart(5, '0')}`;
    }
    slugPrefix(name) {
        const cleaned = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '').toUpperCase();
        return `SKU-${(cleaned || 'PROD').slice(0, 6)}`;
    }
    barcodeFromSku(sku) {
        const digits = sku.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `20${String(digits).padStart(10, '0').slice(-10)}`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map