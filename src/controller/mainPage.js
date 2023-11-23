import { render } from "ejs";
/**
 * 메인페이지를 보여주는 라우터입니다.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const displayMainPage = (req,res,next) =>{
	console.log(req.session);

	res.render('main.ejs',{col:req.session});
};