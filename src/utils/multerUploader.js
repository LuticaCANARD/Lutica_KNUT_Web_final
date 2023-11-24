import multer from 'multer';
import path from 'path';
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
			const ext = path.extname(file.originalname);
			done(null,path.basename(file.originalname,ext)+ext);
		}
	}),
	limits:{fileSize: 5*1024*1024}
});