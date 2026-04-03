import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ 
    description: 'El token de refresco obtenido en el login',
    example: 'eyJhbGciOiJIUzI1Ni...' 
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ 
    example: 'usuario@uninorte.edu.co',
    description: 'Correo institucional del usuario' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ description: 'Token recibido por correo' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'NuevaClave123!', description: 'La nueva contraseña' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}