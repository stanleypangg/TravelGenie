import type { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    // default handler
    res.status(err.status || 500).json({
        error: err.message || "500 Interal Error"
    });
}