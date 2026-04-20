import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsEnum, IsNotEmpty, IsArray } from 'class-validator';

export class CreateGrupoApoyoDto {
  @ApiProperty() @IsString() @IsNotEmpty() nombre!: string;
  @ApiProperty() @IsString() @IsNotEmpty() descripcion!: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() direccion?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() lugar?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() email?: string;
  @ApiProperty({ required: false }) @IsUrl() @IsOptional() sitio_web?: string;
  
  @ApiProperty({ required: false }) @IsUrl() @IsOptional() instagram?: string;
  @ApiProperty({ required: false }) @IsUrl() @IsOptional() facebook?: string;

  @ApiProperty({ type: [String], required: false }) @IsArray() @IsString({ each: true }) @IsOptional() telefonos?: string[];
  @ApiProperty({ type: [String], required: false }) @IsArray() @IsString({ each: true }) @IsOptional() whatsapp?: string[];
  
  @ApiProperty({ required: false }) @IsUrl() @IsOptional() comunidad_url?: string;
  @ApiProperty({ required: false }) @IsUrl() @IsOptional() logo_url?: string;
  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] }) @IsEnum(['ACTIVE', 'INACTIVE']) estado!: 'ACTIVE' | 'INACTIVE';
}

export class UpdateGrupoApoyoDto extends PartialType(CreateGrupoApoyoDto) {}