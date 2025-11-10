import { Router } from 'express';
import { authenticateToken, isManager } from '#middlewares/auth.middleware';
import { validateFarm, } from '#validators/config.validator';
import farmController from '#controllers/farm.controller';

const router = Router();

router.post('/', authenticateToken, validateFarm, farmController.create);
router.get('/', authenticateToken, isManager, farmController.getAll);
router.get('/:farm_id', authenticateToken, isManager, farmController.getById);
router.put('/:farm_id', authenticateToken, validateFarm, isManager, farmController.updateById);
router.delete('/:farm_id', authenticateToken, isManager, farmController.deletById);


export default router;
