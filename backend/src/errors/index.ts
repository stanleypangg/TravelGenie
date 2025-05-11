import { AppError } from "./AppError";

export class ConflictError extends AppError {
    constructor(message = 'Resource already exists') {
        super(message, 400);
    }
}

export class UserNotFoundError extends AppError {
    constructor(message = 'User not found') {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'User authorization failed') {
        super(message, 401);
    }
}