import { Router } from "express";
import { createOrder, orderHome, completeOrder } from "../controllers/orderController.js";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { check } from "express-validator";
import validateExpress from "../middlewares/validateExpress.js";

const router = Router();

router.get('/', orderHome);

router.get('/complete/:uid/:serial_number', completeOrder);

router.post('/create/api-weddp', [
    jsonWebTokenMiddleware,

    check('serial_number', 'serial_number is null').not().isEmpty(),
    check('description', 'description lenght is invalid').isLength({max: 200}),
    check('status', 'status invalid').isBoolean(),

    validateExpress
], createOrder);

router.post('/update/:id', [
    jsonWebTokenMiddleware,

    check('serial_number', 'serial_number is null').not().isEmpty(),

    check('boyfriend_name', 'boyfriend_name is null').not().isEmpty(),
    check('boyfriend_name', 'boyfriend_name lenght is invalid').isLength({max: 50}),

    check('girlfriend_name', 'girlfriend_name is null').not().isEmpty(),
    check('girlfriend_name', 'girlfriend_name lenght is invalid').isLength({max: 50}),

    check('boyfriend_email', 'boyfriend_email is null').not().isEmpty(),
    check('boyfriend_email', 'boyfriend_email lenght is invalid').isLength({max: 50}),
    check('boyfriend_email', 'boyfriend_email is invalid').isEmail(),

    check('girlfriend_email', 'girlfriend_email is null').not().isEmpty(),
    check('girlfriend_email', 'girlfriend_email lenght is invalid').isLength({max: 50}),
    check('girlfriend_email', 'boyfriend_email is invalid').isEmail(),

    check('wedding_date', 'wedding_date is null').not().isEmpty(),
    check('wedding_date', 'wedding_date lenght is invalid').isLength({max: 5}),

    check('godfather', 'godfather is null').not().isEmpty(),
    check('godfather', 'godfather lenght is invalid').isLength({max: 50}),

    check('godmother', 'godmother is null').not().isEmpty(),
    check('godmother', 'godmother lenght is invalid').isLength({max: 50}),

    check('boyfriend_father', 'boyfriend_father is null').not().isEmpty(),
    check('boyfriend_father', 'boyfriend_father lenght is invalid').isLength({max: 50}),

    check('boyfriend_mother', 'boyfriend_mother is null').not().isEmpty(),
    check('boyfriend_mother', 'boyfriend_mother lenght is invalid').isLength({max: 50}),

    check('girlfriend_father', 'girlfriend_father is null').not().isEmpty(),
    check('girlfriend_father', 'girlfriend_father lenght is invalid').isLength({max: 50}),

    check('girlfriend_mother', 'girlfriend_mother is null').not().isEmpty(),
    check('girlfriend_mother', 'girlfriend_mother lenght is invalid').isLength({max: 50}),

    check('church', 'church is null').not().isEmpty(),
    check('church', 'church lenght is invalid').isLength({max: 50}),

    check('church_date', 'church_date is null').not().isEmpty(),
    check('church_date', 'church_date lenght is invalid').isLength({max: 5}),

    check('church_turn', 'church_turn is null').not().isEmpty(),
    check('church_turn', 'church_turn lenght is invalid').isLength({max: 2}),

    check('church_location', 'church_location is null').not().isEmpty(),
    check('church_location', 'church_location lenght is invalid').isLength({max: 100}),

    check('church_references', 'church_references is null').not().isEmpty(),
    check('church_references', 'church_references lenght is invalid').isLength({max: 200}),

    check('event', 'event is null').not().isEmpty(),
    check('event', 'event lenght is invalid').isLength({max: 50}),

    check('event_date', 'event_date is null').not().isEmpty(),
    check('event_date', 'event_date lenght is invalid').isLength({max: 5}),

    check('event_turn', 'event_turn is null').not().isEmpty(),
    check('event_turn', 'event_turn lenght is invalid').isLength({max: 2}),

    check('event_location', 'event_location is null').not().isEmpty(),
    check('event_location', 'event_location lenght is invalid').isLength({max: 100}),

    check('event_references', 'event_references is null').not().isEmpty(),
    check('event_references', 'event_references lenght is invalid').isLength({max: 200}),

    check('men_clothes', 'men_clothes is null').not().isEmpty(),
    check('men_clothes', 'men_clothes lenght is invalid').isLength({max: 100}),

    check('women_clothes', 'women_clothes is null').not().isEmpty(),
    check('women_clothes', 'women_clothes lenght is invalid').isLength({max: 100}),

    check('considerations', 'considerations is null').not().isEmpty(),
    check('considerations', 'considerations lenght is invalid').isLength({max: 200}),

    check('gif_link', 'gif_link is null').not().isEmpty(),
    check('gif_link', 'gif_link lenght is invalid').isLength({max: 100}),

    check('bank', 'bank is null').not().isEmpty(),
    check('bank', 'bank lenght is invalid').isLength({max: 25}),

    check('history', 'history is null').not().isEmpty(),
    check('history', 'history lenght is invalid').isLength({max: 2000}),

    check('stepId', 'stepId is null').not().isEmpty(),
    check('userId', 'userId is null').not().isEmpty(),

    validateExpress
], createOrder);

export default router;