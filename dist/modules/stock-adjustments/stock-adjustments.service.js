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
exports.StockAdjustmentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let StockAdjustmentsService = class StockAdjustmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(q) { const where = q.search ? { OR: [{ reference: { contains: q.search, mode: 'insensitive' } }, { location: { contains: q.search, mode: 'insensitive' } }, { reason: { contains: q.search, mode: 'insensitive' } }] } : {}; const [data, total] = await Promise.all([this.prisma.stockAdjustment.findMany({ where, include: { items: { include: { product: true } } }, skip: (q.page - 1) * q.limit, take: q.limit, orderBy: { adjustmentDate: 'desc' } }), this.prisma.stockAdjustment.count({ where })]); return { data, total, page: q.page, limit: q.limit }; }
    async create(dto, addedBy) { return this.prisma.$transaction(async (tx) => { const products = await tx.product.findMany({ where: { id: { in: dto.items.map(i => i.productId) } } }); if (products.length !== new Set(dto.items.map(i => i.productId)).size)
        throw new common_1.BadRequestException('One or more products were not found'); if (dto.type === client_1.StockAdjustmentType.SUBTRACT) {
        for (const item of dto.items) {
            const p = products.find(x => x.id === item.productId);
            if (p.stockQty < item.quantity)
                throw new common_1.BadRequestException(`Insufficient stock for ${p.name}`);
        }
    } const count = await tx.stockAdjustment.count(); const reference = dto.reference?.trim() || `SA-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`; const total = dto.items.reduce((s, i) => s + i.quantity * Number(products.find(p => p.id === i.productId).unitPrice), 0); const adjustment = await tx.stockAdjustment.create({ data: { reference, adjustmentDate: dto.adjustmentDate ? new Date(dto.adjustmentDate) : new Date(), location: dto.location, type: dto.type, total, recoveredAmount: dto.recoveredAmount ?? 0, reason: dto.reason, addedBy, items: { create: dto.items.map(i => { const p = products.find(x => x.id === i.productId); return { productId: i.productId, quantity: i.quantity, unitPrice: p.unitPrice, lineTotal: i.quantity * Number(p.unitPrice) }; }) } }, include: { items: { include: { product: true } } } }); for (const item of dto.items) {
        const delta = dto.type === client_1.StockAdjustmentType.ADD ? item.quantity : -item.quantity;
        await tx.product.update({ where: { id: item.productId }, data: { stockQty: { increment: delta } } });
        await tx.stockMovement.create({ data: { productId: item.productId, type: client_1.StockMovementType.ADJUSTMENT, quantity: delta, reason: `${reference}: ${dto.reason ?? dto.type}` } });
    } return adjustment; }); }
};
exports.StockAdjustmentsService = StockAdjustmentsService;
exports.StockAdjustmentsService = StockAdjustmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockAdjustmentsService);
//# sourceMappingURL=stock-adjustments.service.js.map