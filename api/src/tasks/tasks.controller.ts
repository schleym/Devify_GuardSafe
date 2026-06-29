import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: { sub: number; email: string },
  ) {
    return this.tasksService.create(createTaskDto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Retorna la lista de tareas del usuario.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll(@CurrentUser() user: { sub: number; email: string }) {
    return this.tasksService.findAll(user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea específica por ID' })
  @ApiResponse({ status: 200, description: 'Retorna los detalles de la tarea.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada o no pertenece al usuario.' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { sub: number; email: string },
  ) {
    return this.tasksService.findOne(id, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada o no pertenece al usuario.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { sub: number; email: string },
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, user.sub, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada o no pertenece al usuario.' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { sub: number; email: string },
  ) {
    return this.tasksService.remove(id, user.sub);
  }
}
