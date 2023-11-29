import { Router } from "express";
import { upload,uploadPrivate,uploadHeader,uploadProfile } from "../../utils/multerUploader.js";
import { isLoginState } from "../../middleware/Auth/loginState.js";
import { loadSetting } from "../Post/loadPage.js";
import {loadUserMain} from '../../model/Post/loadPage.js';
import {db} from '../../utils/mysqldb.js';
import fs from 'fs';
/**
* 파일을 업로드한 이후 처리하는 라우터
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const processAfterUploadFile = (req,res,next) =>{
	console.log(req.body.filename);
	res.send(true);
};
/**
* 파일을 업로드한 이후 처리하는 라우터
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const processAfterUploadHeader = async(req,res,next) =>{
	const userid = req.session?.passport?.user;
	const name = await db.query("SELECT mainTitlePicture FROM user WHERE id=?",[userid]);
	fs.rmSync(`upload/${name[0][0]["mainTitlePicture"]}`,{force: true});
	await db.query("UPDATE user SET mainTitlePicture = ? WHERE id=?",[req.body["filename"],userid]);
	res.redirect('/setting');
};
/**
* 파일을 업로드한 이후 처리하는 라우터
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const processAfterUploadProfile = async(req,res,next) =>{
	const userid = req.session?.passport?.user;
	const name = await db.query("SELECT mainProfilePicture FROM user WHERE id=?",[userid]);
	fs.rmSync(`upload/${name[0][0]["mainProfilePicture"]}`,{force: true});

	await db.query("UPDATE user SET mainProfilePicture = ? WHERE id=?",[req.body["filename"],userid]);
	res.redirect('/setting');
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
const uploadFile = upload.single('file');

/**
* 파일을 다운로드 처리하는 라우터
* @param {Error} err
* @param {Request} req 
* @param {Response} res 
* @param {NextFunction} next 
*/
const onSettingFileError = async(err,req,res,next) =>{
	const idPass = req.session.passport.user;
	const toast = req.session?.errormsg;
	const info = await loadUserMain(idPass,idPass);
	res.render('pageSetting.ejs',{info,toast});
};

const fileController = Router();
fileController.post('/upload',uploadFile,processAfterUploadFile); //files로 보내면됨.
fileController.post('/upload_private',isLoginState,uploadPrivate.single('files'),processAfterUploadFile);
// 이하는 설정에서 관리하는 특별 라우터
fileController.post('/uploadHeader',uploadHeader.single('file'),processAfterUploadHeader,onSettingFileError); //files로 보내면됨.
fileController.post('/uploadProfile',uploadProfile.single('file'),processAfterUploadProfile,onSettingFileError); //files로 보내면됨.
fileController.get('/download/:filename*',downloadFile);

export default fileController;