import { Module } from '@nestjs/common';
import { HomeController } from './presentation/controllers/home.controller';
import { GetSobrietyTimeUseCase } from './application/use-cases/get-sobriety-time.use-case';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [HomeController],
  providers: [GetSobrietyTimeUseCase],
  exports: [GetSobrietyTimeUseCase],
})
export class HomeModule {}