import { db,db_common } from '../utils/mysqldb.js';


export const searchingPeople = async(usernick) =>{
	return await db.query('SELECT nickname,mainProfilePicture,mainTitlePicture,id FROM user WHERE nickname LIKE ? ',[usernick])[0];
};