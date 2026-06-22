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
exports.CommissionQueryDto = exports.BulkSaveStatusMappingsDto = exports.BulkStatusMappingItemDto = exports.BulkSaveRepairTypesDto = exports.BulkRepairTypeItemDto = exports.UpdateRepairTypeDto = exports.CreateRepairTypeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateRepairTypeDto {
}
exports.CreateRepairTypeDto = CreateRepairTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRepairTypeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRepairTypeDto.prototype, "commissionRate", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateRepairTypeDto.prototype, "managedByAdmin", void 0);
class UpdateRepairTypeDto {
}
exports.UpdateRepairTypeDto = UpdateRepairTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRepairTypeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRepairTypeDto.prototype, "commissionRate", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateRepairTypeDto.prototype, "managedByAdmin", void 0);
class BulkRepairTypeItemDto {
}
exports.BulkRepairTypeItemDto = BulkRepairTypeItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkRepairTypeItemDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkRepairTypeItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BulkRepairTypeItemDto.prototype, "commissionRate", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BulkRepairTypeItemDto.prototype, "managedByAdmin", void 0);
class BulkSaveRepairTypesDto {
}
exports.BulkSaveRepairTypesDto = BulkSaveRepairTypesDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkRepairTypeItemDto),
    __metadata("design:type", Array)
], BulkSaveRepairTypesDto.prototype, "types", void 0);
class BulkStatusMappingItemDto {
}
exports.BulkStatusMappingItemDto = BulkStatusMappingItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkStatusMappingItemDto.prototype, "event", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkStatusMappingItemDto.prototype, "status", void 0);
class BulkSaveStatusMappingsDto {
}
exports.BulkSaveStatusMappingsDto = BulkSaveStatusMappingsDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkStatusMappingItemDto),
    __metadata("design:type", Array)
], BulkSaveStatusMappingsDto.prototype, "mappings", void 0);
class CommissionQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.CommissionQueryDto = CommissionQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CommissionQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CommissionQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommissionQueryDto.prototype, "technicianId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommissionQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommissionQueryDto.prototype, "endDate", void 0);
//# sourceMappingURL=technician-management.dto.js.map