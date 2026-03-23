import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class DailyCheckinDto {
  @ApiProperty({ example: 'ansioso' })
  @IsString()
  @IsNotEmpty()
  emocion: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  consumo: boolean;

  @ApiProperty({ example: 'Hoy agradezco mi familia' })
  @IsString()
  @IsNotEmpty()
  gratitud: string;

  @ApiPropertyOptional({ example: 'casa de un amigo' })
  @ValidateIf((o) => o.consumo === true)
  @IsString()
  @IsNotEmpty()
  ubicacion?: string;

  @ApiPropertyOptional({ example: 'amigos' })
  @ValidateIf((o) => o.consumo === true)
  @IsString()
  @IsNotEmpty()
  social?: string;

  @ApiPropertyOptional({ example: 'Fue un momento de debilidad...' })
  @ValidateIf((o) => o.consumo === true)
  @IsString()
  @IsNotEmpty()
  reflexion?: string;
}