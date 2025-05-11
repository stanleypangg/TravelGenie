import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
    }

    console.log('Unhandled Error!');
    res.status(err.status || 500).json({
        error: err.message || "500 Interal Error"
    });
}