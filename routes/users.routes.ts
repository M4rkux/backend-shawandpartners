import { Router } from 'express';
import { listUsers } from '../controllers/users.controller';

const router = Router();

router.get('/users', listUsers);

export default router;