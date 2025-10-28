import { Router } from "express";
import { authenticateToken, } from "#middlewares/authMiddleware";
import asyncHandler from "#utils/async-handler";
import subscriptionController from "#controllers/subscriptionController";

const subscriptionRouter = Router();

subscriptionRouter.post("/subscribe",
	authenticateToken,
	asyncHandler(subscriptionController.create)
);

subscriptionRouter.get("/",
	authenticateToken,
	subscriptionController.getAll
);

// subscriptionRouter.delete("/:subscriptionId",
// 	authenticateToken,
// 	subscriptionController.cancelSubscription
// );


export default subscriptionRouter;
