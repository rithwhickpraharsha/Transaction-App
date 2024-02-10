const express = require('express');
const {UserValidation,UpdateValidation} = require("../validation");
const router = express.Router();
const jwt = require('jsonwebtoken');
const {UserModel, Account} = require("../db");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const { Auth } = require('../middleware/auth');
const SALT = 10;
router.post('/signup',async(req,res)=>{
  
    const parser = req.body;
    const response = UserValidation.safeParse(parser);
    if(response.success){
            const username = parser.username;
            
          const resp = await UserModel.findOne({username:username});
         console.log(resp);
          if(!resp){
            bcrypt.genSalt(SALT).then((salt)=>{
              return bcrypt.hash(parser.password,salt);
            }).then(async (hash)=>{
              parser.password = hash;
              const newUser = await UserModel.create(parser);
              
            const token = jwt.sign({userId: newUser._id},JWT_SECRET);
            try{
              await Account.create({
                userId : newUser._id,
                balance: 1 + Math.floor(Math.random()*10000)
              })}
              catch(e){
                console.log("account creation failed");
                console.log(e);
              }
              res.status(200).json({msg:"user created successfully",userId:token,username:newUser.username,status:true});

            }).catch((err) => {
              console.log(err);
              console.log("Hashing error in bcrypt");
            });
           
          }
          else{
            res.status(411).json({"msg":"User Already Exists",status:false});
          }
    }
    else{
        res.status(411).json({"msg":"Validation Error...Each Field length is more than 6..Please make sure to enter valid credentials",status:false})
    }

});

router.post('/signin',async(req,res)=>{
    const input = req.body;
    const check = await UserModel.findOne({username: input.username});
    if(check){
      const crct_password = check.password;
      bcrypt.compare(input.password,crct_password).then((match)=>{
        if(match){
          const token = jwt.sign({userId: check._id},JWT_SECRET);
          res.status(200).json({token:token,username:check.username,"msg":"Log in Successful" });
        }
        else{
          res.status(411).json({"msg" : "Wrong Password Entered"});
        }
      })
    }
    else{
        res.status(411).json({"msg" : "User doesnt Exist....Please Sign up"});
    }

});
router.put("/",Auth,async(req,res)=>{
  const parser = req.body;
 
  const Validate = UpdateValidation.safeParse(parser);
  if(!Validate.success){
     res.status(413).json({"msg" : "password is too small"});
     return;
  }

  bcrypt.genSalt(SALT).then((salt)=>{
    return bcrypt.hash(parser.password,salt);
  }).then(async(hash)=>{
    const user = await UserModel.updateOne({_id: req.userId},{password:hash,firstName:parser.firstName,lastName:parser.lastName});
    res.status(200).json({"msg" : "User Update SuccessFully",user:user});
  })

})
router.post("/verify",Auth,async(req,res)=>{
const id = req.userId;
const result = await UserModel.findOne({_id:id});
const pass = req.body.password;

try{
const match = await bcrypt.compare(pass,result.password);

if(match){
  res.status(200).json({"msg":"Password verified"});
}
else{
  res.status(413).json({"msg":"Incorrect Password"});
}
}
catch(err){
  console.log("Password cverify payment error");
  console.log(err);
}


});
router.get('/bulk',Auth,async(req,res)=>{
  console.log(req);
  let filter =  req.query.filter || '';
  filter = new RegExp(filter,'i');
  const users = await UserModel.find({
    $or:[
      {
        firstName : {$regex : filter}
      },
      {
       lastName: {$regex : filter}
      },
      {
        username:{$regex : filter}
      }
    ]
  });
 
  res.status(200).json({
    users : users.map((user) => {
      return (
        {
          username:user.username,
          firstName:user.firstName,
          lastName : user.lastName,
          _id : user._id
        }
      )
    })
  })

})
module.exports = router;    