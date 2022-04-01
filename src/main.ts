import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { createBullBoard } from '@bull-board/api';
import { Queue } from 'bull';
import { ExpressAdapter } from '@bull-board/express';
import * as expressBasicAuth from 'express-basic-auth';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = configuration();
  const serverAdapter = new ExpressAdapter();
  const aQueue = app.get<Queue>(`BullQueue_backup`);
  serverAdapter.setBasePath('');

  createBullBoard({
    queues: [new BullAdapter(aQueue)],
    serverAdapter,
  });

  app.use(
    '/',
    expressBasicAuth({
      users: {
        [config.bull.username]: config.bull.password,
      },
      challenge: true,
    }),
    serverAdapter.getRouter(),
  );
  const port = config.port || 3333;
  console.log(`Starting server on port ${port}`);
  await app.listen(port);
  console.log(`Server is running`);
}

bootstrap();
