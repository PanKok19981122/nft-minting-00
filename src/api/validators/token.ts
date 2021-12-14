import { body } from 'express-validator';

export const issueTokenValidator = [
  body('contractOwnerPK').notEmpty().withMessage('Contract Owner Private Key cannot be empty!'),
  body('tokenName').notEmpty().withMessage('Token Name cannot be empty!'),
  body('tokenSymbol').notEmpty().withMessage('Token Symbol cannot be empty!'),
  body('issueQuantity').notEmpty().withMessage('Issue quantity cannot be empty!'),
  body('securityContact').notEmpty().withMessage('Security Contact cannot be empty!'),
];

export const sendTokenValidator = [
  body('contractAddress').notEmpty().withMessage('Contract Address cannot be empty!'),
  body('senderPK').notEmpty().withMessage('Sender Private Key cannot be empty!'),
  body('amount').notEmpty().withMessage('Amount to send cannot be empty!'),
  body('recipient').notEmpty().withMessage('Recipient cannot be empty!'),
  body('abi').notEmpty().withMessage('Contract ABI cannot be empty!'),
];

export const mintTokenValidator = [
  body('contractAddress').notEmpty().withMessage('Contract Address cannot be empty!'),
  body('contractOwnerPK').notEmpty().withMessage('Contract Owner Private Key cannot be empty!'),
  body('amount').notEmpty().withMessage('Amount to send cannot be empty!'),
  body('recipient').notEmpty().withMessage('Recipient cannot be empty!'),
  body('abi').notEmpty().withMessage('Contract ABI cannot be empty!'),
];

export const burnTokenValidator = [
  body('contractAddress').notEmpty().withMessage('Contract Address cannot be empty!'),
  body('contractOwnerPK').notEmpty().withMessage('Contract Owner Private Key cannot be empty!'),
  body('amount').notEmpty().withMessage('Amount to send cannot be empty!'),
  body('abi').notEmpty().withMessage('Contract ABI cannot be empty!'),
];