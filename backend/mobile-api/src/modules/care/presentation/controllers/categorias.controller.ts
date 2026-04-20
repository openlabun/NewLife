import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { GetCategoriasUseCase } from '../../application/use-cases/get-categorias.use-case';

@ApiTags('Cuidado — Categorías')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('care/categorias')
export class CategoriasController {
  constructor(private readonly getCategoriasUseCase: GetCategoriasUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de categorías de contenido' })
  findAll() {
    return this.getCategoriasUseCase.execute();
  }
}