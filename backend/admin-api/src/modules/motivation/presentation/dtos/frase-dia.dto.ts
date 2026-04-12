import { IsString, IsOptional, IsDateString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFraseDiaDto {
  @ApiProperty({
    example: 'Hoy es un nuevo día para comenzar de nuevo.',
    description: 'Texto de la frase motivacional',
  })
  @IsString()
  @MinLength(10, { message: 'La frase debe tener al menos 10 caracteres' })
  frase: string;

  @ApiProperty({
    example: '2026-04-12',
    description: 'Fecha para la cual aplica la frase (YYYY-MM-DD)',
  })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  dia: string;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'UUID de la frase (generado automáticamente si no se proporciona)',
  })
  @IsOptional()
  @IsString()
  frase_id?: string;
}

export class UpdateFraseDiaDto {
  @ApiPropertyOptional({
    example: 'Hoy es un nuevo día para comenzar de nuevo.',
    description: 'Texto de la frase motivacional',
  })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'La frase debe tener al menos 10 caracteres' })
  frase?: string;

  @ApiPropertyOptional({
    example: '2026-04-12',
    description: 'Fecha para la cual aplica la frase (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  dia?: string;
}
