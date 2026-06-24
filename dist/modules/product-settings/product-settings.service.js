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
exports.ProductSettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const TYPES = [
    'categories',
    'units',
    'warranties',
    'price-groups',
    'variations',
    'labels',
    'import-jobs',
    'price-updates',
    'initial-stock-imports',
];
let ProductSettingsService = class ProductSettingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(type, search) {
        this.assertType(type);
        return this.prisma.grhRecord.findMany({
            where: {
                type: this.storageType(type),
                ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    create(type, dto) {
        this.assertType(type);
        return this.prisma.grhRecord.create({
            data: {
                type: this.storageType(type),
                name: dto.name,
                description: dto.description,
                data: (dto.data ?? {}),
            },
        });
    }
    update(id, dto) {
        return this.prisma.grhRecord.update({
            where: { id },
            data: { ...dto, data: dto.data },
        });
    }
    remove(id) {
        return this.prisma.grhRecord.delete({ where: { id }, select: { id: true } });
    }
    storageType(type) {
        return `product-${type}`;
    }
    assertType(type) {
        if (!TYPES.includes(type)) {
            throw new common_1.BadRequestException('Invalid product setting type');
        }
    }
};
exports.ProductSettingsService = ProductSettingsService;
exports.ProductSettingsService = ProductSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductSettingsService);
//# sourceMappingURL=product-settings.service.js.map