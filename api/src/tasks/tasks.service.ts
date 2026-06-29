import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: userId,
      },
    });
  }

  // Filtrar por userId en findAll
  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Filtrar por userId en findOne (lanzar NotFoundException 404 si no pertenece)
  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    // Si no existe o no es el dueño, lanzar NotFoundException (HTTP 404)
    if (!task || task.userId !== userId) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada para este usuario`);
    }

    return task;
  }

  // Filtrar y actualizar solo si es dueño
  async update(id: number, userId: number, dto: UpdateTaskDto) {
    // Asegura que existe y pertenece al usuario (si no, lanza 404)
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  // Filtrar y remover solo si es dueño
  async remove(id: number, userId: number) {
    // Asegura que existe y pertenece al usuario (si no, lanza 404)
    await this.findOne(id, userId);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
