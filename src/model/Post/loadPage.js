import { db,db_common } from '../../utils/mysqldb.js';

/**
 * 유저의 게시글들을 불러옵니다.
 * @param {string} userId 유저의 id입니다.
 * @param {number} offset 조회할 offset를 선택합니다. (최신순임에 유의하십시오.)
 * @param {number} count 가져올 갯수를 선택합니다. 
 */
export const loadUserPosts = async(userId,offset,count) =>{
	const userPosts = await db.query("SELECT * FROM Post WHERE userId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?",[userId,count,offset]);
	return userPosts[0];
};

/**
 * 유저의 메인 정보를 불러옵니다.
 * @param {string} userId 유저의 id입니다.
 */
export const loadUserMain = async (userId) =>{
	const userInfo = await db.query("SELECT mainDesc,mainTitlePicture,mainProfilePicture FROM user WHERE id=?",[userId]);
	return userInfo[0][0];
};