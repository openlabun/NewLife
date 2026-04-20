import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ContactsController } from './presentation/controllers/contacts.controller';
import { GruposController } from './presentation/controllers/grupos.controller'; // <-- Nuevo
import { ContactsUseCase } from './application/use-cases/contacts.use-case';
import { GetActiveGruposUseCase } from './application/use-cases/get-active-grupos.use-case'; // <-- Nuevo

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    ContactsController, 
    GruposController
  ],
  providers: [
    ContactsUseCase, 
    GetActiveGruposUseCase
  ],
})
export class CareModule {}