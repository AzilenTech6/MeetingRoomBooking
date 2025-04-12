import { Controller, Post, Put, Get, Body, Param, Delete } from '@nestjs/common';
import { Employee, EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('add')
  addEmployee(
    @Body() body: { name: string; email: string; departmentIds: number[] },
  ): Employee {
    const { name, email, departmentIds } = body;
    return this.employeeService.addEmployee(name, email, departmentIds);
  }

  @Put('update/:id')
  updateEmployee(
    @Param('id') id: number,
    @Body() body: { name: string; email: string; departmentIds: number[] },
  ): Employee {
    const { name, email, departmentIds } = body;
    return this.employeeService.updateEmployee(+id, name, email, departmentIds);
  }

  @Get('all')
  getAllEmployees(): Employee[] {
    return this.employeeService.getAllEmployees();
  }

@Delete('delete/:id')
  deleteEmployee(@Param('id') id: number): { message: string } {
    this.employeeService.deleteEmployee(+id);
    return { message: 'Employee deleted successfully' };
  }
}