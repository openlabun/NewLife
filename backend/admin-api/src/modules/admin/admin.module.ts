// backend/admin-api/src/modules/admin/admin.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Infrastructure
import { RobleHttpService } from './infrastructure/services/roble-http.service';
import { RobleAdminAuthAdapter } from './infrastructure/adapters/roble-admin-auth.adapter';
import { RobleUserRepository } from './infrastructure/adapters/roble-user.repository';
import { RobleCommunityRepository } from './infrastructure/adapters/roble-community.repository';
import { TokenBlacklistService } from './infrastructure/services/token-blacklist.service';

// Application — Auth
import { LoginAdminUseCase } from './application/use-cases/login-admin.use-case';
import { AdminAuthService } from './application/services/admin-auth.service';

// Application — Users
import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { ChangeUserRoleUseCase } from './application/use-cases/change-user-role.use-case';
import { ChangeUserStatusUseCase } from './application/use-cases/change-user-status.use-case';
import { CreateAdminUseCase } from './application/use-cases/create-admin.use-case';
import { DeleteAdminUseCase } from './application/use-cases/delete-admin.use-case';

// Application — Communities
import { GetCommunitiesUseCase } from './application/use-cases/get-communities.use-case';
import { CreateCommunityUseCase } from './application/use-cases/create-community.use-case';
import { UpdateCommunityUseCase } from './application/use-cases/update-community.use-case';
import { DeleteCommunityUseCase } from './application/use-cases/delete-community.use-case';
import { AddMemberUseCase } from './application/use-cases/add-member.use-case';
import { RemoveMemberUseCase } from './application/use-cases/remove-member.use-case';
import { ChangeMemberAccessUseCase } from './application/use-cases/change-member-access.use-case';
import { ChangeMemberModeratorUseCase } from './application/use-cases/change-member-moderator.use-case';

// Presentation
import { AdminAuthController } from './presentation/controllers/admin-auth.controller';
import { AdminUsersController } from './presentation/controllers/admin-users.controller';
import { AdminCommunitiesController } from './presentation/controllers/admin-communities.controller';
import { AdminJwtGuard } from './presentation/guards/admin-jwt.guard';
import { RolesGuard } from './presentation/guards/roles.guard';

// Port tokens
import { ADMIN_AUTH_PORT } from './domain/ports/admin-auth.port';
import { ADMIN_USER_REPOSITORY } from './domain/ports/admin-user.repository.port';
import { COMMUNITY_REPOSITORY } from './domain/ports/community.repository.port';


// Ban Requests
import { RobleBanRequestRepository } from './infrastructure/adapters/roble-ban-request.repository';
import { GetBanRequestsUseCase } from './application/use-cases/get-ban-requests.use-case';
import { ResolveBanRequestUseCase } from './application/use-cases/resolve-ban-request.use-case';
import { AdminBanRequestsController } from './presentation/controllers/admin-ban-requests.controller';
import { BAN_REQUEST_REPOSITORY } from './domain/ports/ban-request.repository.port';



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
    AdminUsersController,
    AdminCommunitiesController,
    AdminBanRequestsController,
  ],
  providers: [
    // Infrastructure
    RobleHttpService,
    TokenBlacklistService,
    RobleUserRepository,
    RobleCommunityRepository,
    {
      provide: ADMIN_AUTH_PORT,
      useClass: RobleAdminAuthAdapter,
    },
    {
      provide: ADMIN_USER_REPOSITORY,
      useClass: RobleUserRepository,
    },
    {
      provide: COMMUNITY_REPOSITORY,
      useClass: RobleCommunityRepository,
    },

    // Application — Auth
    LoginAdminUseCase,
    AdminAuthService,

    // Application — Users
    GetUsersUseCase,
    ChangeUserRoleUseCase,
    ChangeUserStatusUseCase,
    CreateAdminUseCase,
    DeleteAdminUseCase,

    // Application — Communities
    GetCommunitiesUseCase,
    CreateCommunityUseCase,
    UpdateCommunityUseCase,
    DeleteCommunityUseCase,
    AddMemberUseCase,
    RemoveMemberUseCase,
    ChangeMemberAccessUseCase,
    ChangeMemberModeratorUseCase,

    // Guards
    AdminJwtGuard,
    RolesGuard,

    // Ban Requests
    RobleBanRequestRepository,
    { provide: BAN_REQUEST_REPOSITORY, useClass: RobleBanRequestRepository },
    GetBanRequestsUseCase,
    ResolveBanRequestUseCase,
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