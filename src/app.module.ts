import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './modules/example/example.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomService } from './modules/room/room.service';
import { RoomController } from './modules/room/room.controller';
import { RoomService } from './modules/room/room.service';

@Module({
  imports: [ExampleModule, AuthModule],
  controllers: [AppController, RoomController],
  providers: [AppService, RoomService],
})
export class AppModule {}