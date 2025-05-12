import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function validateAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError("No authorization header");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new UnauthorizedError("Malformed authorization header");
    }

    const token = parts[1];

    let payload: JwtPayload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
        throw new UnauthorizedError("Invalid or expired token");
    }

    if (!payload.sub || typeof payload.sub !== "string") {
        throw new UnauthorizedError("Invalid token payload");
    }

    req.user = { id: payload.sub };
    
    return next();
}   