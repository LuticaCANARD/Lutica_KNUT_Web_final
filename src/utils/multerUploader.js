import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {db_common} from '../utils/mysqldb.js';

/**
 * multer를 통해서 이미지 파일을 업로드 하는 객체.
 * - 운영상 주의점 : 메타는 mysql에 저장
 */
export const upload = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			done(null,'upload/');
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			const replacedName = file.originalname.replace(' ','_');

			let thereIsExits = fs.existsSync(`upload/${replacedName}`);
			if ( thereIsExits === true ) {
				while( thereIsExits === true ){
					count++;
					thereIsExits = fs.existsSync(`upload/${path.basename(replacedName,ext)+ String(count)+ext}`);
				}
			}
			req.body["filename"] = path.basename(replacedName,ext)+(count!=0 ? count : '')+ext;
			done(null,path.basename(replacedName,ext)+(count!=0 ? count : '')+ext);
		}
	}),
	limits:{fileSize: 5*1000000*1024}
});

export const uploadPrivate = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			done(null,`upload/${req.session?.passport?.user}/`);
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			const replacedName = file.originalname.replace(' ','_');

			let thereIsExits = fs.existsSync(`upload/${req.session?.passport?.user}/${replacedName}`);
			if ( thereIsExits === true ) {
				while( thereIsExits === true ){
					count++;
					thereIsExits = fs.existsSync(`upload/${req.session?.passport?.user}/${path.basename(replacedName,ext)+ String(count)+ext}`);
				}
			}
			done(null,path.basename(replacedName,ext)+(count!=0 ? count : '')+ext);
		}
	}),
	limits:{fileSize: 5*1024*1024}
});


export const uploadProfile = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			if(!fs.existsSync(`upload/${req.session?.passport?.user}`)) fs.mkdirSync(`upload/${req.session?.passport?.user}`);
			if(!fs.existsSync(`upload/${req.session?.passport?.user}/profile`)) fs.mkdirSync(`upload/${req.session?.passport?.user}/profile`);
			done(null,`upload/${req.session?.passport?.user}/profile`);
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			const replacedName = file.originalname.replace(' ','_');

			req.body["filename"] = `${req.session?.passport?.user}/profile/`+path.basename(replacedName,ext)+(count!=0 ? count : '')+ext;

			done(null,path.basename(replacedName,ext)+(count!=0 ? count : '')+ext);
		}
	}),
	limits:{fileSize: 5*1024*1024}
});


export const uploadHeader = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			if(!fs.existsSync(`upload/${req.session?.passport?.user}`)) fs.mkdirSync(`upload/${req.session?.passport?.user}`);
			if(!fs.existsSync(`upload/${req.session?.passport?.user}/header`)) fs.mkdirSync(`upload/${req.session?.passport?.user}/header`);
			done(null,`upload/${req.session?.passport?.user}/header`);
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			const replacedName = file.originalname.replace(' ','_');

			req.body["filename"] = `${req.session?.passport?.user}/header/`+path.basename(replacedName,ext)+(count!=0 ? count : '')+ext;

			done(null,path.basename(replacedName,ext)+(count!=0 ? count : '')+ext);
		},
	}),
	
	limits:{fileSize: 5*1024*1024}
});

export const posterUploader = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			if(!fs.existsSync(`upload/${req.session?.passport?.user}`)) fs.mkdirSync(`upload/${req.session?.passport?.user}`);
			if(!fs.existsSync(`upload/${req.session?.passport?.user}/posts`)) fs.mkdirSync(`upload/${req.session?.passport?.user}/posts`);
			done(null,`upload/${req.session?.passport?.user}/posts`);
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			const replacedName = file.originalname.replace(' ','_');
			let thereIsExits = fs.existsSync(`upload/${req.session?.passport?.user}/posts/${replacedName}`);
			if ( thereIsExits === true ) {
				while( thereIsExits === true ){
					count++;
					thereIsExits = fs.existsSync(`upload/${req.session?.passport?.user}/posts/${path.basename(replacedName,ext)+ String(count)+ext}`);
				}
			}
			const typeArray = file.mimetype.split('/');
			if(typeArray[0]!='image')
				req.body["filename"] = `${req.session?.passport?.user}/posts/`+path.basename(replacedName,ext)+(count!=0 ? count : '')+ext;
			else {
				if( !req.body["images"] ) req.body["images"] = [];
				req.body["images"].push( `${req.session?.passport?.user}/posts/`+path.basename(replacedName,ext)+(count!=0 ? count : '')+ext);
			}


			done(null,path.basename(replacedName,ext)+(count!=0 ? count : '')+ext);
		},
	}),
	// fileFilter:(req, file,cb)=>{
	// 	const typeArray = file.mimetype.split('/');
	// 	const fileType = typeArray[0];
	// 	if (fileType != 'text'||fileType != 'md'){ 
	// 		req.fileValidationError ='txt/md만 업로드가능합니다.';
	// 		cb(null, false); 
	// 	}
	// 	cb(null,true);
	// },
	limits:{fileSize: 5*1024*1024}
});