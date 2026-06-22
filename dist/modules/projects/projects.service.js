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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(p) {
        this.p = p;
    }
    projects() { return this.p.project.findMany({ include: { category: true, tasks: true, timeLogs: true }, orderBy: { createdAt: 'desc' } }); }
    createProject(d, createdBy) { return this.p.project.create({ data: { ...d, startDate: d.startDate ? new Date(d.startDate) : undefined, endDate: d.endDate ? new Date(d.endDate) : undefined, customFields: (d.customFields ?? {}), createdBy }, include: { category: true } }); }
    tasks() { return this.p.projectTask.findMany({ include: { project: true, timeLogs: true }, orderBy: { createdAt: 'desc' } }); }
    createTask(d) { return this.p.projectTask.create({ data: { ...d, startDate: d.startDate ? new Date(d.startDate) : undefined, endDate: d.endDate ? new Date(d.endDate) : undefined, customFields: (d.customFields ?? {}) }, include: { project: true } }); }
    categories() { return this.p.projectCategory.findMany({ orderBy: { name: 'asc' } }); }
    createCategory(d) { return this.p.projectCategory.create({ data: d }); }
    deleteCategory(id) { return this.p.projectCategory.delete({ where: { id }, select: { id: true } }); }
    createTimeLog(d) { return this.p.projectTimeLog.create({ data: d }); }
    async reports() { const [projects, users] = await Promise.all([this.p.project.findMany({ include: { timeLogs: true } }), this.p.projectTimeLog.groupBy({ by: ['userName'], _sum: { minutes: true } })]); return { byProject: projects.map(x => ({ name: x.name, minutes: x.timeLogs.reduce((s, t) => s + t.minutes, 0) })), byUser: users.map(x => ({ name: x.userName, minutes: x._sum.minutes ?? 0 })) }; }
    settings() { return this.p.projectSettings.upsert({ where: { id: 'default' }, create: { id: 'default' }, update: {} }); }
    saveSettings(d) { return this.p.projectSettings.upsert({ where: { id: 'default' }, create: { id: 'default', ...d }, update: d }); }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map