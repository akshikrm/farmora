import { Router } from "express";
import packageController from "#controllers/package.controller";
import { authenticateToken, verifyAdmin } from "#middlewares/auth.middleware";
import validatePackage from "#validators/package.validator";

const router = Router();

router.post("/", authenticateToken, verifyAdmin, validatePackage, packageController.create);

router.get("/", packageController.getAll);

router.get("/:package_id", packageController.getById);

router.put("/:package_id", authenticateToken, verifyAdmin, validatePackage, packageController.updateById);

router.delete("/:package_id", packageController.deleteById);

export default router;
