import { param } from 'express-validator';

export const addressValidator = [
  param('address').notEmpty().withMessage('Address parameter cannot be empty!'),
];

// TODO: Add custom hexadecimal address validation in the future for Celo addresses