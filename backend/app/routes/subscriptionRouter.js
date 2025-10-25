const express = require("express");
const subscriptionController = require("../controllers/subscriptionController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validatePackage } = require("../validators/packageValidator");

const router = express.Router();

router.post("/packages", 
    authMiddleware.authenticateToken,
    authMiddleware.verifyAdmin, 
    validatePackage, 
    subscriptionController.createPackage
);
router.get("/packages",
    subscriptionController.getAllPackages
);
router.get("/packages/:id",
    subscriptionController.getPackageById
);
router.put("/packages/:id", 
    authMiddleware.authenticateToken,
    authMiddleware.verifyAdmin, 
    validatePackage, 
    subscriptionController.updatePackage
);
router.delete("/packages/:id",
    subscriptionController.deletePackage
);

router.post("/subscribe", 
    authMiddleware.authenticateToken,
    subscriptionController.createSubscription
);
// router.get("/subscriptions", 
//     authMiddleware.authenticateToken, 
//     subscriptionController.getUserSubscriptions
// );
// router.delete("/subscriptions/:subscriptionId", 
//     authMiddleware.authenticateToken, 
//     subscriptionController.cancelSubscription
// );


module.exports = router;