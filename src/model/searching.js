import { db,db_common } from '../utils/mysqldb.js';


export const searchingPeople = async(usernick) =>{
	const ret =  await db.query('SELECT mainDesc,nickname,mainProfilePicture,mainTitlePicture,id FROM user WHERE nickname LIKE ? ',['%'+usernick+'%']);
	return ret[0];
};