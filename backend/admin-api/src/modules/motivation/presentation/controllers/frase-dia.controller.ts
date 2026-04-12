import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
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
import { AdminJwtGuard } from '../../../admin/presentation/guards/admin-jwt.guard';
import { RolesGuard, Roles } from '../../../admin/presentation/guards/roles.guard';
import { UserRole } from '../../../admin/domain/entities/admin-user.entity';
import { GetAllFrasesUseCase } from '../../application/use-cases/get-all-frases.use-case';
import { GetFraseDiaByIdUseCase } from '../../application/use-cases/get-frase-dia-by-id.use-case';
import { CreateFraseDiaUseCase } from '../../application/use-cases/create-frase-dia.use-case';
import { UpdateFraseDiaUseCase } from '../../application/use-cases/update-frase-dia.use-case';
import { CreateFraseDiaDto, UpdateFraseDiaDto } from '../dtos/frase-dia.dto';

@ApiTags('Admin — Frases del Día')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
@Controller('api/web/admin/frases-dia')
export class FraseDiaController {
  constructor(
    private readonly getAllFrasesUseCase: GetAllFrasesUseCase,
    private readonly getFraseDiaByIdUseCase: GetFraseDiaByIdUseCase,
    private readonly createFraseDiaUseCase: CreateFraseDiaUseCase,
    private readonly updateFraseDiaUseCase: UpdateFraseDiaUseCase,
  ) {}

  // ── Listar todas las frases ───────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Listar todas las frases del día' })
  @ApiOkResponse({ description: 'Listado de todas las frases del día registradas.' })
  async getAll() {
    return this.getAllFrasesUseCase.execute();
  }

  // ── Obtener una frase por ID ──────────────────────────────────────────────

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una frase del día por su ID' })
  @ApiOkResponse({ description: 'Frase del día encontrada.' })
  @ApiNotFoundResponse({ description: 'Frase del día no encontrada.' })
  async getOne(@Param('id') id: string) {
    return this.getFraseDiaByIdUseCase.execute(id);
  }

  // ── Crear una nueva frase ─────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva frase del día' })
  @ApiCreatedResponse({ description: 'Frase del día creada exitosamente.' })
  @ApiConflictResponse({ description: 'Ya existe una frase para esa fecha.' })
  async create(@Body() dto: CreateFraseDiaDto) {
    return this.createFraseDiaUseCase.execute({
      frase: dto.frase,
      dia: dto.dia,
    });
  }

  // ── Actualizar una frase ──────────────────────────────────────────────────

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Editar una frase del día existente' })
  @ApiOkResponse({ description: 'Frase del día actualizada.' })
  @ApiNotFoundResponse({ description: 'Frase del día no encontrada.' })
  @ApiConflictResponse({ description: 'Ya existe una frase para esa fecha.' })
  @ApiBadRequestResponse({ description: 'No se envió ningún campo para actualizar.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFraseDiaDto,
  ) {
    return this.updateFraseDiaUseCase.execute(id, {
      frase: dto.frase,
      dia: dto.dia,
    });
  }
}