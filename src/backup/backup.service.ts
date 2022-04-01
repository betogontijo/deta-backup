import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import Archiver from '../archiver/archiver';
import { Deta } from 'deta';
import configuration from '../config/configuration';

@Processor('backup')
export class BackupService {
  archiver = new Archiver();

  @Process('backup')
  async doBackup(job: Job<{ path: string }>) {
    const config = configuration();
    const { path } = job.data;
    const isFolderEmpty = await this.archiver.isFolderEmpty(path);
    if (!isFolderEmpty) {
      const archivedFile = await this.archiver.archive(path);
      const deta = Deta(config.deta.projectKey);
      const drive = deta.Drive(config.deta.drive);
      await drive.put('bkp.zip', { path: archivedFile });
    }
  }
}
