
import { db } from "../../utils/mysqldb.js";

export const setFollow = async (me,target)=>{
	try{
		await db.query("INSERT INTO Social (followerId,targetId) VALUES (?,?)",[me,target]);
	} catch(e){
		console.log(e);
	}
};

export const deleteFollow = async (me,target)=>{
	try{
		await db.query("DELETE FROM Social WHERE followerId =? AND targetId= ?",[me,target]);
	} catch(e){
		console.log(e);
	}
};