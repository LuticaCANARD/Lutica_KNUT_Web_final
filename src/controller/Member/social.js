import {db} from '../../utils/mysqldb.js';

export const changeProfile = async(req,res,next) => {
	await db.query("UPDATE user SET nickname=?,maindesc=? WHERE id=?",[req.body["nick"],req.body["desc"],req.session?.passport?.user]);
	res.redirect('/setting');
};