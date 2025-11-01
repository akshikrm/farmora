import { Router } from 'express';
import { authenticateToken } from '#middlewares/authMiddleware';
import { validateSeason, validateFarm, validateItem, validateVendor } from '#validators/configValidator';
import batchController from '#controllers/configurationController';
import seasonController from '#controllers/season.controller';
import farmController from '#controllers/farm.controller';
import itemController from '#controllers/item.controller';
import vendorController from '#controllers/vendor.controller';

const router = Router();

router.post('/seasons', authenticateToken, validateSeason, seasonController.create);
router.get('/seasons', authenticateToken, seasonController.getAll);
router.get('/seasons/:season_id', authenticateToken, seasonController.getById);
router.put('/seasons/:season_id', authenticateToken, validateSeason, seasonController.updateById);
router.delete('/seasons/:season_id', authenticateToken, seasonController.deleteById);

router.post('/farms', authenticateToken, validateFarm, farmController.create);
router.get('/farms', authenticateToken, farmController.getAll);
router.get('/farms/:farm_id', authenticateToken, farmController.getById);
router.put('/farms/:farm_id', authenticateToken, validateFarm, farmController.updateById);
router.delete('/farms/:farm_id', authenticateToken, farmController.deletById);

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


// TODO: Need to fix the CRUD operations for batches, there are few errors
router.post('/batches', authenticateToken, validateVendor, batchController.create);
router.get('/batches', authenticateToken, batchController.getAll);
router.get('/batches/:batch_id', authenticateToken, batchController.getById);
router.put('/batches/:batch_id', authenticateToken, validateVendor, batchController.updateById);
router.delete('/batches/:batch_id', authenticateToken, batchController.deleteById);

export default router;
