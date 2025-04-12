import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RoomController } from './modules/room/room.controller';
import { RoomModule } from './modules/room/room.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [AuthModule,RoomModule, DepartmentModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}