import { header } from 'express-validator';
import { signature, appKey } from '../../config';

export const generalValidator = [
  header('signature')
    .notEmpty()
    .withMessage('Access Denied: cannot access route!')
    .custom((value: string) => {
      if (value !== signature) return Promise.reject(`Access Denied: cannot access route!`);
      else return true;
    }),
  header('appKey')
    .notEmpty()
    .withMessage('Access Denied: cannot access route!')
    .custom((value: string) => {
      if (value !== appKey) return Promise.reject(`Access Denied: cannot access route!`);
      else return true;
    }),
];
