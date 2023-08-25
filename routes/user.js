import { Router } from "express";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { check } from "express-validator";
import validateExpress from "../middlewares/validateExpress.js";
import { emailValidation, roleValidation, teamValidation } from "../helpers/validations.js";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.post('/create', [
    jsonWebTokenMiddleware,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El correo es obligatorio.').not().isEmpty(),
    check('email', 'El correo no es válido.').isEmail(),
    check('email').custom(emailValidation),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('roleId', 'El rol no es válido.').isNumeric(),
    check('roleId').custom(roleValidation),
    validateExpress
], createUser)

export default router;