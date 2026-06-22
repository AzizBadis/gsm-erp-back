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
exports.PartRequestsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const repair_status_1 = require("../../common/constants/repair-status");
const prisma_service_1 = require("../../prisma/prisma.service");
let PartRequestsService = class PartRequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = query.search
            ? {
                OR: [
                    { repair: { reference: { contains: query.search, mode: 'insensitive' } } },
                    { technician: { user: { fullName: { contains: query.search, mode: 'insensitive' } } } },
                    { items: { some: { product: { name: { contains: query.search, mode: 'insensitive' } } } } },
                ],
            }
            : {};
        const [data, total] = await Promise.all([
            this.prisma.partRequest.findMany({
                where,
                include: this.include(),
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.partRequest.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    findOne(id) {
        return this.prisma.partRequest.findUniqueOrThrow({ where: { id }, include: this.include() });
    }
    async approve(id) {
        const request = await this.findOne(id);
        for (const item of request.items) {
            if (item.product.stockQty < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${item.product.name}`);
            }
        }
        return this.prisma.partRequest.update({
            where: { id },
            data: { status: client_1.PartRequestStatus.APPROVED },
            include: this.include(),
        });
    }
    reject(id, reason) {
        return this.prisma.partRequest.update({
            where: { id },
            data: { status: client_1.PartRequestStatus.REJECTED, rejectionReason: reason },
            include: this.include(),
        });
    }
    async deliver(id) {
        const request = await this.findOne(id);
        if (request.status !== client_1.PartRequestStatus.APPROVED) {
            throw new common_1.BadRequestException('Only approved part requests can be delivered');
        }
        return this.prisma.$transaction(async (tx) => {
            for (const item of request.items) {
                const product = await tx.product.findUniqueOrThrow({ where: { id: item.productId } });
                if (product.stockQty < item.quantity) {
                    throw new common_1.BadRequestException(`Insufficient stock for ${product.name}`);
                }
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stockQty: { decrement: item.quantity } },
                });
                await tx.stockMovement.create({
                    data: {
                        productId: item.productId,
                        repairId: request.repairId,
                        type: client_1.StockMovementType.OUT,
                        quantity: item.quantity,
                        reason: `Delivered for part request ${request.id}`,
                    },
                });
            }
            await tx.repair.update({ where: { id: request.repairId }, data: { status: repair_status_1.RepairStatus.PARTS_READY } });
            return tx.partRequest.update({
                where: { id },
                data: { status: client_1.PartRequestStatus.DELIVERED },
                include: this.include(),
            });
        });
    }
    include() {
        return {
            repair: { include: { contact: true } },
            technician: { include: { user: true } },
            items: { include: { product: true } },
        };
    }
};
exports.PartRequestsService = PartRequestsService;
exports.PartRequestsService = PartRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartRequestsService);
//# sourceMappingURL=part-requests.service.js.map