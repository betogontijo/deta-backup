import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'backup',
    }),
  ],
  controllers: [],
  providers: [BackupService],
})
export class BackupModule {}
