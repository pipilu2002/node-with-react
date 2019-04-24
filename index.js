const  express      = require('express');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');
const keys	        = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});

const  app	=  express();

// nói vs express nó cần sd cookie bên trong ứng dụng
// cấu hình cookie
app.use(
    cookieSession({
        maxAge : 30*24*60*60*1000, // độ tuổi tối đa là khoảng thời gian tối đa mà cookie có thể tồn tại bên trong ứng dụng
        keys : [keys.cookieKey,'cái này là cái cookieKey thứ 2']
    })
)
app.use(passport.initialize());
app.use(passport.session());



// const authRoutes		= require('./routes/authRoutes.js');
// authRoutes(app);
// cái này tương đương luôn
require('./routes/authRoutes.js')(app);



const PORT  = process.env.PORT || 5000; // nếu có biến môi trường điều đó được định nghĩa bởi Heroku, nếu k thì theo mặc định là 5000
app.listen(PORT);