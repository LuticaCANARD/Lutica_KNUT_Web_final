import process from 'process';
import { store } from './mysqlSession.js';
export const session_option = {
	secret: process.env["session_salt"]||"AMUSOGUM",
	resave: true,
	saveUninitialized: false,
	cookie: {
		sameSite: false,
		//		secure: true,
		maxAge: 60*60*100000,
		httpOnly: true,
	},
	store
};