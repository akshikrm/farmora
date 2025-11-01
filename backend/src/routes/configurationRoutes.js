import { Router } from 'express';
import { authenticateToken } from '#middlewares/authMiddleware';
import { validateSeason, validateFarm, validateItem, validateVendor } from '#validators/configValidator';
import configurationController from '#controllers/configurationController';
import seasonController from '#controllers/season.controller';
import farmController from '#controllers/farm.controller';

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
router.post('/item', authenticateToken, validateItem, configurationController.createItem);
router.get('/item', authenticateToken, configurationController.getAllItems);
router.get('/item/:id', authenticateToken, configurationController.getItemById);
router.put('/item/:id', authenticateToken, validateItem, configurationController.updateItem);
router.delete('/item/:id', authenticateToken, configurationController.deleteItem);

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
