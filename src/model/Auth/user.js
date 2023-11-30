import { db,db_common } from '../../utils/mysqldb.js';

/**
 * 입력받은 id가 다른 유저와 중복되는지 확인합니다.
 * id가 중복되면 true를 리턴하고, 그렇지 않다면 false 를 리턴합니다.
 * @param {string} id 유저에게 입력받은 ID
 */
export const getUserIDIsAlreadyExists = async (id) =>{
// 유저가 존재하는지 확인하는 함수.
	const result = await db.query("SELECT * FROM user WHERE loginId = ?",[id]);
	return result[0].length>0;
};

/**
 * 입력받은 email이 다른 유저와 중복되는지 확인합니다.
 * email가 중복되면 true를 리턴하고, 그렇지 않다면 false 를 리턴합니다.
 * @param {string} email 유저에게 입력받은 ID
 */
export const getUserEmailIsAlreadyExists = async (email) =>{
	// 유저가 존재하는지 확인하는 함수.
	const result = await db.query("SELECT * FROM user WHERE email = ?",[email]);
	return result[0].length>0;
};


/**
 * id,pw가 동일한 유저가 있는지 찾아서 있으면 유저의 객체를, 없으면 -1을 돌려줍니다.
 * 유저의 객체는, User 테이블의 모든 행과 값이 동일합니다. 
 * 또한, 유저가 로그인에 성공하면, passwordErrorCount는 0으로 초기화됩니다. (객체의 passwordErrorCount는 초기화 이전 값.)
 * @param {string} id 유저에게서 받은 ID
 * @param {string} hashedPassword 해시된 PW
 * @returns 성공시 유저의 객체, 실패시 false 
 */
export const tryUserLogin = async (id,hashedPassword) => {
	const result = await db.query("SELECT * FROM user WHERE loginId = ? AND password = ?",[id,hashedPassword]);
	if(result[0].length>0){ 
		// id와 비밀번호가 같은 유저가 있다.
		// 딱히 결과를 기다릴 필요가 없으므로, 콜백기반으로 해도됨.
		db_common.promise().query("UPDATE user SET passwordErrorCount = 0 WHERE loginId = ?",[id]).then(); 
		return result[0][0]; // 완벽한 로그인 성공.
	}
	const existId = await db.query("SELECT * FROM user WHERE loginId = ?",[id]);
	if(existId[0].length>0) db_common.promise().query("UPDATE user SET passwordErrorCount = passwordErrorCount+1 WHERE loginId = ?",[id]).then();
	return false;
};

/**
 * 유저 테이블에 유저를 삽입시킵니다.
 * @param {string} loginId 유저가 보낸 ID입니다. 
 * @param {string} hashedPassword 해시된 비밀번호입니다/
 * @param {string} email 이베일입니다.
 * @returns 성공시 True, 실패시 False를 return 합니다.
 */
export const insertUserTable = async (loginId,email,hashedPassword,nick) => {
	const res = await db.query("INSERT INTO user (loginId,password,email,nickname,mainDesc) VALUES (?,?,?,?,'') ",[loginId,hashedPassword,email,nick]);
	return res[0].affectedRows>0;
};

/**
 * 유저번호(id)로 유저 객체를 가져옴.
 * @param {number} id 
 * @returns 유저의 객체
 */
export const getUserInfoFromUserno = async (id) => {
	const ret = await db.query("SELECT id,loginId,password,email,createdAt,passwordErrorCount FROM user WHERE id = ?",[id]);
	return ret[0][0];
};