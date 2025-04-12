import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly superAdminCredentials = {
    username: 'superadmin',
    password: 'superpassword',
  };

  login(username: string, password: string) {
    if (
      username === this.superAdminCredentials.username &&
      password === this.superAdminCredentials.password
    ) {
      return {
        message: 'Login successful',
        role: 'SUPER_ADMIN',
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}