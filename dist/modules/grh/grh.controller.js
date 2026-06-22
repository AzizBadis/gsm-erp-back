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
exports.GrhController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const grh_record_dto_1 = require("./dto/grh-record.dto");
const grh_service_1 = require("./grh.service");
let GrhController = class GrhController {
    constructor(grh) {
        this.grh = grh;
    }
    dashboard() { return this.grh.dashboard(); }
    findAll(type, search) { return this.grh.findAll(type, search); }
    create(type, dto) { return this.grh.create(type, dto); }
    update(id, dto) { return this.grh.update(id, dto); }
    remove(id) { return this.grh.remove(id); }
};
exports.GrhController = GrhController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GrhController.prototype, "dashboard", null);
__decorate([
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GrhController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, grh_record_dto_1.CreateGrhRecordDto]),
    __metadata("design:returntype", void 0)
], GrhController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, grh_record_dto_1.UpdateGrhRecordDto]),
    __metadata("design:returntype", void 0)
], GrhController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GrhController.prototype, "remove", null);
exports.GrhController = GrhController = __decorate([
    (0, common_1.Controller)('grh'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [grh_service_1.GrhService])
], GrhController);
//# sourceMappingURL=grh.controller.js.map