import { Router } from 'express';
import { authenticateToken } from '#middlewares/authMiddleware';
import { validateSeason, validateFarm, validateItem, validateVendor } from '#validators/configValidator';
import configurationController from '#controllers/configurationController';

const router = Router();


// Season
router.post('/season', authenticateToken, validateSeason, configurationController.createSeason);
router.get('/season', authenticateToken, configurationController.getAllSeason);
router.get('/season/:id', authenticateToken, configurationController.getSeasonById);
router.put('/season/:id', authenticateToken, validateSeason, configurationController.updateSeason);
router.delete('/season/:id', authenticateToken, configurationController.deleteSeason);

// Farm
router.post('/farm', authenticateToken, validateFarm, configurationController.createFarm);
router.get('/farm', authenticateToken, configurationController.getAllFarms);
router.get('/farm/:id', authenticateToken, configurationController.getFarmById);
router.put('/farm/:id', authenticateToken, validateFarm, configurationController.updateFarm);
router.delete('/farm/:id', authenticateToken, configurationController.deleteFarm);

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
