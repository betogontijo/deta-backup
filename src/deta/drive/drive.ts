import url from '../constants/url';
import { KeyType } from '../types/key';
import Requests from '../utils/request';
import { DriveApi } from '../constants/api';
import { Writable } from 'stream';

export default class DriveWriteStream extends Writable {
  private requests: Requests;
  private name: string;
  private uid: string;
  private resName: string;
  private part = 1;

  /**
   * Drive constructor
   *
   * @param {string} key
   * @param {KeyType} type
   * @param {string} projectId
   * @param {string} driveName
   * @param {string} [host]
   */
  constructor(
    key: string,
    type: KeyType,
    projectId: string,
    driveName: string,
    fileName: string,
  ) {
    super();
    const baseURL = url
      .drive()
      .replace(':drive_name', driveName)
      .replace(':project_id', projectId);
    this.requests = new Requests(key, type, baseURL);
    this.name = fileName;
  }

  _construct(callback: (error?: Error | null) => void) {
    this.requests
      .post(DriveApi.INIT_CHUNK_UPLOAD.replace(':name', this.name), {
        headers: {
          'Content-Type': 'binary/octet-stream',
        },
      })
      .then(({ response, error }) => {
        if (error) {
          callback(error);
          return;
        }
        const { upload_id: uid, name: resName } = response;
        this.uid = uid;
        this.resName = resName;
        callback();
      });
  }

  _writev(
    chunks: Array<{ chunk: Buffer; encoding: BufferEncoding }>,
    callback: (error?: Error | null) => void,
  ) {
    this._write(
      Buffer.concat(chunks.map((chunk) => chunk.chunk)),
      chunks[0].encoding,
      callback,
    );
  }

  _write(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ) {
    this.requests
      .post(
        DriveApi.UPLOAD_FILE_CHUNK.replace(':uid', this.uid)
          .replace(':name', this.name)
          .replace(':part', this.part.toString()),
        {
          payload: chunk,
          headers: {
            'Content-Type': 'binary/octet-stream',
          },
        },
      )
      .then(({ error }) => {
        if (error) {
          callback(error);
          return;
        }
        this.part += 1;
        callback();
      });
  }

  _final(callback: (error?: Error | null) => void) {
    this.requests
      .patch(
        DriveApi.COMPLETE_FILE_UPLOAD.replace(':uid', this.uid).replace(
          ':name',
          this.name,
        ),
      )
      .then(({ error }) => {
        if (error) {
          callback(error);
          return;
        }
        callback();
      });
  }
}
