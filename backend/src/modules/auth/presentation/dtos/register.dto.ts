import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ 
    example: 'Vanessa Díaz', 
    description: 'Nombre completo del usuario' 
  })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'usuario@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'NewLife_2026!' })
  @IsString()
  @MinLength(8)
  password: string;
}