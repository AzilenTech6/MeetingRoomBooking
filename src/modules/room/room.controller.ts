import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
} from "@nestjs/common";
import { RoomService } from "./room.service";

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post("add")
  addRoom(
    @Body() body: { name: string; description: string; departmentId: number }
  ) {
    const { name, description, departmentId } = body;
    return this.roomService.addRoom(name, description, departmentId);
  }

  @Put("update/:id")
  updateRoom(
    @Param("id") id: number,
    @Body() body: { name: string; description: string; departmentId: number }
  ) {
    const { name, description, departmentId } = body;
    return this.roomService.updateRoom(+id, name, description, departmentId);
  }

  @Delete("delete/:id")
  deleteRoom(@Param("id") id: number) {
    this.roomService.deleteRoom(+id);
    return { message: "Room deleted successfully" };
  }

  @Get("all")
  getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Post("book")
  bookRoom(
    @Body()
    body: {
      roomId: number;
      employeeId: number;
      startTime: string; // ISO string format
      endTime: string; // ISO string format
    }
  ) {
    const { roomId, employeeId, startTime, endTime } = body;
    return this.roomService.bookRoom(
      roomId,
      employeeId,
      new Date(startTime),
      new Date(endTime)
    );
  }

  @Get(":roomId/bookings")
  getBookingsForRoom(@Param("roomId") roomId: number) {
    return this.roomService.getBookingsForRoom(+roomId);
  }

  cancelBooking(
    @Param("bookingId") bookingId: number,
    @Body() body: { employeeId: number }
  ) {
    const { employeeId } = body;
    this.roomService.cancelBooking(+bookingId, employeeId);
    return { message: "Booking canceled successfully" };
  }

  @Put("booking/edit/:bookingId")
  editBooking(
    @Param("bookingId") bookingId: number,
    @Body()
    body: {
      employeeId: number;
      startTime: string; // ISO string format
      endTime: string; // ISO string format
    }
  ) {
    const { employeeId, startTime, endTime } = body;
    return this.roomService.editBooking(
      +bookingId,
      employeeId,
      new Date(startTime),
      new Date(endTime)
    );
  }

  @Delete("booking/override/:bookingId")
  overrideOrDeleteBooking(@Param("bookingId") bookingId: number) {
    this.roomService.overrideOrDeleteBooking(+bookingId);
    return { message: "Booking overridden or deleted successfully" };
  }
}
