import { Injectable, UnauthorizedException } from '@nestjs/common';
import { employees } from '../employee/employee.service'; // Assuming employees array is globally accessible
import { departments } from '../department/department.service'; // Assuming departments array is globally accessible
import { rooms } from '../room/room.service';

@Injectable()
export class AuthService {
  private readonly superAdminCredentials = {
    email: 'superadmin@example.com',
  };

  login(email: string) {
    // Check if the email belongs to the super admin
    if (email === this.superAdminCredentials.email) {
      return {
        email,
        role: 'SUPER_ADMIN',
      };
    }
  
    // Check if the email belongs to an employee
    const employee = employees.find((emp) => emp.email === email);
    if (employee) {
      // Map departmentIds to department names
      const departmentNames = employee.departmentIds.map((id) => {
        const department = departments.find((dept) => dept.id === id);
        return department ? department.name : null;
      }).filter((name) => name !== null); // Filter out any null values
  
      // Map departmentIds to room names and IDs
      const assignedRooms = rooms
        .filter((room) => employee.departmentIds.includes(room.departmentId))
        .map((room) => ({
          id: room.id,
          name: room.name,
        }));
  
      return {
        ...employee,
        role: 'EMPLOYEE',
        departments: departmentNames, // Include department names in the response
        rooms: assignedRooms, // Include assigned rooms in the response
      };
    }
  
    // If email is not found, throw an exception
    throw new UnauthorizedException('Invalid email');
  }
}