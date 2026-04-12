import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

// Infrastructure adapters
import { RobleFraseDiaAdapter } from './infrastructure/adapters/roble-frase-dia.adapter';
import { RobleFraseGuardadaAdapter } from './infrastructure/adapters/roble-frase-guardada.adapter';

// Application use cases
import { GetFraseDelDiaUseCase } from './application/use-cases/get-frase-del-dia.use-case';
import { GetFrasesGuardadasUseCase } from './application/use-cases/get-frases-guardadas.use-case';
import { GuardarFraseUseCase } from './application/use-cases/guardar-frase.use-case';
import { DesguardarFraseUseCase } from './application/use-cases/desguardar-frase.use-case';

// Presentation controller
import { MotivationController } from './presentation/controllers/motivation.controller';

// Ports
import {
  IFRASE_DIA_PROVIDER_PORT,
  IFRASE_GUARDADA_PROVIDER_PORT,
} from './domain/ports/frase-dia.port';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [MotivationController],
  providers: [
    // Infrastructure
    RobleFraseDiaAdapter,
    RobleFraseGuardadaAdapter,
    {
      provide: IFRASE_DIA_PROVIDER_PORT,
      useClass: RobleFraseDiaAdapter,
    },
    {
      provide: IFRASE_GUARDADA_PROVIDER_PORT,
      useClass: RobleFraseGuardadaAdapter,
    },

    // Application — Use Cases
    GetFraseDelDiaUseCase,
    GetFrasesGuardadasUseCase,
    GuardarFraseUseCase,
    DesguardarFraseUseCase,
  ],
  exports: [
    GetFraseDelDiaUseCase,
    GetFrasesGuardadasUseCase,
  ],
})
export class MotivationModule {}
