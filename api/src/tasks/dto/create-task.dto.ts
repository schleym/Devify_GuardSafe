import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Ronda perimetral Zona A',
    description: 'Título de la tarea de seguridad',
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  title!: string;

  @ApiProperty({
    example: 'Verificar portones principales y cerraduras secundarias.',
    description: 'Descripción detallada de la tarea',
    required: false,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  description?: string;
}
