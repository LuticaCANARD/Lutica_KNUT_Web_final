import * as model from '../model/Post/posts.js';
import { loadPictureList } from '../model/Post/loadPage.js';
/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const loadTimeTableMap = async(req,res,next) =>{
	const startDate = new Date();
	const endDate = new Date();

	startDate.setTime((!Number.isNaN(req.query.start) && req.query.start) ? req.query.start : startDate.getTime());
	endDate.setTime((!Number.isNaN(req.query.end)  && req.query.end) ? req.query.end : endDate.getTime());
	const delta = !Number.isNaN(req.query?.delta) && req.query?.delta ? req.query?.delta : 0; //DB와 지금의 차이.
	startDate.setTime(startDate.getTime() - delta*1000*60);
	endDate.setTime(endDate.getTime() - delta*60*1000);
	const posts = await model.searchingPostByDate(startDate,endDate);
	const posts_ids = [];
	const meta_ = {};
	posts.map(id=>{
		posts_ids.push(id['id']);
		meta_[id['nickname']] = true;
	});
	const meta = Object.keys(meta_);
	const postPic  = await loadPictureList(posts_ids);
	
	const ret = {
		start : startDate,
		end : endDate,
		posts,
		postPic,
		meta
	};
	res.render('timetable.ejs',{ret});
};

/**
* 
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
export const loadTimeStat = async(req,res,next) =>{
	const startDate = new Date(); //NOW()
	const endDate = new Date();
	startDate.setTime((req.query.date) ? Date.parse(req.query.date) : startDate.getTime());
	endDate.setTime(( req.query.date) ? Date.parse(req.query.date) : endDate.getTime());	
	const delta = !Number.isNaN(req.query?.delta) && req.query?.delta ? req.query?.delta : 0; 
	startDate.setTime(startDate.getTime() - delta*1000*60 - 24*60*60*1000);
	endDate.setTime(endDate.getTime() - delta*60*1000 );
	const posts = await model.searchingPostByDate(startDate,endDate);
	const meta_ = {};
	posts.map(id=>{
		meta_[id['nickname']] = true;
	});
	const meta = Object.keys(meta_);
	const ret = {posts,meta};
	res.render('timeStat.ejs',{ret});
	
};