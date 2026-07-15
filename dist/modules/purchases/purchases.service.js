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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let PurchasesService = class PurchasesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {
            ...(query.kind ? { kind: query.kind } : {}),
            ...(query.search ? { OR: [
                    { reference: { contains: query.search, mode: 'insensitive' } },
                    { supplierName: { contains: query.search, mode: 'insensitive' } },
                    { location: { contains: query.search, mode: 'insensitive' } },
                ] } : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.purchase.findMany({ where, include: { items: { include: { product: true } } }, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { purchaseDate: 'desc' } }),
            this.prisma.purchase.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    async create(dto, addedBy) {
        const subtotal = dto.items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
        const total = Math.max(0, subtotal - (dto.discount ?? 0) + (dto.tax ?? 0) + (dto.shipping ?? 0));
        const paidAmount = Math.min(dto.paidAmount ?? 0, total);
        const paymentStatus = paidAmount <= 0 ? client_1.PurchasePaymentStatus.UNPAID : paidAmount >= total ? client_1.PurchasePaymentStatus.PAID : client_1.PurchasePaymentStatus.PARTIAL;
        return this.prisma.$transaction(async (tx) => {
            const count = await tx.purchase.count({ where: { kind: dto.kind } });
            const prefix = dto.kind === client_1.PurchaseKind.REQUEST ? 'PR' : dto.kind === client_1.PurchaseKind.ORDER ? 'PO' : dto.kind === client_1.PurchaseKind.RETURN ? 'RT' : 'PU';
            return tx.purchase.create({
                data: {
                    reference: dto.reference?.trim() || `${prefix}-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`,
                    kind: dto.kind,
                    supplierName: dto.supplierName,
                    location: dto.location ?? 'ERP System',
                    status: dto.status ?? (dto.kind === client_1.PurchaseKind.PURCHASE ? client_1.PurchaseStatus.RECEIVED : client_1.PurchaseStatus.DRAFT),
                    paymentStatus,
                    purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : new Date(),
                    subtotal, discount: dto.discount ?? 0, tax: dto.tax ?? 0, shipping: dto.shipping ?? 0, total, paidAmount,
                    notes: dto.notes, addedBy,
                    items: { create: dto.items.map(item => ({
                            productId: item.productId, productName: item.productName, quantity: item.quantity,
                            unitCost: item.unitCost, margin: item.margin ?? 0, salePrice: item.salePrice ?? 0,
                            lineTotal: item.quantity * item.unitCost,
                        })) },
                },
                include: { items: true },
            });
        });
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map