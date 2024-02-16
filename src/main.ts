import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //si el usurio envia datos que no corresponden dará error
      forbidNonWhitelisted: true,
      transform: true, //transforma automaticamente los datos
    })
  );

  await app.listen(3000);
}
bootstrap();
