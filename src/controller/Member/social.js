import { Router } from 'express';
import {db} from '../../utils/mysqldb.js';
import { setFollow,deleteFollow } from '../../model/Member/social.js';
import { isLoginState } from '../../middleware/Auth/loginState.js';
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const changeProfile = async(req,res,next) => {
	await db.query("UPDATE user SET nickname=?,maindesc=? WHERE id=?",[req.body["nick"],req.body["desc"],req.session?.passport?.user]);
	res.redirect('/setting');
};


/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const followingUser = async(req,res,next) =>{
	const target = req.params.id;
	const my = req.session?.passport?.user;
	await setFollow(my,target);
	res.redirect('/page/'+target);

};


/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const unFollowingUser = async(req,res,next) =>{
	const target = req.params.id;
	const my = req.session?.passport?.user;
	await deleteFollow(my,target);
	res.redirect('/page/'+target);
};

const socialRouter = Router();
socialRouter.get('/following/:id',isLoginState,followingUser);
socialRouter.get('/unfollowing/:id',isLoginState,unFollowingUser);
export default socialRouter;