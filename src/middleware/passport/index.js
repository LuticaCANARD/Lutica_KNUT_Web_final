import local from './localstrategy.js';
import passport from 'passport';
import {getUserInfoFromUserno} from '../../model/Auth/user.js';
export default () => {
	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});
	
	//? deserializeUser는 serializeUser()가 done하거나 passport.session()이 실행되면 실행된다.
	//? 즉, 서버 요청이 올때마다 항상 실행하여 로그인 유저 정보를 불러와 이용한다.
	passport.deserializeUser(async(id, done) => {
		const user = await getUserInfoFromUserno(id);
		done(null,user);
	});
	
	//^ 위의 이러한 일련의 과정은, 그냥 처음부터 user객체를 통째로 주면 될껄 뭘 직렬화/역직렬화를 하는 이유는
	//^ 세션 메모리가 한정되어있기때문에 효율적으로 하기위해, user.id값 하나만으로 받아와서, 
	//^ 이를 deserialize 복구해서 사용하는 식으로 하기 위해서다.
	
	/* ---------------------------------------------------------------------- */
	
	local();
};