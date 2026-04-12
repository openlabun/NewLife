import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { MotivationModule } from './modules/motivation/motivation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AdminModule,
    MotivationModule, // <-- ¡Lo añadimos aquí!
  ],
})
export class AppModule {}