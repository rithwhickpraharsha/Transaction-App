const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors({
    origin:["https://transaction-app-jade.vercel.app","http://localhost:5173"]
}));
app.use(bodyParser.json());

const user = require("./routes/userRouter");
const account = require("./routes/accountRouter");
const group_router = require("./routes/groupRouter");
const pay_router = require("./routes/PaymentRouter");
app.use('/api/v1/user',user);
app.use('/api/v1/account',account);
app.use('/api/v1/group',group_router);
app.use('/api/v1/request',pay_router);
const JWT_SECRET = process.env.JWT_SECRET;





app.listen(3000);

