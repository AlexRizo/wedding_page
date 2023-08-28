import { Router } from "express";
import { createOrder, orderHome } from "../controllers/orderController.js";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { check } from "express-validator";

const router = Router();

router.get('/', orderHome);

router.post('/create/api-weddp', [
    jsonWebTokenMiddleware,
    check('serial_number', 'serial_number is null').not().isEmpty(),


    check('boyfriend_name', 'boyfriend_name is null').not().isEmpty(),
    check('boyfriend_name', 'boyfriend_name lenght is').isLength({max: 50}),


    check('girlfriend_name', 'girlfriend_name is null').not().isEmpty(),
    check('boyfriend_name', 'boyfriend_name lenght is').isLength({max: 50}),

    check('boyfriend_email', 'boyfriend_email is null').not().isEmpty(),
    check('boyfriend_name', 'boyfriend_name lenght is').isLength({max: 50}),

    check('girlfriend_email', 'girlfriend_email is null').not().isEmpty(),
    check('boyfriend_name', 'boyfriend_name lenght is').isLength({max: 50}),

    check('wedding_date', 'wedding_date is null').not().isEmpty(),
    check('boyfriend_name', 'boyfriend_name lenght is').isLength({max: 50}),

    check('godfather', 'godfather is null').not().isEmpty(),


    check('godmother', 'godmother is null').not().isEmpty(),


    check('boyfriend_father', 'boyfriend_father is null').not().isEmpty(),


    check('boyfriend_mother', 'boyfriend_mother is null').not().isEmpty(),


    check('girlfriend_father', 'girlfriend_father is null').not().isEmpty(),


    check('girlfriend_mother', 'girlfriend_mother is null').not().isEmpty(),


    check('church', 'church is null').not().isEmpty(),


    check('church_date', 'church_date is null').not().isEmpty(),


    check('church_turn', 'church_turn is null').not().isEmpty(),


    check('church_location', 'church_location is null').not().isEmpty(),


    check('church_references', 'church_references is null').not().isEmpty(),


    check('event', 'event is null').not().isEmpty(),


    check('event_date', 'event_date is null').not().isEmpty(),


    check('event_turn', 'event_turn is null').not().isEmpty(),


    check('event_location', 'event_location is null').not().isEmpty(),


    check('event_references', 'event_references is null').not().isEmpty(),


    check('men_clothes', 'men_clothes is null').not().isEmpty(),


    check('women_clothes', 'women_clothes is null').not().isEmpty(),


    check('considerations', 'considerations is null').not().isEmpty(),


    check('gif_link', 'gif_link is null').not().isEmpty(),


    check('bank', 'bank is null').not().isEmpty(),


    check('history', 'history is null').not().isEmpty(),


    check('stepId', 'stepId is null').not().isEmpty(),


], createOrder);

export default router;