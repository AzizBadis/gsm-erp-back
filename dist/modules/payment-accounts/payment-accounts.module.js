"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAccountsModule = void 0;
const common_1 = require("@nestjs/common");
const payment_accounts_controller_1 = require("./payment-accounts.controller");
const payment_accounts_service_1 = require("./payment-accounts.service");
let PaymentAccountsModule = class PaymentAccountsModule {
};
exports.PaymentAccountsModule = PaymentAccountsModule;
exports.PaymentAccountsModule = PaymentAccountsModule = __decorate([
    (0, common_1.Module)({ controllers: [payment_accounts_controller_1.PaymentAccountsController], providers: [payment_accounts_service_1.PaymentAccountsService] })
], PaymentAccountsModule);
//# sourceMappingURL=payment-accounts.module.js.map