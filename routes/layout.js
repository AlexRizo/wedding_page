import { Router } from "express";
import { getLayouts, getDemoLayout, getLayoutsPage } from "../controllers/layoutController.js";

const router = Router();

router.get('/get-all', getLayouts);

router.get('/demo/:id', getDemoLayout);

router.get('/select', getLayoutsPage)

export default router;