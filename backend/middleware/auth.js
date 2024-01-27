const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Auth = (req,res,next)=>{
    console.log("Authentication started");
if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
    res.status(403).json({});
    return;
}

 const authheader = req.headers.authorization.split(' ');
 const token = authheader[1];
 try{
   const jwt_response = jwt.verify(token,JWT_SECRET);
   req.userId = jwt_response.userId;
   console.log("Authentication Done");
    next();
    
 }catch(err){
    console.log(err);
    res.status(403).json("msg token is not verified..Your are not Authorized");
 }


}
module.exports = {
    Auth
}