import { Request, Response } from "express";
import { validationResult } from "express-validator";

import asyncHandler from "../../helpers/asyncHandler";
import { BadRequestDataError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import AccountService from "../../services/account";

export const generateAddressCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const address = await AccountService.generateAddress();

    return new SuccessResponse("Address successfully generated!", address).send(res);
  }
);

// export const generateAddressCtrlJS = asyncHandler(
//   async (req: string, res: number) => {
//     const address = await AccountService.generateAddress();

//     return new SuccessResponse('Address successfully generated!', address).send(res);
//   }
// );

export const fetchBalancesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError("Validation Failed", errors);

    const balances = await AccountService.getBalances(req.params.address);

    return new SuccessResponse("Balances Successfully Retrieved!", balances).send(res);
  }
);

export const fetchTokenBalancesCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError("Validation Failed", errors);

    const balances = await AccountService.getTokenBalances(req.params.walletAddress, req.params.contractAddress);

    return new SuccessResponse("Token Balances Successfully Retrieved!", balances).send(res);
  }
);

export const fetchAccountInfoCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError("Validation Failed", errors);

    const accountInfo = await AccountService.getAccountInfo(req.params.address);

    return new SuccessResponse("Account Info Successfully Retrieved!", accountInfo).send(res);
  }
);