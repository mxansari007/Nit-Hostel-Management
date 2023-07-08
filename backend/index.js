const express =require("express");
const cors= require("cors");
const Student =require('./models/students.js');
const router= require("./routers/routes.js");
const cookieParser = require('cookie-parser');



const app = express();



require("./db/conn.js");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.use(express.static('public'));
// app.use(require('./routes/index.jsx'));

////  we need to register the router
app.use(router);


const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("server is running at port "+ port );
});

