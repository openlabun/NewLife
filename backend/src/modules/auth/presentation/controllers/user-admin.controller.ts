import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator'; 
import { AuthService } from '../../application/services/auth.service';
import { RegisterDto } from '../dtos/register.dto';

@ApiTags('Administración de Usuarios')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserAdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-psicologo')
  @Roles('moderador', 'admin', 'superadmin')
  async createPsicologo(@Body() dto: RegisterDto) {
    return await this.authService.registerStaff(dto, 'psicologo');
  }

  @Post('create-moderador')
  @Roles('admin', 'superadmin')
  async createModerador(@Body() dto: RegisterDto) {
    return await this.authService.registerStaff(dto, 'moderador');
  }

  @Post('create-admin')
  @Roles('superadmin')
  async createAdmin(@Body() dto: RegisterDto) {
    return await this.authService.registerStaff(dto, 'admin');
  }

  @Post('create-superadmin')
  @Roles('superadmin')
  async createSuperAdmin(@Body() dto: RegisterDto) {
    return await this.authService.registerStaff(dto, 'superadmin');
  }
}