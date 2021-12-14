import { body, param } from 'express-validator';

export const sendCeloValidator = [
  body('recipient').notEmpty().withMessage('Recipient address cannot be empty!'),
  body('amount').notEmpty().withMessage('Transaction amount cannot be empty!'),
];
export const metaTransactionValidator = [
  body('contractAddress').notEmpty().withMessage('Contract Address cannot be empty!'),
  body('amount').notEmpty().withMessage('Amount to send cannot be empty!'),
  body('recipient').notEmpty().withMessage('Recipient cannot be empty!'),
  body('abi').notEmpty().withMessage('Contract ABI cannot be empty!'),
];

export const idValidator = [param('id').notEmpty().withMessage('Transaction ID cannot be empty!')];

export const addressValidator = [
  param('address').notEmpty().withMessage('Account address cannot be empty!'),
];
