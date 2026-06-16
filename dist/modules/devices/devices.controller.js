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
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const devices_service_1 = require("./devices.service");
const device_dto_1 = require("./dto/device.dto");
let DevicesController = class DevicesController {
    constructor(service) {
        this.service = service;
    }
    create(dto) { return this.service.create(dto); }
    findAll(query) { return this.service.findAll(query); }
    findOne(id) { return this.service.findOne(id); }
    update(id, dto) { return this.service.update(id, dto); }
    remove(id) { return this.service.remove(id); }
    createModel(dto) { return this.service.createModel(dto); }
    findModels(query) { return this.service.findModels(query); }
    findModel(id) { return this.service.findModel(id); }
    updateModel(id, dto) { return this.service.updateModel(id, dto); }
    removeModel(id) { return this.service.removeModel(id); }
};
exports.DevicesController = DevicesController;
__decorate([
    (0, common_1.Post)('devices'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('devices'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('devices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('devices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, device_dto_1.UpdateDeviceDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('devices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('device-models'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.CreateDeviceModelDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "createModel", null);
__decorate([
    (0, common_1.Get)('device-models'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "findModels", null);
__decorate([
    (0, common_1.Get)('device-models/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "findModel", null);
__decorate([
    (0, common_1.Patch)('device-models/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, device_dto_1.UpdateDeviceModelDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "updateModel", null);
__decorate([
    (0, common_1.Delete)('device-models/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "removeModel", null);
exports.DevicesController = DevicesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [devices_service_1.DevicesService])
], DevicesController);
//# sourceMappingURL=devices.controller.js.map