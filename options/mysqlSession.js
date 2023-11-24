import MySQLStore from "express-mysql-session";
import session from 'express-session';
import { db } from '../src/utils/mysqldb.js';
const store_ = MySQLStore(session);
export const store = new store_({
	createDatabaseTable: false,
	schema: {
		tableName: 'Session',
		columnNames: {
			session_id: 'sid',
			expires: 'expire',
			data: 'data'
		}
	}
},db);