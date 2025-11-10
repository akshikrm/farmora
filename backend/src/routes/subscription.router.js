import { Router } from "express";
import { authenticateToken } from "#middlewares/auth.middleware";
import subscriptionController from "#controllers/subscription.controller";

const subscriptionRouter = Router();

subscriptionRouter.post("/subscribe", authenticateToken, subscriptionController.create);

subscriptionRouter.get("/", authenticateToken, subscriptionController.getAll);

export default subscriptionRouter;
