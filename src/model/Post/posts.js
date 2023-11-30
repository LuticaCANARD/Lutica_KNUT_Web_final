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

export const loadPost = async (id) =>{
	const ret = await db.query('SELECT * FROM Post WHERE id=?',[id]);
	const mongoid = ObjectId(ret[0][0].desc);
	await mongodb.connect();

	await mongodb.close();

	
};