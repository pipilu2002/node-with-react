// don't commit this !!
// module.exports = {
// 	googleClientID 		: '721389041112-c2m2v4kkttip1kf3hqgh8bdm4di66cuf.apps.googleusercontent.com',
// 	googleClientSecret 	: 'EnzPpB7GGYPl56MFCv2cPt92',
// 	mongoURI			: 'mongodb+srv://adminprod:10101997@cluster0-gdixi.mongodb.net/test?retryWrites=true',
// 	cookieKey 			: 'đây là chuỗi cookieKey mà tao đã tạo',
// }

// nhuwnxg cái này sẽ được thêm trên heroku https://dashboard.heroku.com/apps/glacial-tor-67386/settings   => Reveal Config Vars
module.exports = {
	googleClientID 		: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret 	: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI			: process.env.MONGO_URI,
	cookieKey 			: process.env.COOKIE_KEY,
}