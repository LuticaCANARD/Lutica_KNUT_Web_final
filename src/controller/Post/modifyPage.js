// 포스트를 작성하고, 삭제, 수정하는것을 담당.

import {db} from '../../utils/mysqldb.js';


/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const savePostByPlain = async(req,res,next) =>{
	
	res.redirect('/MyPage');
};
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const savePostByFile = async(req,res,next) =>{
	res.redirect('/MyPage');
};
