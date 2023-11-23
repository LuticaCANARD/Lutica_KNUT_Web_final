import { createPool } from 'mysql2'; // do not use 'mysql2/promises'!
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

export const db = createPool(process.env["DATABASE_URL"]);