import { Controller, Post, Put, Delete, Get, Body, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('add')
  addRoom(@Body() body: { name: string; description: string; departmentId: number }) {
    const { name, description, departmentId } = body;
    return this.roomService.addRoom(name, description, departmentId);
  }

  @Put('update/:id')
  updateRoom(
    @Param('id') id: number,
    @Body() body: { name: string; description: string; departmentId: number },
  ) {
    const { name, description, departmentId } = body;
    return this.roomService.updateRoom(+id, name, description, departmentId);
  }

  @Delete('delete/:id')
  deleteRoom(@Param('id') id: number) {
    this.roomService.deleteRoom(+id);
    return { message: 'Room deleted successfully' };
  }

  @Get('all')
  getAllRooms() {
    return this.roomService.getAllRooms();
  }
}