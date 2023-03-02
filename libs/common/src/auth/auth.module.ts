import {
  DynamicModule,
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AUTH_SERVICE } from './services';
import { RmqModule } from '../rmq/rmq.module';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  exports: [RmqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
