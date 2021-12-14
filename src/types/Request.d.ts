import { Request } from 'express';
import { IUser } from 'api/database/models/user.model';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export interface MyReq extends Request {
  user?: IUser;
}
