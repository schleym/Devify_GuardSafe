import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'guardia@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email!: string;

  @ApiProperty({
    example: 'secreto123',
    description: 'Contraseña de acceso',
    minLength: 6,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password!: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre del usuario',
    required: false,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name!: string;

  @ApiProperty({
    example: 'Guardia de Seguridad',
    description: 'Rol asignado al usuario',
    enum: ['Guardia de Seguridad', 'Administrador'],
    default: 'Guardia de Seguridad',
    required: false,
  })
  @IsString()
  role?: string;
}
