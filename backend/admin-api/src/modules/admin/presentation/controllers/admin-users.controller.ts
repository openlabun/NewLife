import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AdminJwtGuard } from '../guards/admin-jwt.guard';
import { RolesGuard, Roles } from '../guards/roles.guard';
import { UserRole, UserStatus } from '../../domain/entities/admin-user.entity';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { ChangeUserRoleUseCase } from '../../application/use-cases/change-user-role.use-case';
import { ChangeUserStatusUseCase } from '../../application/use-cases/change-user-status.use-case';
import { CreateAdminUseCase } from '../../application/use-cases/create-admin.use-case';
import {
  GetUsersQueryDto,
  ChangeRoleDto,
  ChangeStatusDto,
  CreateAdminDto,
} from '../dtos/admin-users.dto';
import { DeleteAdminUseCase } from '../../application/use-cases/delete-admin.use-case';

@ApiTags('Admin — Usuarios')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard, RolesGuard)
@Controller('api/web/admin/users')
export class AdminUsersController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly changeRoleUseCase: ChangeUserRoleUseCase,
    private readonly changeStatusUseCase: ChangeUserStatusUseCase,
    private readonly createAdminUseCase: CreateAdminUseCase,
    private readonly DeleteAdminUseCase: DeleteAdminUseCase,
  ) { }

  // ── GET /api/web/admin/users ─────────────────────────────────────────────
  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Listar todos los usuarios con filtros opcionales' })
  @ApiOkResponse({ description: 'Listado de usuarios.' })
  async getUsers(@Query() query: GetUsersQueryDto) {
    return this.getUsersUseCase.execute({
      rol: query.rol,
      estado: query.estado,
    });
  }

  // ── GET /api/web/admin/users/:id ─────────────────────────────────────────
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Ver detalle de un usuario por ID' })
  @ApiOkResponse({ description: 'Detalle del usuario.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  async getUserById(@Param('id') id: string) {
    return this.getUsersUseCase.executeOne(id);
  }

  // ── PATCH /api/web/admin/users/:id/rol ──────────────────────────────────
  @Patch(':id/rol')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cambiar rol de un usuario (USUARIO ↔ MODERADOR)' })
  @ApiOkResponse({ description: 'Rol actualizado.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiBadRequestResponse({ description: 'Rol inválido o el usuario ya tiene ese rol.' })
  async changeRole(
    @Param('id') id: string,
    @Body() dto: ChangeRoleDto,
  ) {
    return this.changeRoleUseCase.execute(id, dto.rol);
  }

  // ── PATCH /api/web/admin/users/:id/estado ───────────────────────────────
  @Patch(':id/estado')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cambiar estado de un usuario (ACTIVO, SUSPENDIDO, BANEADO)' })
  @ApiOkResponse({ description: 'Estado actualizado.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiBadRequestResponse({ description: 'Estado inválido o datos de suspensión faltantes.' })
  async changeStatus(
    @Param('id') id: string,
    @Body() dto: ChangeStatusDto,
  ) {
    return this.changeStatusUseCase.execute({
      userId: id,
      estado: dto.estado,
      suspension: (dto.dias || dto.hasta)
        ? { dias: dto.dias, hasta: dto.hasta }
        : undefined,
    });
  }

  // ── POST /api/web/admin/users/admin ─────────────────────────────────────
  @Post('admin')
  @Roles(UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear credenciales de administrador (solo SUPERADMIN)' })
  @ApiCreatedResponse({ description: 'Admin creado exitosamente.' })
  @ApiConflictResponse({ description: 'El correo ya está en uso.' })
  @ApiForbiddenResponse({ description: 'Solo el SUPERADMIN puede crear admins.' })
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.createAdminUseCase.execute({
      email: dto.email,
      password: dto.password,
      nombre: dto.nombre,
    });
  }
  
  // ── DELETE /api/web/admin/users/:id ─────────────────────────────────────
  @Delete(':id')
  @Roles(UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un administrador (solo SUPERADMIN)' })
  async deleteAdmin(@Param('id') id: string) {
    await this.DeleteAdminUseCase.execute(id)
    return { message: 'Administrador eliminado exitosamente.' }
  }
}