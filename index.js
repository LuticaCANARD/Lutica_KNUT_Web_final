import express from "express";
import BodyParser from'body-parser';
import dotenv from 'dotenv'; 
import session from 'express-session';
import { createServer } from "http";
import process from 'process';
import cors from "cors";
import passport from "passport";
import MySQLStore from "express-mysql-session";
import { db } from './src/utils/mysqldb.js';
import fs from 'fs';
import appRouter from './src/router.js';
import passportConfig from './src/middleware/passport/index.js';
passportConfig();
dotenv.config(); //환경설정.

try{
	fs.readdirSync('upload');
}catch(err){
	console.log('upload폴더가 없어 생성합니다.');
	fs.mkdirSync('upload');
}

const app = express();
app.use(express.json());
app.use(express.static('static'));
app.use(BodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views', 'view');
app.use(cors({
	credentials: true
}));
const store_ = MySQLStore(session);
const store = new store_({
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
const session_option = {
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
app.use(session(session_option));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',appRouter);

const server = createServer(app);
server.listen(process.env["port"]||3000,()=>{
	console.log(`Server running on http://localhost:${process.env["port"]||3000}`);
});
