import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    const user = await this.usersService.create(dto);
    const payload = { sub: user.id, email: user.email, name: user.name, role: user.role };
    
    // Obtener expiresIn numérico
    const expiresInSec = parseInt(process.env['JWT_EXPIRES'] || '3600', 10);

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: expiresInSec }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Validar contraseña con bcrypt.compare
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, name: user.name, role: user.role };
    const expiresInSec = parseInt(process.env['JWT_EXPIRES'] || '3600', 10);

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: expiresInSec }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async getProfile(userId: number) {
    const user = await this.usersService.findById(userId);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
