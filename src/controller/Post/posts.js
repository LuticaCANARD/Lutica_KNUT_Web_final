import {uploadPostModel,loadPostModel} from '../../model/Post/posts.js';
import fs from 'fs';
import { cleanText } from '../../utils/text.js';
import DOMPurify from 'isomorphic-dompurify';
import { parse } from 'marked';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
export const loadPost = async (req,res,next) =>{
	const id = req.params.postId;
	const post = await loadPostModel(id);
	res.render('postMain.ejs',{post});
};
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
export const uploadPostWrite = async (req,res,next) =>{
	const text = req.body["desc"];
	const _text = parse(text);
	const parsedText = DOMPurify.sanitize(_text);
	const obj = JSON.parse(req.body["object"]??'{}');
	const userId = req.session?.passport?.user;
	const ret = await uploadPostModel(userId,req.body["title"]??'제목 없는 글',parsedText,obj,req.body["images"]);
	res.redirect('/post/'+ret.insertId);
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
	const _text = parse(text);
	const parsedText = DOMPurify.sanitize(_text);
	const userId = req.session?.passport?.user;
	fs.rmSync(`upload/${req.body["filename"]}`,{force: true});
	const ret = await uploadPostModel(userId,req.body["title"]??'제목 없는 글',parsedText,obj,req.body["images"]);
	res.redirect('/post/'+ret.insertId);
};

/**
 * 
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
export const exceptionHandlerOnUpload = (err,req,res,next) =>{
	res.redirect('/writebyfile');
};
