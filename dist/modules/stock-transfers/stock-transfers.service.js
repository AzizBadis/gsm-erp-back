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
exports.StockTransfersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let StockTransfersService = class StockTransfersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) { const where = query.search ? { OR: [{ reference: { contains: query.search, mode: 'insensitive' } }, { fromLocation: { contains: query.search, mode: 'insensitive' } }, { toLocation: { contains: query.search, mode: 'insensitive' } }] } : {}; const [data, total] = await Promise.all([this.prisma.stockTransfer.findMany({ where, include: { items: { include: { product: true } } }, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { transferDate: 'desc' } }), this.prisma.stockTransfer.count({ where })]); return { data, total, page: query.page, limit: query.limit }; }
    async create(dto, addedBy) { if (dto.fromLocation.trim() === dto.toLocation.trim())
        throw new common_1.BadRequestException('Source and destination locations must be different'); const products = await this.prisma.product.findMany({ where: { id: { in: dto.items.map(i => i.productId) } } }); if (products.length !== new Set(dto.items.map(i => i.productId)).size)
        throw new common_1.BadRequestException('One or more products were not found'); for (const item of dto.items) {
        const product = products.find(p => p.id === item.productId);
        if (product.stockQty < item.quantity)
            throw new common_1.BadRequestException(`Insufficient stock for ${product.name}`);
    } const subtotal = dto.items.reduce((sum, item) => { const p = products.find(x => x.id === item.productId); return sum + item.quantity * Number(p.unitPrice); }, 0); const count = await this.prisma.stockTransfer.count(); return this.prisma.stockTransfer.create({ data: { reference: dto.reference?.trim() || `ST-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`, transferDate: dto.transferDate ? new Date(dto.transferDate) : new Date(), fromLocation: dto.fromLocation, toLocation: dto.toLocation, status: dto.status, shippingCharges: dto.shippingCharges ?? 0, notes: dto.notes, total: subtotal + (dto.shippingCharges ?? 0), addedBy, items: { create: dto.items.map(item => { const product = products.find(p => p.id === item.productId); return { productId: item.productId, quantity: item.quantity, unitPrice: product.unitPrice, lineTotal: item.quantity * Number(product.unitPrice) }; }) } }, include: { items: { include: { product: true } } } }); }
};
exports.StockTransfersService = StockTransfersService;
exports.StockTransfersService = StockTransfersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockTransfersService);
//# sourceMappingURL=stock-transfers.service.js.map