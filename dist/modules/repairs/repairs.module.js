"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairsModule = void 0;
const common_1 = require("@nestjs/common");
const admin_repairs_controller_1 = require("./admin-repairs.controller");
const technician_tasks_controller_1 = require("./technician-tasks.controller");
const repairs_service_1 = require("./repairs.service");
const technician_management_module_1 = require("../technician-management/technician-management.module");
let RepairsModule = class RepairsModule {
};
exports.RepairsModule = RepairsModule;
exports.RepairsModule = RepairsModule = __decorate([
    (0, common_1.Module)({
        imports: [technician_management_module_1.TechnicianManagementModule],
        controllers: [admin_repairs_controller_1.AdminRepairsController, technician_tasks_controller_1.TechnicianTasksController],
        providers: [repairs_service_1.RepairsService],
        exports: [repairs_service_1.RepairsService],
    })
], RepairsModule);
//# sourceMappingURL=repairs.module.js.map