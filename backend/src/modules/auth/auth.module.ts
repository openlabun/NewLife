import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserAdminController } from './presentation/controllers/user-admin.controller';
import { UserController } from './presentation/controllers/user.controller';
import { ContactsController } from './presentation/controllers/contacts.controller';
import { AuthService } from './application/services/auth.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { RegisterStaffUseCase } from './application/use-cases/register-staff.use-case';
import { CompleteProfileUseCase } from './application/use-cases/complete-profile.use-case';
import { GetSobrietyTimeUseCase } from './application/use-cases/get-sobriety-time.use-case';
import { ContactsUseCase } from './application/use-cases/contacts.use-case';
import { RobleAuthAdapter } from './infrastructure/adapters/roble-auth.adapter';
import { SystemAuthService } from './infrastructure/services/system-auth.service';
import { DatabaseModule } from '../database/database.module';
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard'; 
import { RolesGuard } from './presentation/guards/roles.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AuthController, 
    UserAdminController,
    UserController,
    ContactsController
  ],
  providers: [
    AuthService,
    LoginUseCase,
    RegisterUseCase,
    RegisterStaffUseCase,
    CompleteProfileUseCase,
    GetSobrietyTimeUseCase,
    ContactsUseCase,
    SystemAuthService,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: 'IAuthProviderPort',
      useClass: RobleAuthAdapter,
    },
  ],
  exports: [JwtAuthGuard, RolesGuard, SystemAuthService]
})
export class AuthModule {}