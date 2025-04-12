import { Injectable, NotFoundException } from '@nestjs/common';

interface Room {
  id: number;
  name: string;
  description: string;
}
export const rooms: Room[] = [];
@Injectable()
export class RoomService {
  private idCounter = 1;

  addRoom(name: string, description: string): Room {
    // Check for duplicate room name
    const existingRoom = rooms.find((room) => room.name === name);
    if (existingRoom) {
      throw new Error('Room with the same name already exists');
    }
  
    const newRoom: Room = { id: this.idCounter++, name, description };
    rooms.push(newRoom);
    return newRoom;
  }

  updateRoom(id: number, name: string, description: string): Room {
    const room = rooms.find((room) => room.id === id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
  
    // Check for duplicate room name
    const duplicateRoom = rooms.find((room) => room.name === name && room.id !== id);
    if (duplicateRoom) {
      throw new Error('Room with the same name already exists');
    }
  
    room.name = name;
    room.description = description;
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