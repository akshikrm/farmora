const subscriptionService = require("../services/subscriptionService");

exports.createPackage = async (req, res) => {
    try {
        const packageData = req.body;
        const result = await subscriptionService.createPackage(packageData);

        if (!result.success) {
            return res.status(500).json({ 
                status: false,
                message: "Failed to create package", 
                error: result.error 
            });
        }

        return res.status(201).json({ 
            status: true,
            message: "Package created successfully", 
            package: result.data 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

exports.getAllPackages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const whereClause = {}
        
        if(req.query.status) {
            whereClause.status = req.query.status
        }
        if (req.query.name) {
            whereClause.name = req.query.name;
        }
    
        const result = await subscriptionService.getAllPackages(
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

exports.getPackageById = async (req, res) => {
    try {
        console.log('id', req.params.id);
        
        const { id } = req.params;
    
        const result = await subscriptionService.getPackageById(id);
    
        return res.status(200).json( result );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const packageData = req.body;
    
        const result = await subscriptionService.updatePackage(id, packageData);
    
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

exports.deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await subscriptionService.deletePackage(id);
    
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

exports.createSubscription = async (req, res) => {
    try {
        const { id } = req.body;
        const user_id = req.user.id;
    
        const result = await subscriptionService.createSubscription(user_id, id);
    
        if (!result.status) {
            return res.status(400).json({ 
                status: result.status,
                message: result.message 
            });
        }
    
        return res.status(201).json({ 
            status: result.status,
            message: result.message, 
            subscription: result.subscription 
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


exports.listSubscription = async (req, res) => {
    try {

    } catch(error) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
}
  