import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { CompleteProfileUseCase } from './application/use-cases/complete-profile.use-case';
import { GetProfileUseCase } from './application/use-cases/get-profile.use-case';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { HomeModule } from '../home/home.module';
import { DeleteAccountUseCase } from './application/use-cases/delete-account.use-case';
import { UpdateProfileUseCase } from './application/use-cases/update-profile.use-case';
import { GetUserPostsUseCase } from '../communities/application/use-cases/get-user-posts.use-case';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HomeModule,
  ],
  controllers: [UserController],
  providers: [CompleteProfileUseCase, GetProfileUseCase, UpdateProfileUseCase, DeleteAccountUseCase, GetUserPostsUseCase,],
})
export class UsersModule { }