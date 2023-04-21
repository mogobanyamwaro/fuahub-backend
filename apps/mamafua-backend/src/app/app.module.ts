import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { BackendCoreModule } from '@mamafuahub/backend/core';
import { AppService } from './app.service';

@Module({
  imports: [
    BackendCoreModule,
    ConfigModule.forRoot(),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.colorize(),

              winston.format.printf((info) => {
                return `${info.timestamp} - [${info.level}] - ${info.message}`;
              })
            ),
          }),
        ],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
