import { WinstonModule, utilities as WinstonUtilities } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Winston from 'winston';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        new Winston.transports.Console({
          level: 'debug',
          format: WinstonUtilities.format.nestLike('MamaFua', {
            prettyPrint: true,
            colors: true,
          }),
        }),
      ],
    }),
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
