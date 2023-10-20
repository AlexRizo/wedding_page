import { Router } from "express";
import { getLayouts, getDemoLayout, getLayoutsPage } from "../controllers/layoutController.js";

const router = Router();

router.get('/getall', getLayouts);

router.get('/demo/:id', getDemoLayout);

router.get('/select', getLayoutsPage)

export default router;