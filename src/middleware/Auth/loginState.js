
/**
 * 여기에는 현재 로그인 한 상태인지 아닌지를 판단하는 함수를 담음.
 */

/**
 * 로그인인 상태인 경우에만 next 호출하는 미들웨어
 * @param {Request} req 
 * @param {Response} res
 * @param {NextFunction} next
 * @returns 
 */
export const isLoginState = (req,res,next) => {
	if(!req.session?.passport?.user) {
		res.redirect('/');
		return;
	}
	next();
};
/**
 * 로그인이 아닌 상태인 경우에만 next 호출하는 미들웨어
 * @param {Request} req 
 * @param {Response} res
 * @param {NextFunction} next
 * @returns 
 */
export const isNotLoginState = (req,res,next) => {

	if(req.session?.passport?.user) {
		res.redirect('/MyPage');
		return;
	}
	next();
};