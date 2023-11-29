import {searchingPeople} from '../model/searching.js';

export const searchingPeopleRouter = async(req,res,next) =>{
	const data = searchingPeople(req.query["search"]);
	res.render('search.ejs',data);
};