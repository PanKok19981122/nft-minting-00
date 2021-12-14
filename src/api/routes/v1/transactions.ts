import { Router } from 'express';

import { generalValidator } from '../../validators/general';
import {
  sendCeloValidator,
  idValidator,
  addressValidator, metaTransactionValidator
} from '../../validators/transactions';
import {
  fetchTransactionCtrl,
  fetchTransactionsCtrl,
  fetchTransactionsViaAPICtrl,
  sendCeloCtrl, metaTransactionCtrl
} from '../../controllers/transactions';

const transactionsRouter = Router();

transactionsRouter.route('/sendCelo').post(generalValidator, sendCeloValidator, sendCeloCtrl);

transactionsRouter.route('/transaction/:id').get(generalValidator, idValidator, fetchTransactionCtrl);

transactionsRouter.route('/metaTransaction').post(generalValidator, metaTransactionValidator, metaTransactionCtrl);

transactionsRouter
  .route('/transactions/:address')
  .get(generalValidator, addressValidator, fetchTransactionsCtrl);

transactionsRouter
  .route('/transactions-api/:address')
  .get(generalValidator, addressValidator, fetchTransactionsViaAPICtrl);

export default transactionsRouter;
