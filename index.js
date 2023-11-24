import express from "express";
import BodyParser from'body-parser';
import dotenv from 'dotenv'; 
import session from 'express-session';
import { createServer } from "http";
import process from 'process';
import cors from "cors";
import passport from "passport";
import fs from 'fs';
import appRouter from './src/router.js';
import passportConfig from './src/middleware/passport/index.js';
import { session_option } from "./options/session.js";
passportConfig();
dotenv.config(); //환경설정.

try{
	fs.readdirSync('upload');
}catch(err){
	console.log('upload폴더가 없어 생성합니다.');
	fs.mkdirSync('upload');
}

// 여기서는 서버의 환경설정과 필수적인 전처리를 담당한다. 
const app = express();
app.use(express.json());
app.use(express.static('static'));
app.use(BodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views', 'view');
app.use(cors({credentials: true}));
app.use(session(session_option));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',appRouter);

const server = createServer(app);
server.listen(process.env["port"]||3000,()=>{
	console.log(`Server running on http://localhost:${process.env["port"]||3000}`);
});
