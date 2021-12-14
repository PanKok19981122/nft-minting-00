import { Router } from 'express';

import { generalValidator } from '../../validators/general';
import { addressValidator } from '../../validators/account';
import {
  generateAddressCtrl,
  fetchBalancesCtrl,
  fetchTokenBalancesCtrl,
  fetchAccountInfoCtrl,
} from '../../controllers/account';

const accountRouter = Router();

accountRouter.route('/generate-address').post(generalValidator, generateAddressCtrl);

accountRouter.route('/balances/:address').get(generalValidator, /* addressValidator, */ fetchBalancesCtrl);
accountRouter.route('/token-balance/:walletAddress/:contractAddress').get(generalValidator, /* addressValidator, */ fetchTokenBalancesCtrl);

export default accountRouter;
