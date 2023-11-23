import multer from 'multer';
import path from 'path';
export const upload = multer({
	storage:multer.diskStorage({destination(req,file,done){
		done(null,'upload/');
	},filename(req,file,done){
		const ext = path.extname(file.originalname);
		done(null,path.basename(file.originalname,ext)+Date.now()+ext);
	}}),limits:{fileSize: 5*1024*1024}
});