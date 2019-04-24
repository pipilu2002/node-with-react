const passport 			= require('passport'); // làm login
const GoogleStrategy  	= require('passport-google-oauth20').Strategy; // login google
const keys 				= require('../config/keys.js');
const mongoose 			= require('mongoose');

const User				= mongoose.model('users');

passport.serializeUser((user, done)=>{
	done(null,user.id); 
	// đang đặt id làm cookie trong trình duyệt của người dùng
	// id này chính là id mà mongo tạo tự động cho mỗi phần tử user 
	// (nếu xem cơ sở dữ liệu bảng users thì ngoài googleId ra thì còn có thêm _id mà mông tự độgn tạo và nó chính là id này)
})

passport.deserializeUser((id,done)=>{
	// đang lấy id từ cookie, sau đó được sử dụng trong cuộc gọi lại để lấy thông tin người dùng hoặc một cái gì đó khác , dựa trên id đó hoặc một số thông tin khác từ cookie
	User.findById(id)
		.then((user)=>{
			// let ty = {ahihi: 'hihi'}
			// done(null,{user,...ty})
			done(null,user)
		})
})



// login with google
passport.use(
	new GoogleStrategy({
		clientID : keys.googleClientID,
		clientSecret : keys.googleClientSecret,
		callbackURL : '/auth/google/callback',
	}, (accessToken, refreshToken, profile, done) => {
		// console.log('accessToken : ', accessToken)
		// console.log('refreshToken : ', refreshToken)
		// console.log('profile : ', profile)

		// tìm kiếm user ID đã có trong cơ sở dữ liệu hay chưa
		User.findOne({googleId:profile.id})
			.then((existingUser)=>{
				if(existingUser){
					// nếu đã có ID user rồi thì viết vô đây
					done(null, existingUser);
				}else{
					// nếu chưa có ID thì lưu vào 
					new User({googleId:profile.id}).save().then(user => done(null,user));
				}
			})
	})
)