import { Router } from 'express';
import { authenticateToken } from '#middlewares/auth.middleware';
import seasonController from '#controllers/season.controller';
import { validateSeason, } from '#validators/config.validator';

const router = Router();
router.post('/', authenticateToken, validateSeason, seasonController.create);
router.get('/', authenticateToken, seasonController.getAll);
router.get('/:season_id', authenticateToken, seasonController.getById);
router.put('/:season_id', authenticateToken, validateSeason, seasonController.updateById);
router.delete('/:season_id', authenticateToken, seasonController.deleteById);


export default router
