import { Router } from "express";
import { deleteFiles } from "../controllers/cloudinaryController.js";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { check } from "express-validator";
import validateExpress from "../middlewares/validateExpress.js";

const router = Router();

router.delete('/images/delete', [
    // jsonWebTokenMiddleware,
    check('images', 'campo vacío').not().isEmpty(),
    check('images', 'campo inválido').isArray(),
    validateExpress
], deleteFiles);

export default router;