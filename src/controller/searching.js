import {searchingPeople,searchingRandomPeople} from '../model/searching.js';

/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const searchingPeopleRouter = async(req,res,next) =>{
	const data = await searchingPeople(req.query["keyword"],req.session?.passport?.user);
	const randomData = await searchingRandomPeople(req.session?.passport?.user,10);
	res.render('search.ejs',{data,randomData});
};