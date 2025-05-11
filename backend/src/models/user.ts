import { ObjectId } from "mongodb";

export interface DBUser {
    _id: ObjectId,
    username: String,
    password: String,
    email: String,
    createdAt: Date
};

export type NewUser = Omit<DBUser, '_id'>;

export interface PublicUser {
    id: String,
    username: String,
    email: String,
    createdAt: Date
};

export interface UserLogin {
    token: String,
    user: PublicUser
};