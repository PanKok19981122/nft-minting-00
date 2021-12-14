import { Router } from 'express';

import { generalValidator } from '../../validators/general';
import {
  issueTokenValidator,
  sendTokenValidator,
  mintTokenValidator,
  burnTokenValidator,
} from '../../validators/token';
import {
  issueTokenCtrl,
  sendTokenCtrl,
  mintTokenCtrl,
  burnTokenCtrl,
  fetchColdAddressBalancesCtrl,
  fetchHotAddressBalancesCtrl, feeLessIssueTokenCtrl,
} from '../../controllers/token';

const tokenRouter = Router();

tokenRouter.route('/issue-token').post(generalValidator, issueTokenValidator, issueTokenCtrl);
tokenRouter.route('/fee-less-token').post(generalValidator, issueTokenValidator, feeLessIssueTokenCtrl);
tokenRouter.route('/send-token').post(generalValidator, sendTokenValidator, sendTokenCtrl);

tokenRouter.route('/mint-token').post(generalValidator, mintTokenValidator, mintTokenCtrl);

tokenRouter.route('/burn-token').post(generalValidator, burnTokenValidator, burnTokenCtrl);

tokenRouter.route('/cold-balance').get(generalValidator, fetchColdAddressBalancesCtrl);

tokenRouter.route('/hot-balance').get(generalValidator, fetchHotAddressBalancesCtrl);

export default tokenRouter;