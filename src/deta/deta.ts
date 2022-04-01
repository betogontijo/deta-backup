import DriveWriteStream from './drive';
import { KeyType } from './types/key';

export default class Deta {
  private key: string;

  private type: KeyType;

  private projectId: string;

  /**
   * Deta constructor
   *
   * @param {string} key
   * @param {KeyType} type
   * @param {string} projectId
   */
  constructor(key: string, type: KeyType, projectId: string) {
    this.key = key;
    this.type = type;
    this.projectId = projectId;
  }

  /**
   * Drive returns instance of Drive class
   *
   * @param {string} driveName
   * @param {string} [host]
   * @returns {DriveClass}
   */
  public DriveWriteStream(
    driveName: string,
    fileName: string,
  ): DriveWriteStream {
    const name = driveName?.trim();
    if (!name) {
      throw new Error('Drive name is not defined');
    }
    return new DriveWriteStream(
      this.key,
      this.type,
      this.projectId,
      name,
      fileName,
    );
  }
}
