import { AdminModule } from './modules/admin/admin.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // ignora campos no declarados en el DTO
      forbidNonWhitelisted: true,
      transform: true,       // transforma tipos automáticamente
    }),
  );

  // CORS — ajusta el origin cuando tengas la URL del panel web
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Swagger panel web ────────────────────────────────────────────────────
  const webConfig = new DocumentBuilder()
    .setTitle('NewLife — Panel de Administración')
    .setDescription('Endpoints del panel web para admins y superadmins')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Admin — Auth')
    .build();

  const webDocument = SwaggerModule.createDocument(app, webConfig, {
    include: [AdminModule],
  });

  SwaggerModule.setup('api/docs/web', app, webDocument);

  // ── Arrancar servidor ────────────────────────────────────────────────────
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`
  🚀 Admin API corriendo en: http://localhost:${port}
  📋 Swagger web:            http://localhost:${port}/api/docs/web
  `);
}

bootstrap();