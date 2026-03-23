import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { RobleProgressAdapter } from './infrastructure/adapters/roble-progress.adapter';
import { DailyCheckinUseCase } from './application/use-cases/daily-checkin.use-case';
import { GratitudeHistoryUseCase } from './application/use-cases/gratitude-history.use-case';
import { ProgressController } from './presentation/controllers/progress.controller';
import { AdvanceCaminoUseCase } from './application/use-cases/advance-camino.use-case';
import { GetCaminoUseCase } from './application/use-cases/get-camino.use-case';
import { ProgressSummaryUseCase } from './application/use-cases/progress-summary.use-case';
import { GetTodayCheckinUseCase } from './application/use-cases/get-today-checkin.use-case';
import { GetCalendarUseCase } from './application/use-cases/get-calendar.use-case';
import { GetRiskChartsUseCase } from './application/use-cases/get-risk-charts.use-case';


@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProgressController],
  providers: [
    DailyCheckinUseCase,
    GratitudeHistoryUseCase,
    AdvanceCaminoUseCase,
    GetCaminoUseCase,
    ProgressSummaryUseCase,
    GetTodayCheckinUseCase,
    GetCalendarUseCase,
    GetRiskChartsUseCase,
    {
      provide: 'IProgressProviderPort',
      useClass: RobleProgressAdapter,
    },
  ],
})
export class ProgressModule { }