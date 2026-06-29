import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Configurar prefijo global para la API
  app.setGlobalPrefix('api');

  // Configurar ValidationPipe global para class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger para documentación de la API
  const config = new DocumentBuilder()
    .setTitle('Devify GuardSafe API')
    .setDescription('Documentación de la API de seguridad y control de guardias')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Servidor listo en http://localhost:${port}`);
  console.log(`📖 Swagger docs en http://localhost:${port}/api/docs`);
}
bootstrap();
