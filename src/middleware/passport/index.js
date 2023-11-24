import local from './localstrategy.js';
import passport from 'passport';
import {getUserInfoFromUserno} from '../../model/Auth/user.js';
export default () => {
	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});
	passport.deserializeUser(async(id, done) => {
		const user = await getUserInfoFromUserno(id);
		done(null,user);
	});
	
	local();
};