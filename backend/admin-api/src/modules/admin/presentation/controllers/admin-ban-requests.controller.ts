import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AdminJwtGuard } from '../guards/admin-jwt.guard';
import { RolesGuard, Roles } from '../guards/roles.guard';
import { UserRole } from '../../domain/entities/admin-user.entity';
import { GetBanRequestsUseCase } from '../../application/use-cases/get-ban-requests.use-case';
import { ResolveBanRequestUseCase } from '../../application/use-cases/resolve-ban-request.use-case';
import { ResolveBanRequestDto, GetBanRequestsQueryDto } from '../dtos/ban-request.dto';

@ApiTags('Admin — Solicitudes de baneo')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
@Controller('api/web/admin/ban-requests')
export class AdminBanRequestsController {
  constructor(
    private readonly getUseCase: GetBanRequestsUseCase,
    private readonly resolveUseCase: ResolveBanRequestUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar solicitudes de baneo (por defecto solo pendientes)' })
  @ApiOkResponse({ description: 'Lista de solicitudes.' })
  async getAll(@Query() query: GetBanRequestsQueryDto) {
    const soloPendientes = query.soloPendientes !== false;
    return this.getUseCase.execute(soloPendientes);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Aprobar o rechazar una solicitud de baneo' })
  @ApiOkResponse({ description: 'Solicitud resuelta.' })
  @ApiNotFoundResponse({ description: 'Solicitud no encontrada.' })
  @ApiBadRequestResponse({ description: 'La solicitud ya fue resuelta.' })
  async resolve(
    @Param('id') id: string,
    @Body() dto: ResolveBanRequestDto,
  ) {
    return this.resolveUseCase.execute(id, dto.estado);
  }
}