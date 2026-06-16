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
exports.AdminRepairsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const repair_dto_1 = require("./dto/repair.dto");
const repairs_service_1 = require("./repairs.service");
let AdminRepairsController = class AdminRepairsController {
    constructor(repairs) {
        this.repairs = repairs;
    }
    create(dto) { return this.repairs.create(dto); }
    findAll(query) { return this.repairs.findAll(query); }
    statuses() { return Object.values(client_1.RepairStatus); }
    findOne(id) { return this.repairs.findOne(id); }
    assign(id, dto) { return this.repairs.assign(id, dto); }
    updateStatus(id, dto) { return this.repairs.updateStatus(id, dto); }
};
exports.AdminRepairsController = AdminRepairsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [repair_dto_1.CreateRepairDto]),
    __metadata("design:returntype", void 0)
], AdminRepairsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.RepairFilterDto]),
    __metadata("design:returntype", void 0)
], AdminRepairsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statuses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminRepairsController.prototype, "statuses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminRepairsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, repair_dto_1.AssignRepairDto]),
    __metadata("design:returntype", void 0)
], AdminRepairsController.prototype, "assign", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, repair_dto_1.UpdateRepairStatusDto]),
    __metadata("design:returntype", void 0)
], AdminRepairsController.prototype, "updateStatus", null);
exports.AdminRepairsController = AdminRepairsController = __decorate([
    (0, common_1.Controller)('repairs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [repairs_service_1.RepairsService])
], AdminRepairsController);
//# sourceMappingURL=admin-repairs.controller.js.map