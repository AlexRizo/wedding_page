import { Router } from "express";
import { createOrder, orderHome, completeOrder, uploadFiles, continueOrder } from "../controllers/orderController.js";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { check } from "express-validator";
import validateExpress from "../middlewares/validateExpress.js";

const router = Router();

router.get('/', orderHome);

router.get('/complete/:uid/:serial_number', completeOrder);

router.post('/create/api-weddp', [
    jsonWebTokenMiddleware,

    check('serial_number', 'serial_number is null').not().isEmpty(),
    check('description', 'description lenght is too long').isLength({max: 200}),
    check('status', 'status invalid').isBoolean(),

    validateExpress
], createOrder);

router.put('/continue/:orderId', [
    jsonWebTokenMiddleware,

    check('boyfriend_name', 'boyfriend_name lenght is too long').isLength({max: 50}),

    check('girlfriend_name', 'girlfriend_name lenght is too long').isLength({max: 50}),

    check('boyfriend_email', 'boyfriend_email lenght is too long').isLength({max: 50}),


    check('girlfriend_email', 'girlfriend_email length is too long').isLength({max: 50}),

    check('wedding_date', 'wedding_date lenght is too long').isLength({max: 10}),

    check('godfather', 'godfather lenght is too long').isLength({max: 50}),

    check('godmother', 'godmother lenght is too long').isLength({max: 50}),

    check('boyfriend_father', 'boyfriend_father lenght is too long').isLength({max: 50}),

    check('boyfriend_mother', 'boyfriend_mother lenght is too long').isLength({max: 50}),

    check('girlfriend_father', 'girlfriend_father lenght is too long').isLength({max: 50}),

    check('girlfriend_mother', 'girlfriend_mother lenght is too long').isLength({max: 50}),

    check('church', 'church lenght is too long').isLength({max: 50}),

    check('church_date', 'church_time lenght is too long').isLength({max: 10}),

    check('church_location', 'church_location lenght is too long').isLength({max: 100}),

    check('church_references', 'church_references lenght is too long').isLength({max: 200}),

    check('event', 'event lenght is too long').isLength({max: 50}),

    check('event_date', 'event_time lenght is too long').isLength({max: 10}),

    check('event_location', 'event_location lenght is too long').isLength({max: 100}),

    check('event_references', 'event_references lenght is too long').isLength({max: 200}),

    check('men_clothes', 'men_clothes lenght is too long').isLength({max: 100}),

    check('women_clothes', 'women_clothes lenght is too long').isLength({max: 100}),

    check('considerations', 'considerations lenght is too long').isLength({max: 200}),

    check('gif_link', 'gif_link lenght is too long').isLength({max: 100}),

    check('bank', 'bank lenght is too long').isLength({max: 24}),

    check('history', 'history lenght is too long').isLength({max: 5000}),

    check('stepId', 'stepId is null').not().isEmpty(),
    check('orderId', 'orderId is null').not().isEmpty(),

    validateExpress
], continueOrder);

router.post('/image/upload', [
    jsonWebTokenMiddleware,
    check('orderId', 'orderId is null').not().isEmpty(),
    validateExpress,
], uploadFiles);

export default router;