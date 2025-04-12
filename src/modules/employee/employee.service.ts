import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { departments } from '../department/department.service';

export interface Employee {
    id: number;
    name: string;
    email: string;
    departmentId: number | null; // Null if no department is assigned
  }

  export const employees: Employee[] = [];

@Injectable()
export class EmployeeService {
  private idCounter = 1;

  addEmployee(name: string, email: string, departmentId: number | null): Employee {
    // Check if email is already registered
    const existingEmployee = employees.find((emp) => emp.email === email);
    if (existingEmployee) {
      throw new BadRequestException('Email is already registered');
    }

    // Validate departmentId if provided
    if (departmentId !== null) {
      const departmentExists = departments.find((dept) => dept.id === departmentId);
      if (!departmentExists) {
        throw new BadRequestException('Invalid department ID');
      }
    }

    const newEmployee: Employee = { id: this.idCounter++, name, email, departmentId };
    employees.push(newEmployee);

    // Simulate sending an invite email
    console.log(`Invite sent to ${email}`);

    return newEmployee;
  }

  updateEmployee(id: number, name: string, email: string, departmentId: number | null): Employee {
    const employee = employees.find((emp) => emp.id === id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Validate departmentId if provided
    if (departmentId !== null) {
      const departmentExists = departments.find((dept) => dept.id === departmentId);
      if (!departmentExists) {
        throw new BadRequestException('Invalid department ID');
      }
    }

    employee.name = name;
    employee.email = email;
    employee.departmentId = departmentId;

    return employee;
  }

  getAllEmployees(): Employee[] {
    return employees;
  }
}