import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
export const configService = new ConfigService(`${process.env.NODE_ENV}.env`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Test')
    .setDescription(
      'We need to enhance the role system, along with updating and deleting tokens. Additionally, writing unit tests is required. This is my first time working with Prisma, so there might be some mistakes. Please be lenient in your judgment.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Включение глобальной валидации DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  await app.listen(configService.serverPort);
}
bootstrap();
