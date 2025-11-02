import { Router } from "express";
import { authenticateToken } from "#middlewares/authMiddleware";
import subscriptionController from "#controllers/subscriptionController";

const subscriptionRouter = Router();

subscriptionRouter.post("/subscribe", authenticateToken, subscriptionController.create);

subscriptionRouter.get("/", authenticateToken, subscriptionController.getAll);

export default subscriptionRouter;
