/**
 * XSS 방어용 
 * @param {string} origin 
 */
export const cleanText = (origin) =>{
	let v = origin;
	v = v.replaceAll("<","&lt");
	v = v.replaceAll(">","&gt");
	return v;
};