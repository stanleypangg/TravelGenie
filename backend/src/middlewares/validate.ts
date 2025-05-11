
import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export function validateBody<T extends ZodTypeAny>(schema: T) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ errors: result.error.format() });
        }
        req.body = result.data;
        next();
    }
}