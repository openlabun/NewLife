import { Module, forwardRef } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';

// Controllers
import { FraseDiaController } from './presentation/controllers/frase-dia.controller';

// Use Cases
import { CreateFraseDiaUseCase } from './application/use-cases/create-frase-dia.use-case';
import { UpdateFraseDiaUseCase } from './application/use-cases/update-frase-dia.use-case';
import { GetAllFrasesUseCase } from './application/use-cases/get-all-frases.use-case';
import { GetFraseDiaByIdUseCase } from './application/use-cases/get-frase-dia-by-id.use-case';

// Ports & Adapters
import { FRASE_DIA_REPOSITORY } from './domain/ports/frase-dia.repository.port';
import { RobleFraseDiaRepository } from './infrastructure/adapters/roble-frase-dia.repository';

@Module({
  imports: [
    // Importamos el AdminModule para poder acceder al RobleHttpService
    forwardRef(() => AdminModule),
  ],
  controllers: [FraseDiaController],
  providers: [
    {
      provide: FRASE_DIA_REPOSITORY,
      useClass: RobleFraseDiaRepository,
    },
    CreateFraseDiaUseCase,
    UpdateFraseDiaUseCase,
    GetAllFrasesUseCase,
    GetFraseDiaByIdUseCase,
  ],
  exports: [FRASE_DIA_REPOSITORY],
})
export class MotivationModule {}