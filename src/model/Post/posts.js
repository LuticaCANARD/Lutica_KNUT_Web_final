import { db,db_common } from '../../utils/mysqldb.js';
import { mongodb } from '../../utils/mongodb.js';
import { ObjectId } from 'mongodb';

export const uploadPostModel = async (userid,title,text,etc,files) =>{

	try{
		const obj = {
			...etc,
			context:text
		};
		await mongodb.connect();
		const mongoid = await mongodb.db('parareal').collection('post').insertOne(obj);
		await mongodb.close();
		const v = files?true:null;
		const ret = await db.query("INSERT INTO Post (userId,title,file,`desc`) VALUES (?,?,?,?)",[userid,title,v,mongoid.insertedId.toString()]);
		const id = ret[0].insertId;
		if(files?.length>0){
			files.forEach(async element => {
				await db.query('INSERT INTO PostPicture (userId,postId,path) VALUES (?,?,?)',[userid,id,element]).then();
			});
		}
		return ret[0];
	} catch (e){
		return e;
	}
	
	
};

export const loadPostModel = async (id) =>{
	const ret = await db.query('SELECT file,`desc`,A.createdAt,title,B.nickname FROM Post AS A INNER JOIN user AS B ON A.userId=B.id WHERE A.id=?',[id]);
	let fileinfo = {};
	if(ret[0][0].file!=null) {
		fileinfo = await db.query("SELECT path FROM PostPicture WHERE postId=?",[id]);
		fileinfo = fileinfo[0];
	}
	const mongoid = new ObjectId(ret[0][0].desc);
	await mongodb.connect();
	const obj = await mongodb.db('parareal').collection('post').findOne({_id:mongoid});
	await mongodb.close();

	return {
		meta:ret[0][0],
		context : obj,
		fileinfo 
	};
};