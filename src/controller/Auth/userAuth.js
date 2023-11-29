import { Router } from "express";
import * as model from '../../model/Auth/user.js';
import passport from 'passport';
import { render } from "ejs";
import { SHA256hashing } from "../../utils/hashing.js";
import {isLoginState,isNotLoginState} from '../../middleware/Auth/loginState.js';

/**
 * 유저의 로그인을 위한 진입점.
	* @param {Request} req 
	* @param {Response} res 
	* @param {NextFunction} next 
 */
const tryToLogin = async(req,res,next) =>{
	res.render('login.ejs');
};

/**
 * 유저의 회원가입을 위한 진입점.
	* @param {Request} req 
	* @param {Response} res 
	* @param {NextFunction} next 
 */
const tryToRegister= async(req,res,next) =>{
	res.render('register.ejs');
};
/**
* 유저의 가입을 처리하는 라우터입니다.
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const userRegister = async(req,res,next) =>{
	const id = req.body["loginId"];
	if(id==''){
		// 아이디가 비었다.
		res.redirect('/auth/register');
		return;
	}
	const exists_id = await model.getUserIDIsAlreadyExists(id);
	if(exists_id == true) {
		res.status(409).json({
			"msg" : "이미 존재하는 ID입니다.",
			"code" : 1
		});
		return;
	}

	const exists_email = await model.getUserEmailIsAlreadyExists(req.body["email"]);
	if(exists_email == true) {
		res.status(409);
		res.json({
			"msg" : "이미 존재하는 이메일입니다.",
			"code" : 2
		});
		return;
	}
	const pw = SHA256hashing(req.body["password"]);
	console.log(pw);
	const register_result = await model.insertUserTable(id,req.body["email"],pw,req.body["nickname"]);
	if(!register_result) {
		res.status(500);
		res.json({
			"msg" : "서버오류로 가입에 실패하였습니다!",
			"code" : 3
		});
		return;
	}
	//const my = await model.tryUserLogin(id,pw);
	next();

};

/**
* 유저의 로그아웃을 처리하는 라우터입니다.
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const userLogout = async(req,res,next) =>{
	req.logout(()=>{
		res.redirect('/');
	});
	
};

/**
* 유저의 인증에 관한 엔드포인트를 다루는 라우터.
*/
const userAuth = Router();
// 이하는 모두 로그인 상태가 아닐때에만 처리되어야 하는 엔드포인트들이다.
userAuth.get('/login',isNotLoginState, tryToLogin);
userAuth.post('/login',isNotLoginState, passport.authenticate('local', { 
	successRedirect: '/myPage', failureRedirect: '/auth/login' 
}));
userAuth.get('/register',isNotLoginState,tryToRegister);
userAuth.post('/register',isNotLoginState,userRegister,
	passport.authenticate('local', { 
		successRedirect: '/myPage', failureRedirect: '/auth/login' 
	})
);
// 이하는 로그인 상태에서만 처리되어야하는 엔드포인트이다.
userAuth.get('/logout',isLoginState,userLogout);
userAuth.delete('/logout',isLoginState,userLogout); // 함수에 의해서 호출되면 사용.

export default userAuth;