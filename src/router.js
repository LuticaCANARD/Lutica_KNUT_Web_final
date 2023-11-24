import { Router } from "express";
import userAuth from "./controller/Auth/userAuth.js";
import passport from "passport";
import { displayMainPage } from "./controller/mainPage.js";
import { isLoginState , isNotLoginState} from './middleware/Auth/loginState.js';
import fileController from './controller/Content/userFile.js';

const appRouter = Router();
appRouter.use('/auth',userAuth);
appRouter.use('/file',fileController);
appRouter.get('/',displayMainPage);
appRouter.get('/myPage',isLoginState,displayMainPage);

export default appRouter;