import {uploadPostModel,loadPostModel} from '../../model/Post/posts.js';
import fs from 'fs';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
export const loadPost = async (req,res,next) =>{
	const id = req.params.postId;
	const post = await loadPostModel(id);
	res.render('postMain.ejs',post);
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
export const uploadPost = async (req,res,next) =>{


	const text_ = fs.readFileSync(`upload/${req.body["filename"]}`);
	const text = text_.toString('utf-8');
	const obj = JSON.parse(req.body["object"]??'{}');
	const userId = req.session?.passport?.user;
	fs.rmSync(`upload/${req.body["filename"]}`,{force: true});
	const ret = await uploadPostModel(userId,req.body["title"]??'',text,obj);

	console.log(ret);
	res.redirect('/post/'+ret.insertId);
};
