import { Request, Response } from "express";
import { RegisterDTO } from "../schemas/auth";
import { createUser } from "../services/authService";

export const register = async (
    req: Request<{}, {}, RegisterDTO>, res: Response
): Promise<void> => {
    try {
        const newUser = createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed '});
    }
}  