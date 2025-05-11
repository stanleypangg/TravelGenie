import { Router } from "express";
import * as authController from "../controllers/authController"
import { validateBody } from "../middlewares/validate";
import { RegisterSchema } from "../schemas/auth";

const router = Router();

router.post(
    '/register', 
    validateBody(RegisterSchema),
    authController.register
);

export default router;