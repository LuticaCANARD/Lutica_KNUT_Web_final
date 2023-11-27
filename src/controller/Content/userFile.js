import { Router } from "express";
import { upload,uploadPrivate } from "../../utils/multerUploader.js";
import { isLoginState } from "../../middleware/Auth/loginState.js";
import fs from 'fs';
/**
* 파일을 업로드한 이후 처리하는 라우터
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const processAfterUploadFile = (req,res,next) =>{
	
};

/**
* 파일을 다운로드 처리하는 라우터
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const downloadFile = (req,res,next) =>{
	const filename = req.params.filename+req.params[0];
	let isFileExist;
	isFileExist = fs.existsSync(`upload/${filename}`);// 파일 존재여부 확인
	// 파일이 존재하지 않는다면 에러 처리
	if (!isFileExist) {
		res.status(500).send(false);
	}
	try {
		// download()를 사용해서 파일을 프론트쪽으로 보내준다.
		res.download(`upload/${filename}`);
	} catch (err) {
		res.status(500).send(true);
	}
};

const fileController = Router();
fileController.post('/upload',upload.single('files'),processAfterUploadFile); //files로 보내면됨.
fileController.post('/upload_private',isLoginState,uploadPrivate.single('files'),processAfterUploadFile);
fileController.get('/download/:filename*',downloadFile);

export default fileController;