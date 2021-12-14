import { Router } from 'express';
import { generalValidator } from '../../validators/general';
import accountRouter from './account';
import tokenRouter from './token';
import transactionsRouter from './transactions';


const router = Router();

router.use('/account', accountRouter);
router.use('/token', tokenRouter);
router.use('/transactions', transactionsRouter);


export default router;
