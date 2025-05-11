import { Router } from "express";
import * as authController from "../controllers/authController"
import { validateBody } from "../middlewares/validate";
import { LoginSchema, RegisterSchema } from "../schemas/auth";

const router = Router();

router.post(
    '/register', 
    validateBody(RegisterSchema),
    authController.register
);

router.post(
    '/login',
    validateBody(LoginSchema),
    authController.login
);

export default router;