

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
export const loadPost = (req,res,next) =>{
	const id = req.params.postId;
	const post = {};
	res.render('postMain.ejs',post);
};