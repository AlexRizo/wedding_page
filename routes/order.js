import { Router } from "express";
import { orderHome } from "../controllers/orderController.js";

const router = Router();

router.get('/', orderHome);

export default router;