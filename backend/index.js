const express =require("express");
const cors= require("cors");
const router= require("./routers/routes.js");
const cookieParser = require('cookie-parser');



const app = express();



require("./db/conn.js");

app.use(cookieParser());  
app.use(express.json());
app.use(express.urlencoded());

app.use(cors({      //* cros-origin-scripting
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static('public'));  //*to access public folder
// app.use(require('./routes/index.jsx'));
app.disable('x-powered-by');  //*less hackers know about our stack
////  we need to register the router

app.use(router);


const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("server is running at port "+ port );
});

