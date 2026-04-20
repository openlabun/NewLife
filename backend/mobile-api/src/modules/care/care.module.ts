import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

// --- Controladores ---
import { ContactsController } from './presentation/controllers/contacts.controller';
import { GruposController } from './presentation/controllers/grupos.controller';
import { CategoriasController } from './presentation/controllers/categorias.controller';
import { ContenidoMobileController } from './presentation/controllers/contenido.controller';
import { AgendaController } from './presentation/controllers/agenda.controller'; // <-- NUEVO

// --- Casos de Uso ---
import { ContactsUseCase } from './application/use-cases/contacts.use-case';
import { GetActiveGruposUseCase } from './application/use-cases/get-active-grupos.use-case';
import { GetCategoriasUseCase } from './application/use-cases/get-categorias.use-case';
import { GetPublishedContenidoUseCase } from './application/use-cases/get-published-contenido.use-case';
import { ManageFavoritosUseCase } from './application/use-cases/manage-favoritos.use-case';
import { AgendaUseCase } from './application/use-cases/agenda.use-case'; // <-- NUEVO

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    ContactsController, 
    GruposController,
    CategoriasController,
    ContenidoMobileController,
    AgendaController
  ],
  providers: [
    ContactsUseCase, 
    GetActiveGruposUseCase,
    GetCategoriasUseCase,
    GetPublishedContenidoUseCase,
    ManageFavoritosUseCase,
    AgendaUseCase
  ],
})
export class CareModule {}