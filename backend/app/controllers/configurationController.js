const configurationService = require("../services/configurationService");

// Season
exports.createSeason = async (req, res) => {
    try {
        const packageData = req.body;
        const result = await configurationService.createSeason(packageData);

        if (!result.success) {
            return res.status(500).json({ 
                status: false,
                message: "Failed to create season", 
                error: result.error 
            });
        }

        return res.status(201).json({ 
            status: true,
            message: "Season created successfully", 
            package: result.data 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getAllSeason = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const whereClause = {}
        
        console.log('req.query.master_id', req.query.master_id);
        
        if(req.query.master_id) {
            whereClause.master_id = req.query.master_id
        }
        if(req.query.status) {
            whereClause.status = req.query.status
        }
        if (req.query.name) {
            whereClause.name = req.query.name;
        }
    
        const result = await configurationService.getAllSeasons(
            page, limit, whereClause
        );
    
        if (!result.success) {
            return res.status(500).json({ 
                message: result.message, 
                error: result.error 
            });
        }
    
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getSeasonById = async (req, res) => {
    try {
        
        const { id } = req.params;
    
        const result = await configurationService.getSeasonById(id);
    
        return res.status(200).json( result );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updateSeason = async (req, res) => {
    try {
        const { id } = req.params;
        const packageData = req.body;
    
        const result = await configurationService.updateSeason(id, packageData);
    
        if (!result.status) {
            return res.status(400).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: false,
            message: result.message, 
            data: result.singleData 
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.deleteSeason = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await configurationService.deleteSeason(id);
    
        if (!result.status) {
            return res.status(404).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: true,
            message: result.message 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// Farm
exports.createFarm = async (req, res) => {
    try {
        const data = req.body;
        const result = await configurationService.createFarm(data);

        if (!result.success) {
            return res.status(500).json({ 
                status: false,
                message: "Failed to create season", 
                error: result.error 
            });
        }

        return res.status(201).json({ 
            status: true,
            message: "Farm created successfully", 
            package: result.data 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getAllFarms = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const whereClause = {}
        
        if(req.query.master_id) {
            whereClause.master_id = req.query.master_id
        }
        if(req.query.status) {
            whereClause.status = req.query.status
        }
        if (req.query.name) {
            whereClause.name = req.query.name;
        }
    
        const result = await configurationService.getAllFarms(
            page, limit, whereClause
        );
    
        if (!result.success) {
            return res.status(500).json({ 
                message: result.message, 
                error: result.error 
            });
        }
    
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getFarmById = async (req, res) => {
    try {
        
        const { id } = req.params;
    
        const result = await configurationService.getFarmById(id);
    
        return res.status(200).json( result );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updateFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
    
        const result = await configurationService.updateFarm(id, data);
    
        if (!result.status) {
            return res.status(400).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: false,
            message: result.message, 
            data: result.singleData 
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.deleteFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await configurationService.deleteFarm(id);
    
        if (!result.status) {
            return res.status(404).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: true,
            message: result.message 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// Item
exports.createItem = async (req, res) => {
    try {
        const data = req.body;
        const result = await configurationService.createItem(data);

        if (!result.success) {
            return res.status(500).json({ 
                status: false,
                message: "Failed to create season", 
                error: result.error 
            });
        }

        return res.status(201).json({ 
            status: true,
            message: "Items created successfully", 
            package: result.data 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const whereClause = {}
        
        if(req.query.master_id) {
            whereClause.master_id = req.query.master_id
        }
        if(req.query.status) {
            whereClause.status = req.query.status
        }
        if (req.query.name) {
            whereClause.name = req.query.name;
        }
    
        const result = await configurationService.getAllItems(
            page, limit, whereClause
        );
    
        if (!result.success) {
            return res.status(500).json({ 
                message: result.message, 
                error: result.error 
            });
        }
    
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getItemById = async (req, res) => {
    try {
        
        const { id } = req.params;
    
        const result = await configurationService.getItemById(id);
    
        return res.status(200).json( result );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
    
        const result = await configurationService.updateItem(id, data);
    
        if (!result.status) {
            return res.status(400).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: false,
            message: result.message, 
            data: result.singleData 
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await configurationService.deleteItem(id);
    
        if (!result.status) {
            return res.status(404).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: true,
            message: result.message 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};
 
// Vendor
exports.createVendor = async (req, res) => {
    try {
        const data = req.body;
        const result = await configurationService.createVendor(data);

        if (!result.success) {
            return res.status(500).json({ 
                status: false,
                message: "Failed to create season", 
                error: result.error 
            });
        }

        return res.status(201).json({ 
            status: true,
            message: "Vendor created successfully", 
            package: result.data 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getAllVendor = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const whereClause = {}
        
        if(req.query.master_id) {
            whereClause.master_id = req.query.master_id
        }
        if(req.query.status) {
            whereClause.status = req.query.status
        }
        if (req.query.name) {
            whereClause.name = req.query.name;
        }
    
        const result = await configurationService.getAllVendors(
            page, limit, whereClause
        );
    
        if (!result.success) {
            return res.status(500).json({ 
                message: result.message, 
                error: result.error 
            });
        }
    
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getVendorById = async (req, res) => {
    try {
        
        const { id } = req.params;
    
        const result = await configurationService.getVendorById(id);
    
        return res.status(200).json( result );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
    
        const result = await configurationService.updateVendor(id, data);
    
        if (!result.status) {
            return res.status(400).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: false,
            message: result.message, 
            data: result.singleData 
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await configurationService.deleteVendor(id);
    
        if (!result.status) {
            return res.status(404).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: true,
            message: result.message 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// Farm
exports.createBatch = async (req, res) => {
    try {
        const data = req.body;
        const result = await configurationService.createBatch(data);

        if (!result.success) {
            return res.status(500).json({ 
                status: false,
                message: "Failed to create batch", 
                error: result.error 
            });
        }

        return res.status(201).json({ 
            status: true,
            message: "Batch created successfully", 
            package: result.data 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getAllBatchs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const whereClause = {}
        
        if(req.query.season_id) {
            whereClause.season_id = req.query.season_id
        }
        if(req.query.farm_id) {
            whereClause.farm_id = req.query.farm_id
        }
        if(req.query.status) {
            whereClause.status = req.query.status
        }
    
        const result = await configurationService.getAllBatchs(
            page, limit, whereClause
        );
    
        if (!result.success) {
            return res.status(500).json({ 
                message: result.message, 
                error: result.error 
            });
        }
    
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getBatchById = async (req, res) => {
    try {
        
        const { id } = req.params;
    
        const result = await configurationService.getBatchById(id);
    
        return res.status(200).json( result );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updateBatch = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
    
        const result = await configurationService.updateBatch(id, data);
    
        if (!result.status) {
            return res.status(400).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: false,
            message: result.message, 
            data: result.singleData 
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.deleteBatch = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await configurationService.deleteBatch(id);
    
        if (!result.status) {
            return res.status(404).json({ 
                status: false,
                message: result.message 
            });
        }
    
        return res.status(200).json({ 
            status: true,
            message: result.message 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};