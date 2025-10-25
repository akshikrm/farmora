const { Op } = require('sequelize');
const { sequelize, seasons, farms, items, vendors, batchs } = require('../../models');

// season
exports.createSeason = async (insertData) => {
    try {
        const data = await seasons.create(insertData);
        return { success: true, data };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

exports.getAllSeasons = async (page = 1, limit = 10, filters = {}) => {
    try {
        const offset = (page - 1) * limit;
        const whereClause = { ...filters }

        if (filters.name) {
            whereClause.name = { [Op.iLike]: `%${filters.name}%` }; 
        }

        const { count, rows } = await seasons.findAndCountAll({
            where: whereClause,
            limit, offset,
            order: [["id", "DESC"]]
        });
    
        return {
            success: true,total: count, page, limit,
            totalPages: Math.ceil(count / limit),
            data: rows,
        };
    } catch (error) {
      return { 
            success: false, 
            message: "Error fetching packages", 
            error: error.message 
        };
    }
};

exports.getSeasonById = async (id) => {
    try {
        const data = await seasons.findOne({ where: { id } });
        return { status: true, data : data || []};
    } catch (error) {
        return { 
            success: false, 
            message: "Error fetching package", 
            error: error.message
        };
    }
};

exports.updateSeason = async (id, data) => {
    try {
        const singleData = await seasons.findByPk(id);
        if (!singleData) {
            return { status: false, message: "Season not found" };
        }
        await singleData.update(data);
    
        return { status: true, message: "Season updated successfully", singleData };
    } catch (error) {
        return { 
            success: false, 
            message: "Error updating package", 
            error: error.message
        };
    }
};

exports.deleteSeason = async (id) => {
    try {
        const data = await seasons.findByPk(id);
    
        if (!data) { return { status: false, message: "Season not found" }; }
    
        await data.destroy();
        return { status: true, message: "Season deleted successfully" };
    } catch (error) {
        return { 
            status: false, 
            message: "Error deleting package", 
            error: error.message
        };
    }
};

// Farm
exports.createFarm = async (insertData) => {
    try {
        const data = await farms.create(insertData);
        return { success: true, data };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

exports.getAllFarms = async (page = 1, limit = 10, filters = {}) => {
    try {
        const offset = (page - 1) * limit;
        const whereClause = { ...filters }

        if (filters.name) {
            whereClause.name = { [Op.iLike]: `%${filters.name}%` }; 
        }

        const { count, rows } = await farms.findAndCountAll({
            where: whereClause,
            limit, offset,
            order: [["id", "DESC"]]
        });
    
        return {
            success: true,total: count, page, limit,
            totalPages: Math.ceil(count / limit),
            data: rows,
        };
    } catch (error) {
      return { 
            success: false, 
            message: "Error fetching packages", 
            error: error.message 
        };
    }
};

exports.getFarmById = async (id) => {
    try {
        const data = await farms.findOne({ where: { id } });
        return { status: true, data : data || []};
    } catch (error) {
        return { 
            success: false, 
            message: "Error fetching package", 
            error: error.message
        };
    }
};

exports.updateFarm = async (id, data) => {
    try {
        const singleData = await farms.findByPk(id);
        if (!singleData) {
            return { status: false, message: "Farm not found" };
        }
        await singleData.update(data);
    
        return { status: true, message: "Farm updated successfully", singleData };
    } catch (error) {
        return { 
            success: false, 
            message: "Error updating package", 
            error: error.message
        };
    }
};

exports.deleteFarm = async (id) => {
    try {
        const data = await farms.findByPk(id);
    
        if (!data) { return { status: false, message: "Farm not found" }; }
    
        await data.destroy();
        return { status: true, message: "Farm deleted successfully" };
    } catch (error) {
        return { 
            status: false, 
            message: "Error deleting package", 
            error: error.message
        };
    }
};

// Item
exports.createItem = async (insertData) => {
    try {
        const data = await items.create(insertData);
        return { success: true, data };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

exports.getAllItems = async (page = 1, limit = 10, filters = {}) => {
    try {
        const offset = (page - 1) * limit;
        const whereClause = { ...filters }

        if (filters.name) {
            whereClause.name = { [Op.iLike]: `%${filters.name}%` }; 
        }

        const { count, rows } = await items.findAndCountAll({
            where: whereClause,
            limit, offset,
            order: [["id", "DESC"]]
        });
    
        return {
            success: true,total: count, page, limit,
            totalPages: Math.ceil(count / limit),
            data: rows,
        };
    } catch (error) {
      return { 
            success: false, 
            message: "Error fetching packages", 
            error: error.message 
        };
    }
};

exports.getItemById = async (id) => {
    try {
        const data = await items.findOne({ where: { id } });
        return { status: true, data : data || []};
    } catch (error) {
        return { 
            success: false, 
            message: "Error fetching package", 
            error: error.message
        };
    }
};

exports.updateItem = async (id, data) => {
    try {
        const singleData = await items.findByPk(id);
        if (!singleData) {
            return { status: false, message: "Item not found" };
        }
        await singleData.update(data);
    
        return { status: true, message: "Item updated successfully", singleData };
    } catch (error) {
        return { 
            success: false, 
            message: "Error updating package", 
            error: error.message
        };
    }
};

exports.deleteItem = async (id) => {
    try {
        const data = await items.findByPk(id);
    
        if (!data) { return { status: false, message: "Item not found" }; }
    
        await data.destroy();
        return { status: true, message: "Item deleted successfully" };
    } catch (error) {
        return { 
            status: false, 
            message: "Error deleting package", 
            error: error.message
        };
    }
};

// Vendor
exports.createVendor = async (insertData) => {
    try {
        const data = await vendors.create(insertData);
        return { success: true, data };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

exports.getAllVendors = async (page = 1, limit = 10, filters = {}) => {
    try {
        const offset = (page - 1) * limit;
        const whereClause = { ...filters }

        if (filters.name) {
            whereClause.name = { [Op.iLike]: `%${filters.name}%` }; 
        }

        const { count, rows } = await vendors.findAndCountAll({
            where: whereClause,
            limit, offset,
            order: [["id", "DESC"]]
        });
    
        return {
            success: true,total: count, page, limit,
            totalPages: Math.ceil(count / limit),
            data: rows,
        };
    } catch (error) {
      return { 
            success: false, 
            message: "Error fetching packages", 
            error: error.message 
        };
    }
};

exports.getVendorById = async (id) => {
    try {
        const data = await vendors.findOne({ where: { id } });
        return { status: true, data : data || []};
    } catch (error) {
        return { 
            success: false, 
            message: "Error fetching package", 
            error: error.message
        };
    }
};

exports.updateVendor = async (id, data) => {
    try {
        const singleData = await vendors.findByPk(id);
        if (!singleData) {
            return { status: false, message: "Vendor not found" };
        }
        await singleData.update(data);
    
        return { status: true, message: "Vendor updated successfully", singleData };
    } catch (error) {
        return { 
            success: false, 
            message: "Error updating package", 
            error: error.message
        };
    }
};

exports.deleteVendor = async (id) => {
    try {
        const data = await vendors.findByPk(id);
    
        if (!data) { return { status: false, message: "Vendor not found" }; }
    
        await data.destroy();
        return { status: true, message: "Vendor deleted successfully" };
    } catch (error) {
        return { 
            status: false, 
            message: "Error deleting package", 
            error: error.message
        };
    }
};

// Batch
exports.createBatch = async (insertData) => {
    try {
        const data = await batchs.create(insertData);
        return { success: true, data };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

exports.getAllBatchs = async (page = 1, limit = 10, filters = {}) => {
    try {
        const offset = (page - 1) * limit;
        const whereClause = { ...filters }

        if (filters.name) {
            whereClause.name = { [Op.iLike]: `%${filters.name}%` }; 
        }

        const { count, rows } = await batchs.findAndCountAll({
            where: whereClause,
            limit, offset,
            order: [["id", "DESC"]]
        });
    
        return {
            success: true,total: count, page, limit,
            totalPages: Math.ceil(count / limit),
            data: rows,
        };
    } catch (error) {
      return { 
            success: false, 
            message: "Error fetching", 
            error: error.message 
        };
    }
};

exports.getBatchById = async (id) => {
    try {
        const data = await batchs.findOne({ where: { id } });
        return { status: true, data : data || []};
    } catch (error) {
        return { 
            success: false, 
            message: "Error fetching package", 
            error: error.message
        };
    }
};

exports.updateBatch = async (id, data) => {
    try {
        const singleData = await batchs.findByPk(id);
        if (!singleData) {
            return { status: false, message: "batch not found" };
        }
        await singleData.update(data);
    
        return { status: true, message: "Item updated successfully", singleData };
    } catch (error) {
        return { 
            success: false, 
            message: "Error updating package", 
            error: error.message
        };
    }
};

exports.deleteBatch = async (id) => {
    try {
        const data = await items.findByPk(id);
    
        if (!data) { return { status: false, message: "Batch not found" }; }
    
        await data.destroy();
        return { status: true, message: "Batch deleted successfully" };
    } catch (error) {
        return { 
            status: false, 
            message: "Error deleting package", 
            error: error.message
        };
    }
};