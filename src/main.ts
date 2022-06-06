import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = 3000
async function bootstrap() {
  console.log(`App Running on SYSTEM PORT ==> [${PORT}]`)
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
