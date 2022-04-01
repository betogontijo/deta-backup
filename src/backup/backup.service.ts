import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import Archiver from '../archiver/archiver';
import configuration from '../config/configuration';
import { Deta } from '../deta';

@Processor('backup')
export class BackupService {
  archiver = new Archiver();

  @Process('backup')
  async doBackup(job: Job<{ path: string }>) {
    const config = configuration();
    const { path } = job.data;
    const isFolderEmpty = await this.archiver.isFolderEmpty(path);
    if (!isFolderEmpty) {
      const deta = Deta(config.deta.projectKey);
      const drive = deta.DriveWriteStream(config.deta.drive, 'bkp.zip');
      await this.archiver.archive(path, drive);
    }
  }
}
