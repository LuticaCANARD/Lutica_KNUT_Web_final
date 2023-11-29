import { db,db_common } from '../utils/mysqldb.js';


export const searchingPeople = async(usernick,me) =>{
	const ret =  await db.query('SELECT mainDesc,nickname,mainProfilePicture,mainTitlePicture,id FROM user WHERE nickname LIKE ? AND id!= ? AND id NOT IN (SELECT targetId FROM Social WHERE followerId=?)  ',['%'+usernick+'%',me,me]);
	return ret[0];
};

export const searchingRandomPeople = async(myid,limit) =>{
	const ret =  await db.query('SELECT mainDesc,nickname,mainProfilePicture,mainTitlePicture,id FROM user WHERE id != ? AND id NOT IN (SELECT targetId FROM Social WHERE followerId=?) ORDER BY rand() Limit ? ',[myid,myid,limit]);
	return ret[0];
};