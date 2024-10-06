import { Router } from "express";
import healthController from "../controllers/health.js";

const router = Router();

router.get("/", healthController.getHealth);
router.post("/", healthController.postHealth);
router.post("/register", authController);

export default router;
