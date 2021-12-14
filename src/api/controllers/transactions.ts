import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestDataError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import TransactionService from '../../services/transactions';

export const sendCeloCtrl = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

  const paymentTransaction = await TransactionService.sendCelo(req.body.celoAccount, req.body.recipient, req.body.amount);

  return new SuccessResponse('Celo Successfully Sent!', paymentTransaction).send(res);
});

export const fetchTransactionCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const transaction = await TransactionService.getTransaction(req.params.id);

    return new SuccessResponse('Transaction Successfully Retrieved!', transaction).send(res);
  }
);

export const fetchTransactionsCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const transactions = await TransactionService.getTransactions(req.params.address);

    return new SuccessResponse('Transactions Successfully Retrieved!', transactions).send(res);
  }
);

export const fetchTransactionsViaAPICtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const transactions = await TransactionService.getTransactionsViaAPI(req.params.address);

    return new SuccessResponse('Transactions Successfully Retrieved!', transactions).send(res);
  }
);

export const metaTransactionCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    const transaction = await TransactionService.metaTransaction({ ...req.body });

    return new SuccessResponse('Transaction Successfully Retrieved!', transaction).send(res);
  }
);