import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { departments } from "../department/department.service";
import { employees } from "../employee/employee.service";

interface Room {
  id: number;
  name: string;
  description: string;
  departmentId: number;
}

interface Booking {
  id: number;
  roomId: number;
  employeeId: number;
  startTime: Date;
  endTime: Date;
}

export const rooms: Room[] = [];
export const bookings: Booking[] = [];
@Injectable()
export class RoomService {
  private idCounter = 1;
  private bookingIdCounter = 1;

  addRoom(name: string, description: string, departmentId: number): Room {
    // Check for duplicate room name
    const existingRoom = rooms.find((room) => room.name === name);
    if (existingRoom) {
      throw new Error("Room with the same name already exists");
    }

    // Validate departmentId
    const departmentExists = departments.find(
      (dept) => dept.id === departmentId
    );
    if (!departmentExists) {
      throw new Error("Invalid department ID");
    }

    const newRoom: Room = {
      id: this.idCounter++,
      name,
      description,
      departmentId,
    };
    rooms.push(newRoom);
    return newRoom;
  }

  updateRoom(
    id: number,
    name: string,
    description: string,
    departmentId: number
  ): Room {
    const room = rooms.find((room) => room.id === id);
    if (!room) {
      throw new NotFoundException("Room not found");
    }

    // Check for duplicate room name
    const duplicateRoom = rooms.find(
      (room) => room.name === name && room.id !== id
    );
    if (duplicateRoom) {
      throw new Error("Room with the same name already exists");
    }

    // Validate departmentId
    const departmentExists = departments.find(
      (dept) => dept.id === departmentId
    );
    if (!departmentExists) {
      throw new Error("Invalid department ID");
    }

    room.name = name;
    room.description = description;
    room.departmentId = departmentId;
    return room;
  }

  deleteRoom(id: number): void {
    const roomIndex = rooms.findIndex((room) => room.id === id);
    if (roomIndex === -1) {
      throw new NotFoundException("Room not found");
    }
    rooms.splice(roomIndex, 1);
  }

  getAllRooms(): Room[] {
    return rooms;
  }

  bookRoom(
    roomId: number,
    employeeId: number,
    startTime: Date,
    endTime: Date
  ): Booking {
    const room = rooms.find((room) => room.id === roomId);
    if (!room) {
      throw new NotFoundException("Room not found");
    }
    // Validate employee
    const employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    // Check for overlapping bookings
    const overlappingBooking = bookings.find(
      (booking) =>
        booking.roomId === roomId &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime) ||
          (startTime <= booking.startTime && endTime >= booking.endTime))
    );
    if (overlappingBooking) {
      throw new BadRequestException(
        "Room is already booked for the selected time"
      );
    }

    const newBooking: Booking = {
      id: this.bookingIdCounter++,
      roomId,
      employeeId,
      startTime,
      endTime,
    };
    bookings.push(newBooking);
    return newBooking;
  }

  getBookingsForRoom(roomId: number): Booking[] {
    return bookings.filter((booking) => booking.roomId === roomId);
  }

  cancelBooking(bookingId: number, employeeId: number): void {
    const bookingIndex = bookings.findIndex(
      (booking) => booking.id === bookingId && booking.employeeId === employeeId
    );
    if (bookingIndex === -1) {
      throw new NotFoundException("Booking not found or not owned by the employee");
    }
    bookings.splice(bookingIndex, 1);
  }

  editBooking(
    bookingId: number,
    employeeId: number,
    startTime: Date,
    endTime: Date
  ): Booking {
    const booking = bookings.find(
      (b) => b.id === bookingId && b.employeeId === employeeId
    );
    if (!booking) {
      throw new NotFoundException("Booking not found or not owned by the employee");
    }

    // Check for overlapping bookings
    const overlappingBooking = bookings.find(
      (b) =>
        b.roomId === booking.roomId &&
        b.id !== bookingId &&
        ((startTime >= b.startTime && startTime < b.endTime) ||
          (endTime > b.startTime && endTime <= b.endTime) ||
          (startTime <= b.startTime && endTime >= b.endTime))
    );
    if (overlappingBooking) {
      throw new BadRequestException(
        "Room is already booked for the selected time"
      );
    }

    booking.startTime = startTime;
    booking.endTime = endTime;
    return booking;
  }

  overrideOrDeleteBooking(bookingId: number): void {
    const bookingIndex = bookings.findIndex((booking) => booking.id === bookingId);
    if (bookingIndex === -1) {
      throw new NotFoundException("Booking not found");
    }
    bookings.splice(bookingIndex, 1);
  }
}
