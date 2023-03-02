import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get(RmqService);
  app.connectMicroservice(rmqService.getOptions('AUTH', true));
  app.startAllMicroservices();

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), () =>
    console.log('Starting AUTH'),
  );
}
bootstrap();
