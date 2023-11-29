import { render } from "ejs";
import { loadSocialPage,loadPictureList } from "../model/Post/loadPage.js";
/**
 * 메인페이지를 보여주는 라우터입니다.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const displayMainPage = async (req,res,next) =>{
	if(req.session?.passport?.user){ 
		const myno =req.session?.passport?.user;
		// 로그인 된 상태라면, 친구들의 게시글을 불러온다.
		const posts = await loadSocialPage(myno,Number(req.query["page"])?Number(req.query["page"])*3:0,3);
		const idList = [];
		posts.map(po=>idList.push(po["id"]));
		if(idList.length==0){
			res.render('mypage.ejs',{col:req.session,posts});
			return;
		}
		const postPic = await loadPictureList(idList);
		res.render('mypage.ejs',{col:req.session,posts,postPic});
	} else res.render('main.ejs',{col:req.session});
	
	

};
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const displayPolicy = (req,res,next) =>{
	res.render('static/policy_pp.ejs');
};
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const displayWritePage = (req,res,next) =>{
	res.render('write.ejs');

};
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const displayFileWritePage = (req,res,next) =>{
	res.render('filewrite.ejs');
};