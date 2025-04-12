import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { Employee, EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('add')
  addEmployee(
    @Body() body: { name: string; email: string; departmentId: number | null },
  ): Employee {
    const { name, email, departmentId } = body;
    return this.employeeService.addEmployee(name, email, departmentId);
  }

  @Put('update/:id')
  updateEmployee(
    @Param('id') id: number,
    @Body() body: { name: string; email: string; departmentId: number | null },
  ): Employee {
    const { name, email, departmentId } = body;
    return this.employeeService.updateEmployee(+id, name, email, departmentId);
  }

  @Get('all')
  getAllEmployees(): Employee[] {
    return this.employeeService.getAllEmployees();
  }
}