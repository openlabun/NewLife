import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional  } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'usuario@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'NewLife_2026!' })
  @IsString()
  @MinLength(8)
  password: string;
  
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nombre?: string;
}