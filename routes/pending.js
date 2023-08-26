import { Router } from "express";
import { pendingHome } from "../controllers/pendingController.js";

const router = Router();

router.get('/', pendingHome);

export default router;