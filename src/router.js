import { Router } from "express";
import userAuth from "./controller/Auth/userAuth.js";
import passport from "passport";
import { displayMainPage,displayPolicy } from "./controller/mainPage.js";
import { isLoginState , isNotLoginState} from './middleware/Auth/loginState.js';
import fileController from './controller/Content/userFile.js';
import { loadMyPage,loadUserPage,loadSetting } from "./controller/Post/loadPage.js";


const appRouter = Router();
appRouter.get('/',displayMainPage);
appRouter.get('/policy',displayPolicy);
// 인증 관련 라우터
appRouter.use('/auth',userAuth);
// 파일 업로드 라우터
appRouter.use('/file',fileController);
appRouter.get('/myPage',isLoginState,loadMyPage);
appRouter.get('/setting',isLoginState,loadSetting);
appRouter.get('/search',loadSetting);
appRouter.get('/page/:userId',loadUserPage);

export default appRouter;