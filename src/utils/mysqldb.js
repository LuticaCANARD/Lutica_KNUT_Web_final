import mysql2 from 'mysql2/promise';
import mysql2_ from 'mysql2';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

/**
 * 동기가 마음편하고 경험도 많으니 동기를 중심으로.
 */
export const db = mysql2.createPool(process.env["DATABASE_URL"]);

/**
 * .then() 방식의 callback 기반은 불편하니 최악의 경우에만.
 */
export const db_common = mysql2_.createPool(process.env["DATABASE_URL"]);