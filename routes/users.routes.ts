import { Router } from 'express';
import { getUser, listRepos, listUsers } from '../controllers/users.controller';

const router = Router();

router.get('/users', listUsers);
router.get('/users/:username/details', getUser);
router.get('/users/:username/repos', listRepos);

export default router;