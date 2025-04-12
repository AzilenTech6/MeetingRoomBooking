import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { departments } from '../department/department.service';

export interface Employee {
  id: number;
  name: string;
  email: string;
  departmentIds: number[]; // Allow multiple departments
}

export const employees: Employee[] = [];

@Injectable()
export class EmployeeService {
  private idCounter = 1;

  addEmployee(name: string, email: string, departmentIds: number[]): Employee {
    // Check if email is already registered
    const existingEmployee = employees.find((emp) => emp.email === email);
    if (existingEmployee) {
      throw new BadRequestException('Email is already registered');
    }

    // Validate departmentIds
    if (!departmentIds || departmentIds.length === 0) {
      throw new BadRequestException('At least one department ID must be provided');
    }
    departmentIds.forEach((departmentId) => {
      const departmentExists = departments.find((dept) => dept.id === departmentId);
      if (!departmentExists) {
        throw new BadRequestException(`Invalid department ID: ${departmentId}`);
      }
    });

    const newEmployee: Employee = { id: this.idCounter++, name, email, departmentIds };
    employees.push(newEmployee);

    // Simulate sending an invite email
    console.log(`Invite sent to ${email}`);

    return newEmployee;
  }

  updateEmployee(id: number, name: string, email: string, departmentIds: number[]): Employee {
    const employee = employees.find((emp) => emp.id === id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Validate departmentIds
    if (!departmentIds || departmentIds.length === 0) {
      throw new BadRequestException('At least one department ID must be provided');
    }
    departmentIds.forEach((departmentId) => {
      const departmentExists = departments.find((dept) => dept.id === departmentId);
      if (!departmentExists) {
        throw new BadRequestException(`Invalid department ID: ${departmentId}`);
      }
    });

    employee.name = name;
    employee.email = email;
    employee.departmentIds = departmentIds;

    return employee;
  }

  getAllEmployees(): Employee[] {
    return employees;
  }

  deleteEmployee(id: number): void {
    const employeeIndex = employees.findIndex((emp) => emp.id === id);
    if (employeeIndex === -1) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    employees.splice(employeeIndex, 1);
  }
}