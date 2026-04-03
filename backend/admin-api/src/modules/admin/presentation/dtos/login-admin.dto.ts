import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({
    example: 'superadmin@gmail.com',
    description: 'Correo electrónico del administrador',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @ApiProperty({
    example: 'NewLife_2026!',
    description: 'Contraseña del administrador',
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Tu accessToken expirado',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'El token es requerido' })
  refreshToken: string;
}