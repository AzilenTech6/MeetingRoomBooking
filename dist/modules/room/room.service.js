"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = exports.rooms = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("../department/department.service");
exports.rooms = [];
let RoomService = class RoomService {
    constructor() {
        this.idCounter = 1;
    }
    addRoom(name, description, departmentId) {
        const existingRoom = exports.rooms.find((room) => room.name === name);
        if (existingRoom) {
            throw new Error('Room with the same name already exists');
        }
        const departmentExists = department_service_1.departments.find((dept) => dept.id === departmentId);
        if (!departmentExists) {
            throw new Error('Invalid department ID');
        }
        const newRoom = { id: this.idCounter++, name, description, departmentId };
        exports.rooms.push(newRoom);
        return newRoom;
    }
    updateRoom(id, name, description, departmentId) {
        const room = exports.rooms.find((room) => room.id === id);
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        const duplicateRoom = exports.rooms.find((room) => room.name === name && room.id !== id);
        if (duplicateRoom) {
            throw new Error('Room with the same name already exists');
        }
        const departmentExists = department_service_1.departments.find((dept) => dept.id === departmentId);
        if (!departmentExists) {
            throw new Error('Invalid department ID');
        }
        room.name = name;
        room.description = description;
        room.departmentId = departmentId;
        return room;
    }
    deleteRoom(id) {
        const roomIndex = exports.rooms.findIndex((room) => room.id === id);
        if (roomIndex === -1) {
            throw new common_1.NotFoundException('Room not found');
        }
        exports.rooms.splice(roomIndex, 1);
    }
    getAllRooms() {
        return exports.rooms;
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)()
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map