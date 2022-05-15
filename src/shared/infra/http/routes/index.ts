import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import addressRouter from '@modules/address/infra/http/routes/address.routes';

const router = Router();

router.use(usersRouter);
router.use(sessionsRouter);
router.use(addressRouter);

export default router;
