import { Router } from "express";
import userAuth from "./controller/Auth/userAuth.js";
import passport from "passport";
import { displayMainPage,displayPolicy,displayWritePage,displayFileWritePage } from "./controller/mainPage.js";
import { isLoginState , isNotLoginState} from './middleware/Auth/loginState.js';
import fileController from './controller/Content/userFile.js';
import { loadMyPage,loadUserPage,loadSetting } from "./controller/Post/loadPage.js";
import { searchingPeopleRouter } from "./controller/searching.js";
import { changeProfile } from "./controller/Member/social.js";
import socialRouter from './controller/Member/social.js';
import { loadPost,uploadPost } from "./controller/Post/posts.js";
import { posterUploader } from "./utils/multerUploader.js";


const appRouter = Router();
appRouter.get('/',displayMainPage);
appRouter.get('/policy',displayPolicy);
// 인증 관련 라우터
appRouter.use('/auth',userAuth);
// 파일 업로드 라우터
appRouter.use('/file',fileController);
// 소셜 추가삭제 라우터
appRouter.use('/social',socialRouter);
appRouter.get('/myPage',isLoginState,loadMyPage);
appRouter.post('/changeProfile',isLoginState,changeProfile);
appRouter.get('/write',displayWritePage);
appRouter.get('/writebyfile',displayFileWritePage);
appRouter.get('/setting',isLoginState,loadSetting);
appRouter.get('/search',searchingPeopleRouter);
appRouter.get('/page/:userId',loadUserPage);
appRouter.get('/post/:postId',loadPost);
appRouter.post('/post/upload',isLoginState,posterUploader.single('post'),uploadPost);

export default appRouter;