import { Body, Controller, Get, Query, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { DailyCheckinUseCase } from '../../application/use-cases/daily-checkin.use-case';
import { GratitudeHistoryUseCase } from '../../application/use-cases/gratitude-history.use-case';
import { DailyCheckinDto } from '../dtos/daily-checkin.dto';
import { AdvanceCaminoUseCase } from '../../application/use-cases/advance-camino.use-case';
import { GetCaminoUseCase } from '../../application/use-cases/get-camino.use-case';
import { ProgressSummaryUseCase } from '../../application/use-cases/progress-summary.use-case';
import { GetTodayCheckinUseCase } from '../../application/use-cases/get-today-checkin.use-case';
import { GetCalendarUseCase } from '../../application/use-cases/get-calendar.use-case';
import { GetRiskChartsUseCase } from '../../application/use-cases/get-risk-charts.use-case';

@ApiTags('Progress')
@ApiBearerAuth()
@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(
    private readonly dailyCheckinUseCase: DailyCheckinUseCase,
    private readonly gratitudeHistoryUseCase: GratitudeHistoryUseCase,
    private readonly advanceCaminoUseCase: AdvanceCaminoUseCase,
    private readonly getCaminoUseCase: GetCaminoUseCase,
    private readonly progressSummaryUseCase: ProgressSummaryUseCase,
    private readonly getTodayCheckinUseCase: GetTodayCheckinUseCase,
    private readonly getCalendarUseCase: GetCalendarUseCase,
    private readonly getRiskChartsUseCase: GetRiskChartsUseCase,
  ) { }

  @Post('daily-checkin')
  @ApiOperation({ summary: 'Registro diario del usuario (emoción, gratitud, consumo)' })
  async dailyCheckin(@Req() req, @Body() dto: DailyCheckinDto) {
    const userToken = req.headers.authorization.split(' ')[1];
    return this.dailyCheckinUseCase.execute(req.user.uid, dto, userToken);
  }

  @Get('gratitude-history')
  @ApiOperation({ summary: 'Historial de gratitud del usuario' })
  async gratitudeHistory(@Req() req) {
    const userToken = req.headers.authorization.split(' ')[1];
    return this.gratitudeHistoryUseCase.execute(req.user.uid, userToken);
  }

  @Post('camino/advance')
  @ApiOperation({ summary: 'Avanza al siguiente subnivel/nivel en los 12 pasos' })
  async advanceCamino(@Req() req) {
    return this.advanceCaminoUseCase.execute(req.user.uid);
  }

  @Get('camino')
  @ApiOperation({ summary: 'Retorna el nivel y subnivel actual del usuario' })
  async getCamino(@Req() req) {
    return this.getCaminoUseCase.execute(req.user.uid);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumen de progreso del usuario (ánimo, sobriedad, detonantes)' })
  async progressSummary(@Req() req) {
    const userToken = req.headers.authorization.split(' ')[1];
    return this.progressSummaryUseCase.execute(req.user.uid, userToken);
  }

  @Get('daily-checkin/today')
  @ApiOperation({ summary: 'Retorna el registro diario de hoy si existe, null si no' })
  async getTodayCheckin(@Req() req) {
    const userToken = req.headers.authorization.split(' ')[1];
    return this.getTodayCheckinUseCase.execute(req.user.uid, userToken);
  }

  @Get('calendar')
  @ApiOperation({ summary: 'Calendario de sobriedad por mes' })
  async getCalendar(
    @Req() req,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    const userToken = req.headers.authorization.split(' ')[1];
    return this.getCalendarUseCase.execute(
      req.user.uid,
      parseInt(month),
      parseInt(year),
      userToken,
    );
  }

  @Get('risk-charts')
  @ApiOperation({ summary: 'Datos para las gráficas de riesgo' })
  async getRiskCharts(@Req() req) {
    const userToken = req.headers.authorization.split(' ')[1];
    return this.getRiskChartsUseCase.execute(req.user.uid, userToken);
  }
}