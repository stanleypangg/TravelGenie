import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.status).json({ 
            status: err.status,
            error: err.message,
            // TODO?: make more verbose
        });
    }

    console.log('Unhandled Error!');
    res.status(err.status || 500).json({
        error: err.message || "500 Interal Error"
    });
}