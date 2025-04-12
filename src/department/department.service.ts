import { Injectable, NotFoundException } from '@nestjs/common';

export interface Department {
  id: number;
  name: string;
  description: string;
}
export const departments: Department[] = [];
@Injectable()
export class DepartmentService {
  private idCounter = 1;

  addDepartment(name: string, description: string): Department {
    // Check for duplicate department name
    const existingDepartment = departments.find((dept) => dept.name === name);
    if (existingDepartment) {
      throw new Error('Department with the same name already exists');
    }

    const newDepartment: Department = { id: this.idCounter++, name, description };
    departments.push(newDepartment);
    return newDepartment;
  }

  updateDepartment(id: number, name: string, description: string): Department {
    const department = departments.find((dept) => dept.id === id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    // Check for duplicate department name
    const duplicateDepartment = departments.find((dept) => dept.name === name && dept.id !== id);
    if (duplicateDepartment) {
      throw new Error('Department with the same name already exists');
    }

    department.name = name;
    department.description = description;
    return department;
  }

  deleteDepartment(id: number): void {
    const departmentIndex = departments.findIndex((dept) => dept.id === id);
    if (departmentIndex === -1) {
      throw new NotFoundException('Department not found');
    }
    departments.splice(departmentIndex, 1);
  }

  getAllDepartments(): Department[] {
    return departments;
  }
}