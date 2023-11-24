import process from 'process';
import { store } from './mysqlSession.js';
export const session_option = {
	secret: process.env["session_salt"]||"AMUSOGUM",
	resave: false,
	saveUninitialized: false,
	cookie: {
		sameSite: false,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60*60*100000,
		httpOnly: true,
	},
	store
};