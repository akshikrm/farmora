import { Router } from 'express';
import { authenticateToken } from '#middlewares/auth.middleware';
import { validateSeason, validateFarm, validateItem, validateVendor, validateBatch } from '#validators/config.validator';
import batchController from '#controllers/configuration.controller';
import seasonController from '#controllers/season.controller';
import itemController from '#controllers/item.controller';
import vendorController from '#controllers/vendor.controller';

const router = Router();

router.post('/seasons', authenticateToken, validateSeason, seasonController.create);
router.get('/seasons', authenticateToken, seasonController.getAll);
router.get('/seasons/:season_id', authenticateToken, seasonController.getById);
router.put('/seasons/:season_id', authenticateToken, validateSeason, seasonController.updateById);
router.delete('/seasons/:season_id', authenticateToken, seasonController.deleteById);


router.post('/items', authenticateToken, validateItem, itemController.create);
router.get('/items', authenticateToken, itemController.getAll);
router.get('/items/:item_id', authenticateToken, itemController.getById);
router.put('/items/:item_id', authenticateToken, validateItem, itemController.updateById);
router.delete('/items/:item_id', authenticateToken, itemController.deleteById);

router.post('/vendors', authenticateToken, validateVendor, vendorController.create);
router.get('/vendors', authenticateToken, vendorController.getAll);
router.get('/vendors/:vendor_id', authenticateToken, vendorController.getById);
router.put('/vendors/:vendor_id', authenticateToken, validateVendor, vendorController.updateById);
router.delete('/vendors/:vendor_id', authenticateToken, vendorController.deleteById);



export default router;
