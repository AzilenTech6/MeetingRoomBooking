import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Department, DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  addDepartment(@Body() body: { name: string; description: string }): Department {
    return this.departmentService.addDepartment(body.name, body.description);
  }

  @Put(':id')
  updateDepartment(
    @Param('id') id: number,
    @Body() body: { name: string; description: string },
  ): Department {
    return this.departmentService.updateDepartment(+id, body.name, body.description);
  }

  @Delete(':id')
  deleteDepartment(@Param('id') id: number): void {
    this.departmentService.deleteDepartment(+id);
  }

  @Get()
  getAllDepartments(): Department[] {
    return this.departmentService.getAllDepartments();
  }
}