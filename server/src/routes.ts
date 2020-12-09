import { Router, Request, Response } from 'express';
import LoginController from './controllers/login.controller';
import CurencyController from './controllers/currency.controller';
import { ensureAuthenticated } from './middlewares/auth.middleware';

const router = Router();

router.get('/api/health', (request: Request, response: Response) =>
  response.status(200).json({ message: 'The API is up' }),
);

router.get('/api/crypto/btc', ensureAuthenticated, CurencyController.index);

router.post('/api/crypto/btc', ensureAuthenticated, CurencyController.update);

router.post('/api/login', LoginController.create);

router.use((request: Request, response: Response) => {
  response.status(404).send({ message: 'Endpoint não encontrado' });
});

export default router;
