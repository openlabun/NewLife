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
import { GetUserPostsByIdUseCase } from '../communities/application/use-cases/get-user-posts-by-id.use-case';
import { GetProfileByIdUseCase } from './application/use-cases/get-profile-by-id.use-case';
import { GetSobrietyTimeByIdUseCase } from './application/use-cases/get-sobriety-time-by-id.use-case';
import { GetCaminoByIdUseCase } from './application/use-cases/get-camino-by-id.use-case';
import { ProgressProvider } from '../progress/infrastructure/providers/progress.provider';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HomeModule,
  ],
  controllers: [UserController],
  providers: [
    CompleteProfileUseCase,
    GetProfileUseCase,
    UpdateProfileUseCase,
    DeleteAccountUseCase,
    GetUserPostsUseCase,
    GetUserPostsByIdUseCase,
    GetProfileByIdUseCase,
    GetSobrietyTimeByIdUseCase,
    GetCaminoByIdUseCase,
    {
      provide: 'IProgressProviderPort',
      useClass: ProgressProvider,
    },
  ],
})
export class UsersModule {}