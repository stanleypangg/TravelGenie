import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from "../db";
import { RegisterDTO } from '../schemas/auth';

export const createUser = async (body: RegisterDTO) {
    {
        const { username, email, password } = body;
        const hashedPassword = bcrypt.hash(password, 10);
        const db = getDb();
    }
}