import {searchingPeople} from '../model/searching.js';

export const searchingPeopleRouter = async(req,res,next) =>{
	const data = await searchingPeople(req.query["keyword"]);
	res.render('search.ejs',{data});
};