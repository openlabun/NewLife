import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../../domain/entities/admin-user.entity';

export class GetUsersQueryDto {
  @ApiPropertyOptional({
    enum: UserRole,
    example: UserRole.MODERADOR,
    description: 'Filtrar por rol',
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Rol inválido' })
  rol?: UserRole;

  @ApiPropertyOptional({
    enum: UserStatus,
    example: UserStatus.ACTIVO,
    description: 'Filtrar por estado',
  })
  @IsOptional()
  @IsEnum(UserStatus, { message: 'Estado inválido' })
  estado?: UserStatus;
}

export class ChangeRoleDto {
  @ApiProperty({
    enum: [UserRole.USUARIO, UserRole.MODERADOR],
    example: UserRole.MODERADOR,
    description: 'Solo se permite USUARIO o MODERADOR.',
  })
  @IsEnum([UserRole.USUARIO, UserRole.MODERADOR], {
    message: 'El rol debe ser USUARIO o MODERADOR.',
  })
  rol: UserRole;
}

export class ChangeStatusDto {
  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.SUSPENDIDO,
    description: 'Nuevo estado. SUSPENDIDO requiere dias o hasta. ACTIVO y BANEADO no necesitan nada más.',
  })
  @IsEnum(UserStatus, { message: 'Estado inválido' })
  estado: UserStatus;

  @ApiPropertyOptional({
    description: 'Solo para SUSPENDIDO: días de suspensión desde hoy.',
    example: 7,
  })
  @IsOptional()
  @IsInt({ message: 'Los días deben ser un número entero' })
  @Min(1, { message: 'Los días deben ser mayor a 0' })
  dias?: number;

  @ApiPropertyOptional({
    description: 'Solo para SUSPENDIDO: fecha exacta de fin (ISO 8601).',
    example: '2026-04-15T00:00:00.000Z',
  })
  @IsOptional()
  @IsString()
  hasta?: string;
}

export class CreateAdminDto {
  @ApiProperty({
    example: 'nuevo.admin@uninorte.edu.co',
    description: 'Correo del nuevo administrador',
  })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  email: string;

  @ApiProperty({
    example: 'Contrasena123',
    description: 'Contraseña del nuevo administrador',
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del administrador',
  })
  @IsString({ message: 'El nombre es requerido' })
  nombre: string;
}