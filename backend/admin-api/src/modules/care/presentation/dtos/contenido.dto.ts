import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsEnum, IsNotEmpty, IsNumber, IsArray, IsUUID } from 'class-validator';

export class CreateContenidoDto {
  @ApiProperty() @IsString() @IsNotEmpty() titulo!: string;
  @ApiProperty({ enum: ['ARTICULO', 'VIDEO'] }) @IsEnum(['ARTICULO', 'VIDEO']) tipo!: 'ARTICULO' | 'VIDEO';
  @ApiProperty() @IsNumber() duracion_minutos!: number;
  @ApiProperty() @IsUrl() @IsNotEmpty() imagen_portada!: string;
  @ApiProperty() @IsString() @IsNotEmpty() texto_contenido!: string;
  @ApiProperty({ required: false }) @IsUrl() @IsOptional() video_url?: string;
  
  @ApiProperty({ required: false }) @IsUUID() @IsOptional() categoria_id?: string;
  
  @ApiProperty() @IsString() @IsNotEmpty() autor_nombre!: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() autor_profesion?: string;
  @ApiProperty({ required: false }) @IsUrl() @IsOptional() autor_foto?: string;
  @ApiProperty({ type: [String], required: false }) @IsArray() @IsString({ each: true }) @IsOptional() hashtags?: string[];
  @ApiProperty({ enum: ['PUBLISHED', 'DRAFT'] }) @IsEnum(['PUBLISHED', 'DRAFT']) estado!: 'PUBLISHED' | 'DRAFT';
}

export class UpdateContenidoDto extends PartialType(CreateContenidoDto) {}