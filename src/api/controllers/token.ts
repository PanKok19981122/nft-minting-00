import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestDataError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import TokenService from '../../services/token';

export const issueTokenCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const issuedToken = await TokenService.issueToken({ ...req.body });

    return new SuccessResponse('Token Successfully Issued!', issuedToken).send(res);
  }
);
export const feeLessIssueTokenCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const issuedToken = await TokenService.feeLessToken({ ...req.body });

    return new SuccessResponse('Token Successfully Issued!', issuedToken).send(res);
  }
);

export const sendTokenCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const sentTransactionHash = await TokenService.sendToken({ ...req.body });

    return new SuccessResponse(`Transaction Successfully Sent! - ${sentTransactionHash}`, sentTransactionHash).send(res);
  }
);

export const mintTokenCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const mintedTokens = await TokenService.mintToken({ ...req.body });

    return new SuccessResponse(`${req.body.currency} Successfully Minted!`, mintedTokens).send(res);
  }
);

export const burnTokenCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const burntTokens = await TokenService.burnToken({ ...req.body });

    return new SuccessResponse(`${req.body.currency} Successfully Burnt!`, burntTokens).send(res);
  }
);

export const fetchColdAddressBalancesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const coldBalances = await TokenService.getColdAddressBalances();

    return new SuccessResponse('Cold Wallet Balance Retrieved', coldBalances).send(res);
  }
);

export const fetchHotAddressBalancesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const HotBalances = await TokenService.getHotAddressBalances();

    return new SuccessResponse('Hot Wallet Balance Retrieved', HotBalances).send(res);
  }
);
