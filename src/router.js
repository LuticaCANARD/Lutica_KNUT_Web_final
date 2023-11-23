import { Router } from "express";
import userAuth from "./controller/Auth/userAuth.js";
import passport from "passport";
import { displayMainPage } from "./controller/mainPage.js";


const appRouter = Router();
appRouter.use('/auth',userAuth);
appRouter.get('/',displayMainPage);
appRouter.get('/myPage',displayMainPage);


export default appRouter;