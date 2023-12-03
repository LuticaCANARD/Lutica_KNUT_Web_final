import passport from 'passport';
import { Strategy } from 'passport-local';
import { tryUserLogin } from '../../model/Auth/user.js';
import { SHA256hashing } from '../../utils/hashing.js';
// @author @LuticaCANARD 
export default ()=>{
	passport.use(
		new Strategy(
			{
				usernameField: 'loginId',
				passwordField: 'password',
				session: true, // 세션에 저장 여부
				passReqToCallback: true, 
			},
			//* 콜백함수의  email과 password는 위에서 설정한 필드이다. 위에서 객체가 전송되면 콜백이 실행된다.
			async (req, loginId, password, done) => {
				try {
					// 가입된 회원인지 아닌지 확인		
					const hashed = SHA256hashing(password);
					const exUser = await tryUserLogin(loginId,hashed);
					if (exUser) {
						done(null, exUser); 
					} else {
						done(null, false, { }); 
					}
				} catch (error) {
					console.error(error);
					done(error);
				}
			},
		),
	);
};