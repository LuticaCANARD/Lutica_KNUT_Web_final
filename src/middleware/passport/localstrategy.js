import passport from 'passport';
import { Strategy } from 'passport-local';
import { tryUserLogin } from '../../model/Auth/user.js';
import { SHA256hashing } from '../../utils/hashing.js';
// @author @LuticaCANARD 
export default ()=>{
	passport.use(
		new Strategy(
			{
				// passport의 전략에 따라 달린일이니 잘 확인할것.
				//* req.body 객체인지 하고 키값이 일치해야 한다.
				usernameField: 'loginId', // req.body.email
				passwordField: 'password', // req.body.password
				session: true, // 세션에 저장 여부
				passReqToCallback: true, 
				//express의 req 객체에 접근 가능 여부. true일 때, 뒤의 callback 함수에서 req 인자가 더 붙음. 
				//async (req, email, password, done) => { } 가 됨
	
			},
			//* 콜백함수의  email과 password는 위에서 설정한 필드이다. 위에서 객체가 전송되면 콜백이 실행된다.
			async (req, loginId, password, done) => {
				try {
					// 가입된 회원인지 아닌지 확인		
					const hashed = SHA256hashing(password);
					const exUser = await tryUserLogin(loginId,hashed);
					if (exUser) {
						done(null, exUser); //? 성공이면 done()의 2번째 인수에 선언
					} else {
						done(null, false, { }); //? 실패면 done()의 2번째 인수는 false로 주고 3번째 인수에 선언
					}
				} catch (error) {
					console.error(error);
					done(error); //? done()의 첫번째 함수는 err용. 특별한것 없는 평소에는 null로 처리.
				}
			},
		),
	);
};