import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from "../db";
import { LoginDTO, RegisterDTO } from '../schemas/auth';
import { DBUser, NewUser, PublicUser, UserLogin } from '../models/user';
import { ConflictError, UnauthorizedError, UserNotFoundError } from '../errors';

const JWT_SECRET = process.env.JWT_SECRET!;  

export const createUser = async (body: RegisterDTO): Promise<PublicUser> => {
    const { username, email, password } = body;
    const db = getDb();

    // check if user already exists
    const existing = await db
        .collection<NewUser>('users')
        .findOne({
            $or: [
                { username },
                { email }
            ]
        });
    if (existing) {
        throw new ConflictError('Username or email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, email, createdAt: new Date() }
    const result = await db
        .collection<NewUser>('users')
        .insertOne(newUser);

    return {
        id: result.insertedId.toHexString(),
        username,
        email,
        createdAt: newUser.createdAt,
    }
}

export const loginUser = async (body: LoginDTO): Promise<UserLogin> => {
    const { username, password } = body;
    const db = getDb();

    const user = await db
        .collection('users')
        .findOne({ username }) as DBUser | null;

    if (!user) {
        throw new UserNotFoundError();
    }

    // authenticate user
    const isPasswordValid = await bcrypt.compare(password, user.password.toString());
    if (!isPasswordValid) {
        throw new UnauthorizedError();
    }

    const token = jwt.sign(
        { sub: user._id },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user._id.toHexString(),
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }
    };
}