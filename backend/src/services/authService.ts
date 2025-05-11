import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from "../db";
import { RegisterDTO } from '../schemas/auth';
import { NewUser, PublicUser } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (body: RegisterDTO): Promise<PublicUser> => {
    {
        const { username, email, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword, email, createdAt: new Date() }
        const db = getDb();
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
}