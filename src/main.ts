import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");  //Para validaciones

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,   //Para validaciones
      transform: true,              //Para trasformar de string a number de manera automatica
    })
  );

  await app.listen(3000);
}


bootstrap();


