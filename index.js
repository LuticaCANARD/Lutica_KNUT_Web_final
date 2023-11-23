import express from "express";
import BodyParser from'body-parser'
import dotenv from 'dotenv' 
import session from 'express-session'
import { createServer } from "http";
import serverless from "serverless-http";
import cors from "cors";
import passport from "passport";
import MySQLStore from "express-mysql-session";
import {db} from './src/utils/mysqldb.js'

dotenv.config() //...

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true
}));
app.use(express.Router());
app.use(BodyParser.urlencoded({
  extended: true
}));
const store =  MySQLStore(session)
const sessionStore= new store({
    secret: process.env["session_salt"]||"AMUSOGUM",
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000,
        httpOnly: true,
        },
        createDatabaseTable: false,
        schema: {
            tableName: 'custom_sessions_table_name',
            columnNames: {
                session_id: 'custom_session_id',
                expires: 'custom_expires_column_name',
                data: 'custom_data_column_name'
            }
        }
    },db)
app.use(passport.initialize());
app.use(passport.session()); 
app.get('/',(req,res,next)=>{
    res.send('hi');
})

if(process.env["develop"]||process.env["cloude"]){
    const server = createServer(app)
    server.listen(process.env["port"]||3000,()=>{
        console.log(`Server running on http://localhost:${process.env["port"]||3000}`);
    })
}

// netlify 배포용
export const handler = serverless(app);



