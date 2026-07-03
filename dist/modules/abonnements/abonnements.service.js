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
exports.AbonnementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AbonnementsService = class AbonnementsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {
            ...(query.contactId ? { contactId: query.contactId } : {}),
            ...(query.status ? { status: query.status } : {}),
            ...(query.search
                ? {
                    OR: [
                        { label: { contains: query.search, mode: 'insensitive' } },
                        { notes: { contains: query.search, mode: 'insensitive' } },
                        { contact: { fullName: { contains: query.search, mode: 'insensitive' } } },
                    ],
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.abonnement.findMany({
                where,
                include: { contact: true },
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: [{ endsAt: 'desc' }, { createdAt: 'desc' }],
            }),
            this.prisma.abonnement.count({ where }),
        ]);
        return { data, total, page: query.page, limit: query.limit };
    }
    async create(dto) {
        await this.ensureContact(dto.contactId);
        const { startsAt, endsAt } = this.parsePeriod(dto.startsAt, dto.endsAt);
        return this.prisma.abonnement.create({
            data: { ...dto, startsAt, endsAt, amount: dto.amount ?? 0 },
            include: { contact: true },
        });
    }
    async update(id, dto) {
        const current = await this.prisma.abonnement.findUniqueOrThrow({ where: { id } });
        const { startsAt, endsAt } = this.parsePeriod(dto.startsAt ?? current.startsAt.toISOString(), dto.endsAt ?? current.endsAt.toISOString());
        return this.prisma.abonnement.update({
            where: { id },
            data: { ...dto, startsAt, endsAt },
            include: { contact: true },
        });
    }
    remove(id) {
        return this.prisma.abonnement.delete({ where: { id }, select: { id: true } });
    }
    parsePeriod(startsAtValue, endsAtValue) {
        const startsAt = new Date(startsAtValue);
        const endsAt = new Date(endsAtValue);
        if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
            throw new common_1.BadRequestException('Invalid abonnement period');
        }
        if (endsAt <= startsAt)
            throw new common_1.BadRequestException('Abonnement end must be after start');
        return { startsAt, endsAt };
    }
    async ensureContact(contactId) {
        const contact = await this.prisma.contact.findUnique({ where: { id: contactId }, select: { id: true } });
        if (!contact)
            throw new common_1.NotFoundException('Contact not found');
    }
};
exports.AbonnementsService = AbonnementsService;
exports.AbonnementsService = AbonnementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AbonnementsService);
//# sourceMappingURL=abonnements.service.js.map