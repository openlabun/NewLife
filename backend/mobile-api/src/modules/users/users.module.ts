import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { CompleteProfileUseCase } from './application/use-cases/complete-profile.use-case';
import { GetProfileUseCase } from './application/use-cases/get-profile.use-case';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { DeleteAccountUseCase } from './application/use-cases/delete-account.use-case';
import { UpdateProfileUseCase } from './application/use-cases/update-profile.use-case';

@Module({
  imports: [DatabaseModule, AuthModule],  // ✅ SIN HomeModule
  controllers: [UserController],
  providers: [CompleteProfileUseCase, GetProfileUseCase, UpdateProfileUseCase, DeleteAccountUseCase],
  exports: [GetProfileUseCase],  // ✅ EXPORTAR GetProfileUseCase
})
export class UsersModule { }