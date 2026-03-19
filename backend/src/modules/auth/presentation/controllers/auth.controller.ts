import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { ForgotPasswordDto, ResetPasswordDto, RefreshTokenDto } from '../dtos/account-recovery.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InitialRegisterDto } from '../../../users/presentation/dtos/initial-register.dto';
import { CompleteProfileUseCase } from '../../../users/application/use-cases/complete-profile.use-case';
import { MigrateGuestUseCase } from '../../../users/application/use-cases/migrate-guest.use-case';

@ApiTags('Perfil de Usuario')
@Controller('user')
export class UserController {
  constructor(private readonly completeProfileUseCase: CompleteProfileUseCase) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('complete-profile')
  @ApiOperation({ summary: 'Primer registro de datos del paciente' })
  async completeProfile(@Request() req: any, @Body() dto: InitialRegisterDto) {
    return await this.completeProfileUseCase.execute(req.user.uid, dto);
  }
}

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly migrateGuestUseCase: MigrateGuestUseCase,
  ) {}

  @ApiOperation({ summary: 'Login App' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Login exclusivo para Panel Administrativo' })
  @Post('web/login')
  async webLogin(@Body() loginDto: LoginDto) {
    const webRoles = ['moderador', 'admin', 'superadmin'];
    return await this.authService.login(loginDto, webRoles);
  }

  @ApiOperation({ summary: 'Registro para pacientes' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Refrescar el accessToken usando el refreshToken' })
  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(dto.refreshToken);
  }

  @ApiOperation({ summary: 'Solicitar recuperación de contraseña' })
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto.email);
    return { message: 'Si el correo existe, se enviará un código.' };
  }

  @ApiOperation({ summary: 'Restablecer contraseña con el token recibido' })
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.newPassword);
    return { message: 'Contraseña actualizada.' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return { message: 'No hay sesión activa' };
    const token = authHeader.split(' ')[1];
    await this.authService.logout(token);
    return { message: 'Sesión cerrada exitosamente.' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  async verifyToken() {
    return { valid: true, message: 'El token es válido' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('migrate-guest')
  @ApiOperation({ summary: 'Migrar datos de invitado al registrarse' })
  async migrateGuest(@Request() req: any, @Body() body: any) {
    return await this.migrateGuestUseCase.execute(req.user.uid, body);
  }
}