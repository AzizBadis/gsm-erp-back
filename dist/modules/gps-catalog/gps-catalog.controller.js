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
exports.GpsCatalogController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const gps_catalog_dto_1 = require("./gps-catalog.dto");
const gps_catalog_service_1 = require("./gps-catalog.service");
let GpsCatalogController = class GpsCatalogController {
    constructor(service) {
        this.service = service;
    }
    models() { return this.service.listModels(); }
    createModel(dto) { return this.service.createModel(dto); }
    updateModel(id, dto) { return this.service.updateModel(id, dto); }
    deleteModel(id) { return this.service.deleteModel(id); }
    operators() { return this.service.listOperators(); }
    createOperator(dto) { return this.service.createOperator(dto); }
    updateOperator(id, dto) { return this.service.updateOperator(id, dto); }
    deleteOperator(id) { return this.service.deleteOperator(id); }
};
exports.GpsCatalogController = GpsCatalogController;
__decorate([
    (0, common_1.Get)('gps-models'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "models", null);
__decorate([
    (0, common_1.Post)('gps-models'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gps_catalog_dto_1.CreateCatalogItemDto]),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "createModel", null);
__decorate([
    (0, common_1.Patch)('gps-models/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, gps_catalog_dto_1.UpdateCatalogItemDto]),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "updateModel", null);
__decorate([
    (0, common_1.Delete)('gps-models/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "deleteModel", null);
__decorate([
    (0, common_1.Get)('operators'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "operators", null);
__decorate([
    (0, common_1.Post)('operators'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gps_catalog_dto_1.CreateCatalogItemDto]),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "createOperator", null);
__decorate([
    (0, common_1.Patch)('operators/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, gps_catalog_dto_1.UpdateCatalogItemDto]),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "updateOperator", null);
__decorate([
    (0, common_1.Delete)('operators/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GpsCatalogController.prototype, "deleteOperator", null);
exports.GpsCatalogController = GpsCatalogController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [gps_catalog_service_1.GpsCatalogService])
], GpsCatalogController);
//# sourceMappingURL=gps-catalog.controller.js.map