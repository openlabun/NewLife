import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AdminJwtGuard } from '../guards/admin-jwt.guard';
import { RolesGuard, Roles } from '../guards/roles.guard';
import { UserRole } from '../../domain/entities/admin-user.entity';
import { AdminTokenPayload } from '../../application/services/admin-auth.service';
import { GetCommunitiesUseCase } from '../../application/use-cases/get-communities.use-case';
import { CreateCommunityUseCase } from '../../application/use-cases/create-community.use-case';
import { UpdateCommunityUseCase } from '../../application/use-cases/update-community.use-case';
import { DeleteCommunityUseCase } from '../../application/use-cases/delete-community.use-case';
import { AddMemberUseCase } from '../../application/use-cases/add-member.use-case';
import { RemoveMemberUseCase } from '../../application/use-cases/remove-member.use-case';
import { ChangeMemberAccessUseCase } from '../../application/use-cases/change-member-access.use-case';
import { ChangeMemberModeratorUseCase } from '../../application/use-cases/change-member-moderator.use-case';
import {
  CreateCommunityDto,
  UpdateCommunityDto,
  AddMemberDto,
  ChangeMemberAccessDto,
  ChangeMemberModeratorDto,
} from '../dtos/admin-communities.dto';

@ApiTags('Admin — Comunidades')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
@Controller('api/web/admin/communities')
export class AdminCommunitiesController {
  constructor(
    private readonly getCommunitiesUseCase: GetCommunitiesUseCase,
    private readonly createCommunityUseCase: CreateCommunityUseCase,
    private readonly updateCommunityUseCase: UpdateCommunityUseCase,
    private readonly deleteCommunityUseCase: DeleteCommunityUseCase,
    private readonly addMemberUseCase: AddMemberUseCase,
    private readonly removeMemberUseCase: RemoveMemberUseCase,
    private readonly changeMemberAccessUseCase: ChangeMemberAccessUseCase,
    private readonly changeMemberModeratorUseCase: ChangeMemberModeratorUseCase,
  ) {}

  // ── Comunidades ───────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Listar todas las comunidades' })
  @ApiOkResponse({ description: 'Listado de comunidades con conteo de miembros.' })
  async getAll() {
    return this.getCommunitiesUseCase.executeAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de una comunidad con sus miembros' })
  @ApiOkResponse({ description: 'Detalle de la comunidad.' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada.' })
  async getOne(@Param('id') id: string) {
    return this.getCommunitiesUseCase.executeOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva comunidad' })
  @ApiCreatedResponse({ description: 'Comunidad creada exitosamente.' })
  async create(
    @Body() dto: CreateCommunityDto,
    @Req() req: Request & { admin: AdminTokenPayload },
  ) {
    return this.createCommunityUseCase.execute({
      nombre:      dto.nombre,
      descripcion: dto.descripcion,
      creadoPorId: req.admin.sub,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Editar nombre, descripción o estado de una comunidad' })
  @ApiOkResponse({ description: 'Comunidad actualizada.' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada.' })
  @ApiBadRequestResponse({ description: 'No se envió ningún campo para actualizar.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommunityDto,
  ) {
    return this.updateCommunityUseCase.execute({
      id,
      nombre:      dto.nombre,
      descripcion: dto.descripcion,
      activa:      dto.activa,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una comunidad y todos sus miembros' })
  @ApiOkResponse({ description: 'Comunidad eliminada.' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada.' })
  async delete(@Param('id') id: string) {
    await this.deleteCommunityUseCase.execute(id);
    return { message: 'Comunidad eliminada exitosamente.' };
  }

  // ── Miembros ──────────────────────────────────────────────────────────────

  @Post(':id/members')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Agregar usuario a la comunidad por correo' })
  @ApiCreatedResponse({ description: 'Usuario agregado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Comunidad o usuario no encontrado.' })
  @ApiConflictResponse({ description: 'El usuario ya es miembro.' })
  async addMember(
    @Param('id') comunidadId: string,
    @Body() dto: AddMemberDto,
  ) {
    return this.addMemberUseCase.execute({
      comunidadId,
      email:       dto.email,
      tipoAcceso:  dto.tipoAcceso,
      esModerador: dto.esModerador ?? false,
    });
  }

  @Delete(':id/members/:usuarioId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Quitar usuario de la comunidad' })
  @ApiOkResponse({ description: 'Usuario eliminado de la comunidad.' })
  @ApiNotFoundResponse({ description: 'Comunidad o miembro no encontrado.' })
  async removeMember(
    @Param('id') comunidadId: string,
    @Param('usuarioId') usuarioId: string,
  ) {
    await this.removeMemberUseCase.execute(comunidadId, usuarioId);
    return { message: 'Usuario eliminado de la comunidad exitosamente.' };
  }

  @Patch(':id/members/:usuarioId/access')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cambiar tipo de acceso de un miembro' })
  @ApiOkResponse({ description: 'Tipo de acceso actualizado.' })
  @ApiNotFoundResponse({ description: 'Miembro no encontrado.' })
  @ApiBadRequestResponse({ description: 'El miembro ya tiene ese tipo de acceso.' })
  async changeMemberAccess(
    @Param('id') comunidadId: string,
    @Param('usuarioId') usuarioId: string,
    @Body() dto: ChangeMemberAccessDto,
  ) {
    return this.changeMemberAccessUseCase.execute(
      comunidadId,
      usuarioId,
      dto.tipoAcceso,
    );
  }

  @Patch(':id/members/:usuarioId/moderator')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Asignar o quitar rol de moderador a un miembro' })
  @ApiOkResponse({ description: 'Rol de moderador actualizado.' })
  @ApiNotFoundResponse({ description: 'Miembro no encontrado.' })
  @ApiBadRequestResponse({ description: 'El miembro ya tiene ese estado de moderador.' })
  async changeMemberModerator(
    @Param('id') comunidadId: string,
    @Param('usuarioId') usuarioId: string,
    @Body() dto: ChangeMemberModeratorDto,
  ) {
    return this.changeMemberModeratorUseCase.execute(
      comunidadId,
      usuarioId,
      dto.esModerador,
    );
  }
}