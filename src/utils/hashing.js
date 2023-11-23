import pkg from 'crypto-js';
const { SHA256 } = pkg;
import dotenv from 'dotenv';

dotenv.config();


export const SHA256hashing = (origin) => {
	//    const salt = process.env.pw_salt;
	const hash = SHA256(origin).toString();
	return hash;
};