const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const user = require("./routes/userRouter");
const account = require("./routes/accountRouter");
app.use('/api/v1/user',user);
app.use('/api/v1/account',account);
const JWT_SECRET = process.env.JWT_SECRET;





app.listen(3000);

