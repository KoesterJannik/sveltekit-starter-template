import { BCRYPT_SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } from '$env/static/private';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const hashPassword = async (password: string): Promise<string> => {
	const SALT = Number(BCRYPT_SALT_ROUNDS);
	return await bcrypt.hash(password, SALT);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
	return await bcrypt.compare(password, hash);
};

export const signToken = (payload: any): string => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
export const verifyToken = (token: string): any => {
	return jwt.verify(token, JWT_SECRET);
};
