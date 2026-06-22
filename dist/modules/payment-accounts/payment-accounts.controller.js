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
exports.PaymentAccountsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const payment_account_dto_1 = require("./dto/payment-account.dto");
const payment_accounts_service_1 = require("./payment-accounts.service");
let PaymentAccountsController = class PaymentAccountsController {
    constructor(s) {
        this.s = s;
    }
    accounts() { return this.s.accounts(); }
    create(d, u) { return this.s.createAccount(d, u.email); }
    transactions(q) { return this.s.transactions(q); }
    createTransaction(d, u) { return this.s.createTransaction(d, u.email); }
    trial() { return this.s.trialBalance(); }
};
exports.PaymentAccountsController = PaymentAccountsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentAccountsController.prototype, "accounts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_account_dto_1.CreatePaymentAccountDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentAccountsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PaymentAccountsController.prototype, "transactions", null);
__decorate([
    (0, common_1.Post)('transactions'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_account_dto_1.CreateAccountTransactionDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentAccountsController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Get)('trial-balance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentAccountsController.prototype, "trial", null);
exports.PaymentAccountsController = PaymentAccountsController = __decorate([
    (0, common_1.Controller)('payment-accounts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [payment_accounts_service_1.PaymentAccountsService])
], PaymentAccountsController);
//# sourceMappingURL=payment-accounts.controller.js.map