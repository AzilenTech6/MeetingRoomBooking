"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = exports.departments = void 0;
const common_1 = require("@nestjs/common");
exports.departments = [];
let DepartmentService = class DepartmentService {
    constructor() {
        this.idCounter = 1;
    }
    addDepartment(name, description) {
        const existingDepartment = exports.departments.find((dept) => dept.name === name);
        if (existingDepartment) {
            throw new Error('Department with the same name already exists');
        }
        const newDepartment = { id: this.idCounter++, name, description };
        exports.departments.push(newDepartment);
        return newDepartment;
    }
    updateDepartment(id, name, description) {
        const department = exports.departments.find((dept) => dept.id === id);
        if (!department) {
            throw new common_1.NotFoundException('Department not found');
        }
        const duplicateDepartment = exports.departments.find((dept) => dept.name === name && dept.id !== id);
        if (duplicateDepartment) {
            throw new Error('Department with the same name already exists');
        }
        department.name = name;
        department.description = description;
        return department;
    }
    deleteDepartment(id) {
        const departmentIndex = exports.departments.findIndex((dept) => dept.id === id);
        if (departmentIndex === -1) {
            throw new common_1.NotFoundException('Department not found');
        }
        exports.departments.splice(departmentIndex, 1);
    }
    getAllDepartments() {
        return exports.departments;
    }
};
DepartmentService = __decorate([
    (0, common_1.Injectable)()
], DepartmentService);
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map