import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Infrastructure
import { RobleHttpService } from './infrastructure/services/roble-http.service';
import { RobleAdminAuthAdapter } from './infrastructure/adapters/roble-admin-auth.adapter';
import { RobleUserRepository } from './infrastructure/adapters/roble-user.repository';

// Application
import { LoginAdminUseCase } from './application/use-cases/login-admin.use-case';
import { AdminAuthService } from './application/services/admin-auth.service';

// Presentation
import { AdminAuthController } from './presentation/controllers/admin-auth.controller';
import { AdminJwtGuard } from './presentation/guards/admin-jwt.guard';
import { RolesGuard } from './presentation/guards/roles.guard';

// Port tokens
import { ADMIN_AUTH_PORT } from './domain/ports/admin-auth.port';
import { ADMIN_USER_REPOSITORY } from './domain/ports/admin-user.repository.port';
import { TokenBlacklistService } from './infrastructure/services/token-blacklist.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ADMIN_JWT_SECRET'),
        signOptions: {
          expiresIn: (config.get<string>('ADMIN_JWT_EXPIRES_IN') ?? '8h') as any,
        },
      }),
    }),
  ],
  controllers: [
    AdminAuthController,
  ],
  providers: [
    // Infrastructure
    RobleHttpService,
    RobleUserRepository,
    {
      provide: ADMIN_AUTH_PORT,
      useClass: RobleAdminAuthAdapter,
    },
    {
      provide: ADMIN_USER_REPOSITORY,
      useClass: RobleUserRepository,
    },

    // Application
    LoginAdminUseCase,
    AdminAuthService,

    // Guards
    AdminJwtGuard,
    RolesGuard,

    TokenBlacklistService,

  ],
  exports: [
    AdminJwtGuard,
    RolesGuard,
    JwtModule,
    RobleHttpService,
    TokenBlacklistService,
  ],
})
export class AdminModule { }