import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Juancho', description: 'Apodo del usuario' })
  @IsOptional()
  @IsString()
  apodo?: string;

  @ApiPropertyOptional({ example: 'él/his', description: 'Pronombre preferido' })
  @IsOptional()
  @IsString()
  pronombre?: string;

  @ApiPropertyOptional({ example: 'Mi familia', description: 'Motivo para mantenerse sobrio' })
  @IsOptional()
  @IsString()
  motivo_sobrio?: string;

  @ApiPropertyOptional({ example: 50000, description: 'Gasto semanal estimado en alcohol' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  gasto_semanal?: number;

  @ApiPropertyOptional({ example: 'Me gusta el deporte y estoy en proceso de cambio', description: 'Descripción del perfil' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}