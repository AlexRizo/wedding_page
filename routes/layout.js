import { Router } from "express";
import { getLayouts, getDemoLayout } from "../controllers/layoutController.js";

const router = Router();

router.get('/getall', getLayouts);

router.get('/demo/:id', getDemoLayout);

export default router;