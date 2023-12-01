import { loadUserPosts,loadUserMain,loadPictureList } from "../../model/Post/loadPage.js";

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
	const posts_ids = [];
	posts.map(id=>{posts_ids.push(id['id']);});
	const postPic  = await loadPictureList(posts_ids);
	const info = await loadUserMain(idPass,idPass);
	res.render('userPage.ejs',{info,posts,mypage:true,postPic});
};
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const loadUserPage = async(req,res,next) =>{
	const idPass = req.params.userId;
	const myId = req?.session?.passport?.user;
	const posts = await loadUserPosts(idPass,0,10);
	const posts_ids = [];
	posts.map(id=>{
		posts_ids.push(id['id']);
	});
	const postPic  = await loadPictureList(posts_ids);
	const info = await loadUserMain(idPass,myId);
	res.render('userPage.ejs',{
		info,
		posts,postPic,
		mypage : idPass===req.session?.passport?.user, // 내 id를 불러왔을떄 내 page를 불러오는 것과 동일하게 하고 끝낸다.
		myId
	});
};
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const loadSocialPage = async(req,res,next) =>{

};
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const loadSetting = async(req,res,next) =>{
	const idPass = req.session.passport.user;
	const info = await loadUserMain(idPass,idPass);
	res.render('pageSetting.ejs',{info});
};