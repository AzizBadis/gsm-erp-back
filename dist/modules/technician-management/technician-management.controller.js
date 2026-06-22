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
exports.TechnicianManagementController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const technician_management_service_1 = require("./technician-management.service");
const technician_management_dto_1 = require("./dto/technician-management.dto");
let TechnicianManagementController = class TechnicianManagementController {
    constructor(service) {
        this.service = service;
    }
    getDashboardStats() {
        return this.service.getDashboardStats();
    }
    getCommissions(query) {
        return this.service.getCommissions(query);
    }
    getRepairTypes() {
        return this.service.getRepairTypes();
    }
    createRepairType(dto) {
        return this.service.createRepairType(dto);
    }
    updateRepairType(id, dto) {
        return this.service.updateRepairType(id, dto);
    }
    deleteRepairType(id) {
        return this.service.deleteRepairType(id);
    }
    bulkSaveRepairTypes(dto) {
        return this.service.bulkSaveRepairTypes(dto.types);
    }
    getStatusMappings() {
        return this.service.getStatusMappings();
    }
    createStatusMapping(dto) {
        return this.service.createStatusMapping(dto);
    }
    updateStatusMapping(id, dto) {
        return this.service.updateStatusMapping(id, dto);
    }
    deleteStatusMapping(id) {
        return this.service.deleteStatusMapping(id);
    }
    bulkSaveStatusMappings(dto) {
        return this.service.bulkSaveStatusMappings(dto.mappings);
    }
};
exports.TechnicianManagementController = TechnicianManagementController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('commissions'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [technician_management_dto_1.CommissionQueryDto]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "getCommissions", null);
__decorate([
    (0, common_1.Get)('repair-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "getRepairTypes", null);
__decorate([
    (0, common_1.Post)('repair-types'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [technician_management_dto_1.CreateRepairTypeDto]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "createRepairType", null);
__decorate([
    (0, common_1.Patch)('repair-types/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, technician_management_dto_1.UpdateRepairTypeDto]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "updateRepairType", null);
__decorate([
    (0, common_1.Delete)('repair-types/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "deleteRepairType", null);
__decorate([
    (0, common_1.Put)('repair-types/bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [technician_management_dto_1.BulkSaveRepairTypesDto]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "bulkSaveRepairTypes", null);
__decorate([
    (0, common_1.Get)('status-mappings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "getStatusMappings", null);
__decorate([
    (0, common_1.Post)('status-mappings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "createStatusMapping", null);
__decorate([
    (0, common_1.Patch)('status-mappings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "updateStatusMapping", null);
__decorate([
    (0, common_1.Delete)('status-mappings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "deleteStatusMapping", null);
__decorate([
    (0, common_1.Put)('status-mappings/bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [technician_management_dto_1.BulkSaveStatusMappingsDto]),
    __metadata("design:returntype", void 0)
], TechnicianManagementController.prototype, "bulkSaveStatusMappings", null);
exports.TechnicianManagementController = TechnicianManagementController = __decorate([
    (0, common_1.Controller)('technician-management'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [technician_management_service_1.TechnicianManagementService])
], TechnicianManagementController);
//# sourceMappingURL=technician-management.controller.js.map