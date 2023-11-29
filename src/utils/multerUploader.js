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
			let thereIsExits = fs.existsSync(`upload/${file.originalname}`);
			if ( thereIsExits === true ) {
				while( thereIsExits === true ){
					count++;
					thereIsExits = fs.existsSync(`upload/${path.basename(file.originalname,ext)+ String(count)+ext}`);
				}
			}
			req.body["filename"] = path.basename(file.originalname,ext)+(count!=0 ? count : '')+ext;
			done(null,path.basename(file.originalname,ext)+(count!=0 ? count : '')+ext);
		}
	}),
	limits:{fileSize: 5*1000000*1024}
});

export const uploadPrivate = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			done(null,`upload/${req.session?.passport?.id}/`);
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			let thereIsExits = fs.existsSync(`upload/${req.session?.passport?.id}/${file.originalname}`);
			if ( thereIsExits === true ) {
				while( thereIsExits === true ){
					count++;
					thereIsExits = fs.existsSync(`upload/${req.session?.passport?.id}/${path.basename(file.originalname,ext)+ String(count)+ext}`);
				}
			}
			done(null,path.basename(file.originalname,ext)+(count!=0 ? count : '')+ext);
		}
	}),
	limits:{fileSize: 5*1024*1024}
});


export const uploadProfile = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			done(null,`upload/${req.session?.passport?.id}/profile`);
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			let thereIsExits = fs.existsSync(`upload/${req.session?.passport?.id}/profile/${file.originalname}`);
			if ( thereIsExits === true ) {
				while( thereIsExits === true ){
					count++;
					thereIsExits = fs.existsSync(`upload/${req.session?.passport?.id}/${path.basename(file.originalname,ext)+ String(count)+ext}`);
				}
			}
			req.body["filename"] = path.basename(file.originalname,ext)+(count!=0 ? count : '')+ext;

			done(null,path.basename(file.originalname,ext)+(count!=0 ? count : '')+ext);
		}
	}),
	limits:{fileSize: 5*1024*1024}
});


export const uploadHeader = multer({
	storage:multer.diskStorage({
		destination(req,file,done){
			done(null,`upload/${req.session?.passport?.id}/header`);
		},
		filename(req,file,done){
			let ext = path.extname(file.originalname);
			let count = 0;
			let thereIsExits = fs.existsSync(`upload/${req.session?.passport?.id}/header/${file.originalname}`);
			if ( thereIsExits === true ) {
				while( thereIsExits === true ){
					count++;
					thereIsExits = fs.existsSync(`upload/${req.session?.passport?.id}/header/${path.basename(file.originalname,ext)+ String(count)+ext}`);
				}
			}
			done(null,path.basename(file.originalname,ext)+(count!=0 ? count : '')+ext);
		},
	}),
	
	limits:{fileSize: 5*1024*1024}
});