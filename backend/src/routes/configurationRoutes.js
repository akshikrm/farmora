import { Router } from 'express';
import { authenticateToken } from '#middlewares/authMiddleware';
import { validateSeason, validateFarm, validateItem, validateVendor } from '#validators/configValidator';
import configurationController from '#controllers/configurationController';
import seasonController from '#controllers/season.controller';
import farmController from '#controllers/farm.controller';
import itemController from '#controllers/item.controller';

const router = Router();


// Season
router.post('/seasons', authenticateToken, validateSeason, seasonController.create);
router.get('/seasons', authenticateToken, seasonController.getAll);
router.get('/seasons/:season_id', authenticateToken, seasonController.getById);
router.put('/seasons/:season_id', authenticateToken, validateSeason, seasonController.updateById);
router.delete('/seasons/:season_id', authenticateToken, seasonController.deleteById);

// Farm
router.post('/farms', authenticateToken, validateFarm, farmController.create);
router.get('/farms', authenticateToken, farmController.getAll);
router.get('/farms/:farm_id', authenticateToken, farmController.getById);
router.put('/farms/:farm_id', authenticateToken, validateFarm, farmController.updateById);
router.delete('/farms/:farm_id', authenticateToken, farmController.deletById);

// Item
router.post('/items', authenticateToken, validateItem, itemController.create);
router.get('/items', authenticateToken, itemController.getAll);
router.get('/items/:item_id', authenticateToken, itemController.getById);
router.put('/items/:item_id', authenticateToken, validateItem, itemController.updateById);
router.delete('/items/:item_id', authenticateToken, itemController.deleteById);

// Vendor
router.post('/vendor', authenticateToken, validateVendor, configurationController.createVendor);
router.get('/vendor', authenticateToken, configurationController.getAllVendor);
router.get('/vendor/:id', authenticateToken, configurationController.getVendorById);
router.put('/vendor/:id', authenticateToken, validateVendor, configurationController.updateVendor);
router.delete('/vendor/:id', authenticateToken, configurationController.deleteVendor);

// Vendor
router.post('/batch', authenticateToken, validateVendor, configurationController.createBatch);
router.get('/batch', authenticateToken, configurationController.getAllBatchs);
router.get('/batch/:id', authenticateToken, configurationController.getBatchById);
router.put('/batch/:id', authenticateToken, validateVendor, configurationController.updateBatch);
router.delete('/batch/:id', authenticateToken, configurationController.deleteBatch);

export default router;
