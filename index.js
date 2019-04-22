const  express = require('express');
const  app 	   = express();

app.get('/',(req, res)=>{
	res.send({hi:'tú'});
});

const PORT  = process.env.PORT || 5000; // nếu có biến môi trường điều đó được định nghĩa bởi Heroku, nếu k thì theo mặc định là 5000
app.listen(PORT);