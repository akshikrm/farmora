import { Router } from 'express';
import batchController from '#controllers/configuration.controller';
import { authenticateToken, isManager } from '#middlewares/auth.middleware';
import { validateBatch } from '#validators/config.validator';

const router = Router();

// TODO: Need to fix the CRUD operations for batches, there are few errors
router.post('/', authenticateToken, validateBatch, isManager, batchController.create);
router.get('/', authenticateToken, batchController.getAll);
router.get('/:batch_id', authenticateToken, batchController.getById);
router.put('/:batch_id', authenticateToken, validateBatch, batchController.updateById);
router.delete('/:batch_id', authenticateToken, batchController.deleteById);

export default router;
