import { Router } from "express";
import healthController from "../controllers/health.js";
import authController from "../controllers/register.js";

const router = Router();

router.get("/", healthController.getHealth);
router.post("/", healthController.postHealth);
router.post("/register", authController.registerClient);

export default router;
