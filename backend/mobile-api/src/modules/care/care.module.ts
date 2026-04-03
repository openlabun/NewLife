import { Module } from '@nestjs/common';
import { ContactsController } from './presentation/controllers/contacts.controller';
import { ContactsUseCase } from './application/use-cases/contacts.use-case';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ContactsController],
  providers: [ContactsUseCase],
})
export class CareModule {}