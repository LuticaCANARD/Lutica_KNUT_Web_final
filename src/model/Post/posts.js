import { db,db_common } from '../../utils/mysqldb.js';
import { mongodb } from '../../utils/mongodb.js';
import { ObjectId } from 'mongodb';
import { parse } from 'marked';
import DOMPurify from 'isomorphic-dompurify';


export const uploadPostModel = async (userid,title,text,etc,files) =>{

	try{
		const obj = {
			...etc,
			context:text,
			picture:{
				path:files
			}
		};
		await mongodb.connect();
		const mongoid = await mongodb.db('parareal').collection('post').insertOne(obj);
		await mongodb.close();
		const v = files?true:null;
		const ret = await db.query("INSERT INTO Post (userId,title,file,`desc`) VALUES (?,?,?,?)",[userid,title,v,mongoid.insertedId.toString()]);
		const id = ret[0].insertId;
		if(files?.length>0){
			const b = [];
			files.forEach(async element => {
				b.push([userid,id,element]);
			});
			await db.query('INSERT INTO PostPicture (userId,postId,path) VALUES ?',[b]);
		}
		return ret[0];
	} catch (e){
		return e;
	}
};

export const loadPostModel = async (id) =>{
	const ret = await db.query('SELECT file,`desc`,A.createdAt,title,B.nickname,B.id FROM Post AS A INNER JOIN user AS B ON A.userId=B.id WHERE A.id=?',[id]);
	let fileinfo = {};
	if(ret[0][0].file!=null) {
		fileinfo = await db.query("SELECT path FROM PostPicture WHERE postId=?",[id]);
		fileinfo = fileinfo[0];
	}
	const mongoid = new ObjectId(ret[0][0].desc);
	await mongodb.connect();
	const obj = await mongodb.db('parareal').collection('post').findOne({_id:mongoid});
	obj.context = DOMPurify.sanitize(parse(obj.context));
	await mongodb.close();

	return {
		meta:ret[0][0],
		context : obj,
		fileinfo 
	};
};


export const searchingPostByDate = async (start,end,me) =>{
	if(!me){
		const ret = await db.query("SELECT A.*,B.nickname FROM Post AS A INNER JOIN user AS B ON A.userId=B.id WHERE A.createdAt BETWEEN ? AND ? ORDER BY A.createdAt",[ start,end ]);
		return ret[0];
	}
	const ret = await db.query("SELECT A.*,B.nickname FROM Post AS A INNER JOIN user AS B ON A.userId=B.id WHERE A.userId != ? AND A.createdAt BETWEEN ? AND ? ORDER BY A.createdAt",[ me,start,end ]);
	return ret[0];
};