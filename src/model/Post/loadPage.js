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
export const loadUserMain = async (userId,myid) =>{
	const userInfo = await db.query("SELECT id,nickname,mainDesc,mainTitlePicture,mainProfilePicture,B.targetId FROM user AS A LEFT JOIN (SELECT * FROM Social WHERE followerId=?) AS B ON A.id=B.targetId WHERE id=?",[myid,userId]);
	return userInfo[0][0];
};

export const loadSocialPage = async(userId,offset,size) =>{
	const ret = await db.query("SELECT B.*,C.nickname FROM (SELECT * FROM Social WHERE followerId = ?) AS A INNER JOIN Post AS B ON A.targetId=B.userId INNER JOIN user AS C ON A.targetId=C.id ORDER BY B.createdAt DESC LIMIT ? OFFSET ?",[userId,size,offset]);
	return ret[0];
};
/**
 * 
 * @param {Array<number>} postId 
 * @returns 
 */
export const loadPictureList=async(postId) => {
	const ret = await db.query("SELECT A.postId, B.name,B.path FROM PostPicture AS A INNER JOIN Picture AS B ON A.pictureId = B.id WHERE A.postId IN (?) ORDER BY B.id",[postId]);
	const p = {};
	ret[0].map(a=>{
		if(!p[a["postId"]]) p[a["postId"]] = [];
		p[a["postId"]].push(a);
	}); // 포스터와 mapping.
	return p;
};
