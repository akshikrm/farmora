import { Router } from "express";
import packageController from "#controllers/packageController";
import { authenticateToken, verifyAdmin } from "#middlewares/authMiddleware";
import validatePackage from "#validators/packageValidator";
import asyncHandler from "#utils/async-handler";

const router = Router();

router.post("/",
	authenticateToken,
	verifyAdmin,
	validatePackage,
	asyncHandler(packageController.create)
);
router.get("/",
	asyncHandler(packageController.getAll)
);
router.get("/:package_id",
	asyncHandler(packageController.getById)
);

router.put("/:package_id",
	authenticateToken,
	verifyAdmin,
	validatePackage,
	asyncHandler(packageController.update)
);
router.delete("/:package_id",
	asyncHandler(packageController.deletePackage)
);

// router.post("/subscribe",
// 	authenticateToken,
// 	subscriptionController.createSubscription
// );

// router.get("/subscriptions", 
//     authMiddleware.authenticateToken, 
//     subscriptionController.getUserSubscriptions
// );
// router.delete("/subscriptions/:subscriptionId", 
//     authMiddleware.authenticateToken, 
//     subscriptionController.cancelSubscription
// );


export default router;
