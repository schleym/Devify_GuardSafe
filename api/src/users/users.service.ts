import { Injectable, ConflictException, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap() {
    // Seeding automático de usuarios por defecto
    try {
      const admin = await this.findByEmail('admin@gmail.com');
      if (!admin) {
        await this.create({
          email: 'admin@gmail.com',
          name: 'Administrador Principal',
          password: 'admin1234',
          role: 'Administrador',
        });
        console.log('🌱 Usuario administrador por defecto sembrado exitosamente.');
      }
    } catch (e) {
      console.error('Error al sembrar administrador:', e);
    }

    try {
      const guard = await this.findByEmail('guardia@gmail.com');
      if (!guard) {
        await this.create({
          email: 'guardia@gmail.com',
          name: 'Juan Guardia',
          password: 'guardia1234',
          role: 'Guardia de Seguridad',
        });
        console.log('🌱 Usuario guardia por defecto sembrado exitosamente.');
      }
    } catch (e) {
      console.error('Error al sembrar guardia:', e);
    }
  }

  async create(data: { email: string; name?: string; password?: string; role?: string }) {
    // 1. Evitar emails duplicados con ConflictException
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // 2. Hashear contraseña con bcrypt.hash
    let hashedPassword = '';
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role || 'Guardia de Seguridad',
      },
    });
  }

  // 3. Exponer findByEmail
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // 4. Exponer findById
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
}
