import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RoomController } from './modules/room/room.controller';
import { RoomModule } from './modules/room/room.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [AuthModule,RoomModule, DepartmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}