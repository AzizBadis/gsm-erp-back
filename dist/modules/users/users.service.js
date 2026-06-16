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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                fullName: dto.fullName,
                role: dto.role,
                isActive: dto.isActive ?? true,
                passwordHash: await bcrypt.hash(dto.password, 12),
            },
        });
        return this.publicUser(user);
    }
    async findAll(query) {
        const where = query.search
            ? { OR: [{ fullName: { contains: query.search, mode: 'insensitive' } }, { email: { contains: query.search, mode: 'insensitive' } }] }
            : {};
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);
        return { data: data.map((user) => this.publicUser(user)), total, page: query.page, limit: query.limit };
    }
    async findOne(id) {
        return this.publicUser(await this.prisma.user.findUniqueOrThrow({ where: { id }, include: { technician: true } }));
    }
    async update(id, dto) {
        const data = { ...dto };
        if (dto.password) {
            data.passwordHash = await bcrypt.hash(dto.password, 12);
            delete data.password;
        }
        return this.publicUser(await this.prisma.user.update({ where: { id }, data }));
    }
    remove(id) {
        return this.prisma.user.delete({ where: { id }, select: { id: true } });
    }
    publicUser(user) {
        const { passwordHash: _, ...publicUser } = user;
        return publicUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map