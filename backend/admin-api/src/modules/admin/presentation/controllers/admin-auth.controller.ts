import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { LoginAdminUseCase } from '../../application/use-cases/login-admin.use-case';
import { AdminAuthService, AdminTokenPayload } from '../../application/services/admin-auth.service';
import { LoginAdminDto, RefreshTokenDto } from '../dtos/login-admin.dto';
import { AdminJwtGuard } from '../guards/admin-jwt.guard';

@ApiTags('Admin — Auth')
@Controller('api/web/auth')
export class AdminAuthController {
  constructor(
    private readonly loginUseCase: LoginAdminUseCase,
    private readonly authService: AdminAuthService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de administrador vía Roble' })
  @ApiOkResponse({
    description: 'Login exitoso. Retorna accessToken y datos del admin.',
  })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas.' })
  @ApiForbiddenResponse({ description: 'El usuario no tiene rol ADMIN o SUPERADMIN.' })
  async login(@Body() dto: LoginAdminDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar accessToken usando refreshToken' })
  @ApiOkResponse({ description: 'Nuevo accessToken generado.' })
  @ApiUnauthorizedResponse({ description: 'Refresh token inválido o expirado.' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(AdminJwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar sesión del administrador' })
  async logout(@Req() req: Request & { admin: AdminTokenPayload }) {
    const jwt = req.headers.authorization!.substring(7);
    await this.authService.logout(req.admin.roble_token, jwt);
    return { message: 'Sesión cerrada exitosamente.' };
  }

  @Get('me')
  @UseGuards(AdminJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del administrador autenticado' })
  @ApiOkResponse({ description: 'Perfil del administrador.' })
  @ApiUnauthorizedResponse({ description: 'Token inválido o expirado.' })
  async getMe(@Req() req: Request & { admin: AdminTokenPayload }) {
    return this.authService.getMe(req.admin.sub);
  }
}