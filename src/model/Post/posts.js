import { db,db_common } from '../../utils/mysqldb.js';
import { mongodb } from '../../utils/mongodb.js';
import { ObjectId } from 'mongodb';

export const uploadPostModel = async (userid,title,text,etc,fileid) =>{

	try{
		const obj = {
			...etc,
			context:text
		};
		await mongodb.connect();
		const mongoid = await mongodb.db('parareal').collection('post').insertOne(obj);
		await mongodb.close();
		const ret = await db.query("INSERT INTO Post (userId,title,file,`desc`) VALUES (?,?,?,?)",[userid,title,fileid,mongoid.insertedId.toString()]);
		return ret[0];
	} catch (e){
		return e;
	}
	
	
};

export const loadPostModel = async (id) =>{
	const ret = await db.query('SELECT file,`desc`,location,A.createdAt,title,B.nickname FROM Post AS A INNER JOIN user AS B ON A.userId=B.id WHERE A.id=?',[id]);
	const mongoid = new ObjectId(ret[0][0].desc);
	await mongodb.connect();
	const obj = await mongodb.db('parareal').collection('post').findOne({_id:mongoid});
	await mongodb.close();

	return {
		meta:ret[0][0],
		context : obj
	};
};