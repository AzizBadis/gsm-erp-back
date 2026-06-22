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
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const TYPES = ['prospects', 'follow-ups', 'campaigns', 'contact-follow-ups', 'proposal-templates', 'proposals', 'sources', 'life-stages', 'follow-up-categories', 'settings'];
let CrmService = class CrmService {
    constructor(p) {
        this.p = p;
    }
    async dashboard() { const [grouped, contacts] = await Promise.all([this.p.crmRecord.groupBy({ by: ['type'], _count: { _all: true } }), this.p.contact.count()]); const count = (type) => grouped.find(x => x.type === type)?._count._all ?? 0; const followups = await this.p.crmRecord.findMany({ where: { type: 'follow-ups' } }); const byStatus = followups.reduce((a, r) => { const key = r.status ?? 'Sans statut'; a[key] = (a[key] ?? 0) + 1; return a; }, {}); return { contacts, prospects: count('prospects'), followUps: count('follow-ups'), campaigns: count('campaigns'), proposals: count('proposals'), sources: count('sources'), byStatus }; }
    findAll(type, search) { this.assert(type); return this.p.crmRecord.findMany({ where: { type, ...(search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] } : {}) }, orderBy: { createdAt: 'desc' } }); }
    create(type, dto, createdBy) { this.assert(type); return this.p.crmRecord.create({ data: { type, name: dto.name, description: dto.description, status: dto.status, data: (dto.data ?? {}), createdBy } }); }
    update(id, dto) { return this.p.crmRecord.update({ where: { id }, data: { name: dto.name, description: dto.description, status: dto.status, data: dto.data } }); }
    remove(id) { return this.p.crmRecord.delete({ where: { id }, select: { id: true } }); }
    async reports() { const rows = await this.p.crmRecord.groupBy({ by: ['type'], _count: { _all: true } }); return rows.map(x => ({ type: x.type, total: x._count._all })); }
    assert(type) { if (!TYPES.includes(type))
        throw new common_1.BadRequestException('Invalid CRM type'); }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CrmService);
//# sourceMappingURL=crm.service.js.map