import { Router } from "express";
import subscriptionController from "#controllers/subscriptionController";
import { authenticateToken, verifyAdmin } from "#middlewares/authMiddleware";
import validatePackage from "#validators/packageValidator";

const router = Router();

router.post("/packages",
	authenticateToken,
	verifyAdmin,
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
	authenticateToken,
	verifyAdmin,
	validatePackage,
	subscriptionController.updatePackage
);
router.delete("/packages/:id",
	subscriptionController.deletePackage
);

router.post("/subscribe",
	authenticateToken,
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


export default router;
