import type { Request, Response, NextFunction } from "express";
import { RegisterDTO } from "../schemas/auth";
import { createUser } from "../services/authService";

export const register = async (
    req: Request<{}, {}, RegisterDTO>, res: Response, next: NextFunction
): Promise<void> => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
}  