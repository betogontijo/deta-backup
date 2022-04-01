import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'backup',
    }),
  ],
  controllers: [],
  providers: [SchedulerService],
})
export class SchedulerModule {}
