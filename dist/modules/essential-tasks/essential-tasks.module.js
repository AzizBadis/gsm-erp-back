"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssentialTasksModule = void 0;
const common_1 = require("@nestjs/common");
const essential_tasks_controller_1 = require("./essential-tasks.controller");
const essential_tasks_service_1 = require("./essential-tasks.service");
let EssentialTasksModule = class EssentialTasksModule {
};
exports.EssentialTasksModule = EssentialTasksModule;
exports.EssentialTasksModule = EssentialTasksModule = __decorate([
    (0, common_1.Module)({
        controllers: [essential_tasks_controller_1.EssentialTasksController],
        providers: [essential_tasks_service_1.EssentialTasksService],
    })
], EssentialTasksModule);
//# sourceMappingURL=essential-tasks.module.js.map