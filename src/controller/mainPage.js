import { render } from "ejs";
import { loadSocialPage,loadPictureList } from "../model/Post/loadPage.js";
/**
 * 메인페이지를 보여주는 라우터입니다.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const displayMainPage = (req,res,next) =>{
	let posts = [];
	if(req.session?.passport?.user){ 
		// 로그인 된 상태라면, 친구들의 게시글을 불러온다.
		posts = loadSocialPage(req.session?.passport?.user,Number(req.query["page"])?Number(req.query["page"]):0,3);
		const aa = loadPictureList([1,2,3]);
	} 		
	res.render('main.ejs',{
		col:req.session,
		posts
	});

};

export const displayPolicy = (req,res,next) =>{
	res.render('static/policy_pp.ejs');
};