import {
  Controller, Get, Post, Delete, Param, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { GetFraseDelDiaUseCase } from '../../application/use-cases/get-frase-del-dia.use-case';
import { GetFrasesGuardadasUseCase } from '../../application/use-cases/get-frases-guardadas.use-case';
import { GuardarFraseUseCase } from '../../application/use-cases/guardar-frase.use-case';
import { DesguardarFraseUseCase } from '../../application/use-cases/desguardar-frase.use-case';

@ApiTags('Motivación')
@ApiBearerAuth()
@Controller('motivation/frases') // <-- El recurso principal
@UseGuards(JwtAuthGuard)
export class MotivationController {
  constructor(
    private readonly getFraseDelDiaUseCase: GetFraseDelDiaUseCase,
    private readonly getFrasesGuardadasUseCase: GetFrasesGuardadasUseCase,
    private readonly guardarFraseUseCase: GuardarFraseUseCase,
    private readonly desguardarFraseUseCase: DesguardarFraseUseCase,
  ) {}

  private getUserId(req: any): string {
    return req.user?.sub || req.user?.id || req.user?.uid;
  }

  // GET /motivation/frases/today
  @Get('today')
  @ApiOperation({ summary: 'Obtener la frase del día actual' })
  @ApiOkResponse({ description: 'Frase obtenida exitosamente.' })
  @ApiNotFoundResponse({ description: 'No hay frase para hoy.' })
  async getFraseDelDia(@Req() req: any) {
    return this.getFraseDelDiaUseCase.execute(this.getUserId(req));
  }

  // GET /motivation/frases/saved
  @Get('saved')
  @ApiOperation({ summary: 'Listar todas las frases guardadas' })
  @ApiOkResponse({ description: 'Listado de frases guardadas.' })
  async getFrasesGuardadas(@Req() req: any) {
    return this.getFrasesGuardadasUseCase.execute(this.getUserId(req));
  }

  // POST /motivation/frases/{id}/save
  @Post(':id/save')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Guardar una frase (Añadir a favoritos)' })
  @ApiParam({ name: 'id', description: 'ID UUID de la frase' })
  @ApiCreatedResponse({ description: 'Frase guardada exitosamente.' })
  async guardarFrase(@Req() req: any, @Param('id') id: string) {
    return this.guardarFraseUseCase.execute(this.getUserId(req), id);
  }

  // DELETE /motivation/frases/{id}/save
  @Delete(':id/save')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desguardar una frase (Quitar de favoritos)' })
  @ApiParam({ name: 'id', description: 'ID UUID de la frase' })
  @ApiOkResponse({ description: 'Frase desguardada exitosamente.' })
  async desguardarFrase(@Req() req: any, @Param('id') id: string) {
    await this.desguardarFraseUseCase.execute(this.getUserId(req), id);
    return { message: 'Frase quitada de guardados.' };
  }
}