import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { CompleteProfileUseCase } from './application/use-cases/complete-profile.use-case';
import { GetProfileUseCase } from './application/use-cases/get-profile.use-case';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { HomeModule } from '../home/home.module';

@Module({
  imports: [DatabaseModule, AuthModule, HomeModule],
  controllers: [UserController],
  providers: [CompleteProfileUseCase, GetProfileUseCase],
})
export class UsersModule {}