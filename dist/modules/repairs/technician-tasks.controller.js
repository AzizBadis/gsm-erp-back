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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianTasksController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const repair_dto_1 = require("./dto/repair.dto");
const repairs_service_1 = require("./repairs.service");
let TechnicianTasksController = class TechnicianTasksController {
    constructor(repairs) {
        this.repairs = repairs;
    }
    tasks(user, query) { return this.repairs.technicianTasks(user.technicianId, query); }
    task(id, user) { return this.repairs.technicianTask(id, user.technicianId); }
    start(id, user) { return this.repairs.start(id, user.technicianId); }
    pause(id, user) { return this.repairs.pause(id, user.technicianId); }
    resume(id, user) { return this.repairs.resume(id, user.technicianId); }
    finish(id, user) { return this.repairs.finish(id, user.technicianId); }
    requestParts(id, user, dto) { return this.repairs.requestParts(id, user.technicianId, dto); }
    partRequests(user) { return this.repairs.partRequestsForTechnician(user.technicianId); }
    notes(id, user, dto) { return this.repairs.updateNotes(id, user.technicianId, dto); }
};
exports.TechnicianTasksController = TechnicianTasksController;
__decorate([
    (0, common_1.Get)('tasks'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.RepairFilterDto]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "tasks", null);
__decorate([
    (0, common_1.Get)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "task", null);
__decorate([
    (0, common_1.Post)('tasks/:id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "start", null);
__decorate([
    (0, common_1.Post)('tasks/:id/pause'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "pause", null);
__decorate([
    (0, common_1.Post)('tasks/:id/resume'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "resume", null);
__decorate([
    (0, common_1.Post)('tasks/:id/finish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "finish", null);
__decorate([
    (0, common_1.Post)('tasks/:id/request-parts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, repair_dto_1.RequestPartsDto]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "requestParts", null);
__decorate([
    (0, common_1.Get)('part-requests'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "partRequests", null);
__decorate([
    (0, common_1.Patch)('tasks/:id/notes'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, repair_dto_1.UpdateRepairNotesDto]),
    __metadata("design:returntype", void 0)
], TechnicianTasksController.prototype, "notes", null);
exports.TechnicianTasksController = TechnicianTasksController = __decorate([
    (0, common_1.Controller)('technician'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.TECHNICIAN),
    __metadata("design:paramtypes", [repairs_service_1.RepairsService])
], TechnicianTasksController);
//# sourceMappingURL=technician-tasks.controller.js.map