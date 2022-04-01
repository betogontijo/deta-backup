import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import configuration from '../config/configuration';

@Injectable()
export class SchedulerService {
  constructor(@InjectQueue('backup') private queue: Queue) {}

  async onModuleInit() {
    const config = configuration();
    await this.queue.empty();
    await this.queue.add(
      'backup',
      {
        path: config.backup.path,
      },
      { repeat: { cron: config.backup.cron } },
    );
  }
}
