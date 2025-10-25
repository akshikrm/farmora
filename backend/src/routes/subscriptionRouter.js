import { Router } from "express";
import { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage, createSubscription } from "#controllers/subscriptionController";
import { authenticateToken, verifyAdmin } from "#middlewares/authMiddleware";
import { validatePackage } from "#validators/packageValidator";

const router = Router();

router.post("/packages",
	authenticateToken,
	verifyAdmin,
	validatePackage,
	createPackage
);
router.get("/packages",
	getAllPackages
);
router.get("/packages/:id",
	getPackageById
);
router.put("/packages/:id",
	authenticateToken,
	verifyAdmin,
	validatePackage,
	updatePackage
);
router.delete("/packages/:id",
	deletePackage
);

router.post("/subscribe",
	authenticateToken,
	createSubscription
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
