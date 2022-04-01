import * as fs from 'fs';
import * as archiver from 'archiver';
import DetaWriteStream from '../deta/drive';

export default class Archiver {
  archive(sourceDir, stream: DetaWriteStream) {
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    return new Promise<void>((resolve, reject) => {
      archive.pipe(stream);
      archive.directory(sourceDir, false);
      archive.on('error', (err) => reject(err));

      stream.on('close', () => resolve());
      archive.finalize();
    });
  }

  isFolderEmpty(path: string) {
    return new Promise<boolean>((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.length === 0);
        }
      });
    });
  }
}
