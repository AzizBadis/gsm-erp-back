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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ExpensesService = class ExpensesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    listCategories() { return this.prisma.expenseCategory.findMany({ include: { parent: true, children: true }, orderBy: [{ parentId: 'asc' }, { name: 'asc' }] }); }
    createCategory(dto) { return this.prisma.expenseCategory.create({ data: dto }); }
    updateCategory(id, dto) { return this.prisma.expenseCategory.update({ where: { id }, data: dto }); }
    deleteCategory(id) { return this.prisma.expenseCategory.delete({ where: { id }, select: { id: true } }); }
    async findAll(q) { const where = q.search ? { OR: [{ reference: { contains: q.search, mode: 'insensitive' } }, { expenseFor: { contains: q.search, mode: 'insensitive' } }, { note: { contains: q.search, mode: 'insensitive' } }, { category: { name: { contains: q.search, mode: 'insensitive' } } }] } : {}; const [data, total] = await Promise.all([this.prisma.expense.findMany({ where, include: { category: true, subCategory: true }, skip: (q.page - 1) * q.limit, take: q.limit, orderBy: { expenseDate: 'desc' } }), this.prisma.expense.count({ where })]); return { data, total, page: q.page, limit: q.limit }; }
    async create(dto, addedBy) { const count = await this.prisma.expense.count(); return this.prisma.expense.create({ data: { ...dto, reference: dto.reference?.trim() || `EXP-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`, expenseDate: dto.expenseDate ? new Date(dto.expenseDate) : new Date(), paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : undefined, addedBy }, include: { category: true, subCategory: true } }); }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map