/* Module imports -------------------------------------- */
import {
  hash,
  compare,
} from 'bcryptjs';

/* bcrypt helpers -------------------------------------- */
export const bcryptHashString = (string: string, saltSize: number = 10): Promise<string> => new Promise(
  (resolve, reject) => {
    hash(
      string,
      saltSize,
      (err, hash) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if(err) {
          reject(err);
        } else {
          resolve(hash);
        }
      }
    );
  }
);

export const bcryptCheck = (string: string, hash: string): Promise<boolean> => new Promise(
  (resolve, reject) => {
    compare(
      string,
      hash,
      (err, res) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  }
);
