import { Injectable, NotFoundException } from '@nestjs/common';
import { departments } from '../department/department.service';

interface Room {
  id: number;
  name: string;
  description: string;
  departmentId: number; 
}
export const rooms: Room[] = [];
@Injectable()
export class RoomService {
  private idCounter = 1;

  addRoom(name: string, description: string, departmentId: number): Room {
    // Check for duplicate room name
    const existingRoom = rooms.find((room) => room.name === name);
    if (existingRoom) {
      throw new Error('Room with the same name already exists');
    }
  
    // Validate departmentId
    const departmentExists = departments.find((dept) => dept.id === departmentId);
    if (!departmentExists) {
      throw new Error('Invalid department ID');
    }
  
    const newRoom: Room = { id: this.idCounter++, name, description, departmentId };
    rooms.push(newRoom);
    return newRoom;
  }

  updateRoom(id: number, name: string, description: string, departmentId: number): Room {
    const room = rooms.find((room) => room.id === id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
  
    // Check for duplicate room name
    const duplicateRoom = rooms.find((room) => room.name === name && room.id !== id);
    if (duplicateRoom) {
      throw new Error('Room with the same name already exists');
    }
  
    // Validate departmentId
    const departmentExists = departments.find((dept) => dept.id === departmentId);
    if (!departmentExists) {
      throw new Error('Invalid department ID');
    }
  
    room.name = name;
    room.description = description;
    room.departmentId = departmentId;
    return room;
  }

  deleteRoom(id: number): void {
    const roomIndex = rooms.findIndex((room) => room.id === id);
    if (roomIndex === -1) {
      throw new NotFoundException('Room not found');
    }
    rooms.splice(roomIndex, 1);
  }

  getAllRooms(): Room[] {
    return rooms;
  }
}