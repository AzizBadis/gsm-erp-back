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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockAdjustmentDto = exports.StockAdjustmentItemDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class StockAdjustmentItemDto {
}
exports.StockAdjustmentItemDto = StockAdjustmentItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockAdjustmentItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], StockAdjustmentItemDto.prototype, "quantity", void 0);
class CreateStockAdjustmentDto {
}
exports.CreateStockAdjustmentDto = CreateStockAdjustmentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockAdjustmentDto.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateStockAdjustmentDto.prototype, "adjustmentDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockAdjustmentDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.StockAdjustmentType),
    __metadata("design:type", typeof (_a = typeof client_1.StockAdjustmentType !== "undefined" && client_1.StockAdjustmentType) === "function" ? _a : Object)
], CreateStockAdjustmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateStockAdjustmentDto.prototype, "recoveredAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockAdjustmentDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StockAdjustmentItemDto),
    __metadata("design:type", Array)
], CreateStockAdjustmentDto.prototype, "items", void 0);
//# sourceMappingURL=stock-adjustment.dto.js.map