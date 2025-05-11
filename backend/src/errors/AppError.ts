export class AppError extends Error {
    public readonly status: number;
    public readonly isOperational = true;

    constructor(message: string, status = 500) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}