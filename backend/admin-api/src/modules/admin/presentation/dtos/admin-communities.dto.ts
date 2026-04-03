import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsEnum,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoAcceso } from '../../domain/entities/community.entity';

export class CreateCommunityDto {
  @ApiProperty({ example: 'AA Barranquilla Norte' })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @ApiPropertyOptional({ example: 'Grupo de apoyo de Alcohólicos Anónimos zona norte' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateCommunityDto {
  @ApiPropertyOptional({ example: 'AA Barranquilla Sur' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre?: string;

  @ApiPropertyOptional({ example: 'Nueva descripción de la comunidad' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}

export class AddMemberDto {
  @ApiProperty({ example: 'usuario@uninorte.edu.co' })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  email: string;

  @ApiProperty({
    enum: TipoAcceso,
    example: TipoAcceso.POSTEAR_COMENTAR,
    description: 'Tipo de acceso del usuario en la comunidad',
  })
  @IsEnum(TipoAcceso, { message: 'Tipo de acceso inválido' })
  tipoAcceso: TipoAcceso;

  @ApiPropertyOptional({
    example: false,
    description: '¿El usuario será moderador?',
  })
  @IsOptional()
  @IsBoolean()
  esModerador?: boolean;
}

export class ChangeMemberAccessDto {
  @ApiProperty({
    enum: TipoAcceso,
    example: TipoAcceso.CHAT_COMPLETO,
    description: 'Nuevo tipo de acceso',
  })
  @IsEnum(TipoAcceso, { message: 'Tipo de acceso inválido' })
  tipoAcceso: TipoAcceso;
}

export class ChangeMemberModeratorDto {
  @ApiProperty({
    example: true,
    description: '¿El usuario será moderador?',
  })
  @IsBoolean({ message: 'esModerador debe ser true o false' })
  esModerador: boolean;
}