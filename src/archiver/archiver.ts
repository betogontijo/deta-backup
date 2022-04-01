import * as fs from 'fs';
import * as archiver from 'archiver';

export default class Archiver {
  archive(sourceDir, outPath = 'target.zip') {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);

    return new Promise<string>((resolve, reject) => {
      archive.pipe(stream);
      archive.directory(sourceDir, false);
      archive.on('error', (err) => reject(err));

      stream.on('close', () => resolve(outPath));
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
