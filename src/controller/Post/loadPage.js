import { loadUserPosts,loadUserMain } from "../../model/Post/loadPage.js";

import passport from "passport";
// 포스트를 로드하고, 메인페이지를 로드하는등, 게시글을 읽는 것에 대한 모든걸 담당
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const loadMyPage = async(req,res,next) =>{
	const idPass = req.session.passport.user;
	const posts = await loadUserPosts(idPass,0,10);
	const info = await loadUserMain(idPass);
	res.render('userPage.ejs',{info,posts,mypage:true});
};

export const loadUserPage = async(req,res,next) =>{
	const idPass = req.params.userId;
	const posts = await loadUserPosts(idPass,0,10);
	const info = await loadUserMain(idPass);
	res.render('userPage.ejs',{
		info,
		posts,
		mypage : idPass===req.session?.passport?.user // 내 id를 불러왔을떄 내 page를 불러오는 것과 동일하게 하고 끝낸다.
	});
};

export const loadSocialPage = async(req,res,next) =>{

};