import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsEnum, IsNotEmpty, IsNumber, IsArray, IsUUID } from 'class-validator';

export class CreateContenidoDto {
  @ApiProperty() 
  @IsString() 
  @IsNotEmpty() 
  titulo!: string;

  @ApiProperty({ enum: ['ARTICULO', 'VIDEO'] }) 
  @IsEnum(['ARTICULO', 'VIDEO']) 
  tipo!: 'ARTICULO' | 'VIDEO';

  @ApiProperty() 
  @IsNumber() 
  duracion_minutos!: number;

  // CAMBIO: Ahora es opcional para que acepte null/vacío
  @ApiPropertyOptional() 
  @IsUrl() 
  @IsOptional() 
  imagen_portada?: string;

  @ApiProperty() 
  @IsString() 
  @IsNotEmpty() 
  texto_contenido!: string;

  @ApiPropertyOptional() 
  @IsUrl() 
  @IsOptional() 
  video_url?: string;
  
  @ApiPropertyOptional() 
  @IsUUID() 
  @IsOptional() 
  categoria_id?: string;
  
  // CAMBIO: Ahora es opcional para que acepte null/vacío
  @ApiPropertyOptional() 
  @IsString() 
  @IsOptional() 
  autor_nombre?: string;

  @ApiPropertyOptional() 
  @IsString() 
  @IsOptional() 
  autor_profesion?: string;

  @ApiPropertyOptional() 
  @IsUrl() 
  @IsOptional() 
  autor_foto?: string;

  @ApiPropertyOptional({ type: [String] }) 
  @IsArray() 
  @IsString({ each: true }) 
  @IsOptional() 
  hashtags?: string[];

  @ApiProperty({ enum: ['PUBLISHED', 'DRAFT'] }) 
  @IsEnum(['PUBLISHED', 'DRAFT']) 
  estado!: 'PUBLISHED' | 'DRAFT';
}

export class UpdateContenidoDto extends PartialType(CreateContenidoDto) {}