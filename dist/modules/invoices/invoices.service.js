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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let InvoicesService = class InvoicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = query.search
            ? {
                OR: [
                    { number: { contains: query.search, mode: 'insensitive' } },
                    { contact: { fullName: { contains: query.search, mode: 'insensitive' } } },
                    { repair: { reference: { contains: query.search, mode: 'insensitive' } } },
                ],
            }
            : {};
        const [data, total] = await Promise.all([
            this.prisma.invoice.findMany({
                where,
                include: { items: true, contact: true, repair: true, payments: true },
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.invoice.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    async create(dto) {
        if (!dto.items.length)
            throw new common_1.BadRequestException('Invoice must include at least one item');
        const subtotal = dto.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const tax = dto.tax ?? 0;
        const total = subtotal + tax;
        return this.prisma.$transaction(async (tx) => {
            const count = await tx.invoice.count();
            return tx.invoice.create({
                data: {
                    number: `INV-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`,
                    contactId: dto.contactId,
                    repairId: dto.repairId,
                    subtotal,
                    tax,
                    total,
                    items: {
                        create: dto.items.map((item) => ({
                            productId: item.productId,
                            description: item.description,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            total: item.quantity * item.unitPrice,
                        })),
                    },
                },
                include: { items: true, contact: true, repair: true, payments: true },
            });
        });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map