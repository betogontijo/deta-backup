import { Module } from '@nestjs/common';
import { SchedulerModule } from './scheduler/scheduler.module';
import { BullModule } from '@nestjs/bull';
import { BackupModule } from './backup/backup.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        get host() {
          return configuration().redis.host;
        },
        get port() {
          return Number(configuration().redis.port);
        },
      },
    }),
    SchedulerModule,
    BackupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
