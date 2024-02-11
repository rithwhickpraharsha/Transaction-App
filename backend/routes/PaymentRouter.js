

const express = require("express");
const { UserModel, PayRequest } = require("../db");
const { Auth } = require("../middleware/auth");
const pay_router = express.Router();

pay_router.post("/create",Auth,async(req,res)=>{
    const creator = await UserModel.findOne({_id:req.userId});
    const borrowers = req.body.borrowers;
    
    const amount = req.body.amount;
    const description = req.body.description;
    const result = await PayRequest.create({borrowers:borrowers,sender:{userId:req.userId,username:creator.username},amount:amount,description:description});
    console.log(result);
    res.status(200).json({"msg" : "Payment request sent Successfully"})

});

pay_router.get("/find",Auth,async(req,res)=>{
    const requests = await PayRequest.find({});
    console.log(req.userId);
    const pay_requests =requests.map((request)=>{
       
      for(let i = 0; i < request.borrowers.length;i++){
       // console.log(request.borrowers[i])
        if(request.borrowers[i].userId == req.userId){
            return ({amount:request.amount,description:request.description,creator:request.sender,createdAt:request.createdAt});
        }
      }
    });
    pay_requests.sort((a,b)=>{new Date(b.createdAt) - new Date(a.createdAt)});
    
    res.status(200).json({
        notifications: pay_requests
    });
});

module.exports = pay_router;