import { Module, forwardRef } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { SupportGroupController } from './presentation/controllers/grupo-apoyo.controller';
import { GRUPO_APOYO_REPOSITORY } from './domain/ports/grupo-apoyo.repository.port';
import { RobleGrupoApoyoRepository } from './infrastructure/adapters/roble-grupo-apoyo.repository';
import { CreateGrupoUseCase } from './application/use-cases/create-grupo.use-case';
import { UpdateGrupoUseCase } from './application/use-cases/update-grupo.use-case';
import { DeleteGrupoUseCase } from './application/use-cases/delete-grupo.use-case';
import { GetAllGruposUseCase } from './application/use-cases/get-all-grupos.use-case';
import { GetGrupoByIdUseCase } from './application/use-cases/get-grupo-by-id.use-case';

@Module({
  imports: [
    forwardRef(() => AdminModule),
  ],
  controllers: [
    SupportGroupController
  ],
  providers: [
    {
      provide: GRUPO_APOYO_REPOSITORY,
      useClass: RobleGrupoApoyoRepository,
    },
    CreateGrupoUseCase,
    UpdateGrupoUseCase,
    DeleteGrupoUseCase,
    GetAllGruposUseCase,
    GetGrupoByIdUseCase,
  ],
  exports: [GRUPO_APOYO_REPOSITORY],
})
export class CareModule {}