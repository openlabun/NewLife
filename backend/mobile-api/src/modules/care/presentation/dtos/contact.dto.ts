import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumberString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString() @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: '3001234567' })
  @IsNumberString() @IsNotEmpty()
  telefono: string;

  @ApiProperty({ example: 'https://foto.com/perfil.jpg', required: false })
  @IsString() @IsOptional()
  foto_url?: string;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}