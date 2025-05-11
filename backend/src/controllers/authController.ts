import type { Request, Response, NextFunction } from "express";
import { LoginDTO, RegisterDTO } from "../schemas/auth";
import { createUser, loginUser } from "../services/authService";

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

export const login = async (
    req: Request<{}, {}, LoginDTO>, res: Response, next: NextFunction
): Promise<void> => {
    try {
        const userLogin = await loginUser(req.body);
        res.status(200).json(userLogin);
    } catch (err) {
        next(err);
    }
}