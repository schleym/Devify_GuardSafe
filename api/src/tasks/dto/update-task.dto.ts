import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Ronda perimetral Zona A',
    description: 'Título de la tarea',
    required: false,
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Verificar portones principales y cerraduras secundarias.',
    description: 'Descripción detallada',
    required: false,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si la tarea fue completada',
    required: false,
  })
  @IsBoolean({ message: 'El estado completado debe ser un booleano' })
  @IsOptional()
  completed?: boolean;
}
