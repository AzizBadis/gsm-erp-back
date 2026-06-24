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
exports.ProductSettingsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const product_setting_dto_1 = require("./dto/product-setting.dto");
const product_settings_service_1 = require("./product-settings.service");
let ProductSettingsController = class ProductSettingsController {
    constructor(settings) {
        this.settings = settings;
    }
    findAll(type, search) {
        return this.settings.findAll(type, search);
    }
    create(type, dto) {
        return this.settings.create(type, dto);
    }
    update(id, dto) {
        return this.settings.update(id, dto);
    }
    remove(id) {
        return this.settings.remove(id);
    }
};
exports.ProductSettingsController = ProductSettingsController;
__decorate([
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductSettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_setting_dto_1.CreateProductSettingDto]),
    __metadata("design:returntype", void 0)
], ProductSettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_setting_dto_1.UpdateProductSettingDto]),
    __metadata("design:returntype", void 0)
], ProductSettingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductSettingsController.prototype, "remove", null);
exports.ProductSettingsController = ProductSettingsController = __decorate([
    (0, common_1.Controller)('product-settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [product_settings_service_1.ProductSettingsService])
], ProductSettingsController);
//# sourceMappingURL=product-settings.controller.js.map