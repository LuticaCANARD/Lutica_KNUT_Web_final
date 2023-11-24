
/**
 * 여기에는 현재 로그인 한 상태인지 아닌지를 판단하는 함수를 담음.
 */

/**
 * 
 * @param {Request} req 
 * @returns 
 */
export const isLoginState = (req,res,next) => {
	if(req.session?.passport?.user) console.log('pp');
};

export const isNotLoginState = () => {

};