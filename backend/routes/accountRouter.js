const express = require('express');
const mongoose = require('mongoose');
const { Account } = require('../db');
const { Auth } = require('../middleware/auth');

const router = express.Router();

router.get("/balance",Auth,async(req,res)=>{
    const user = await Account.findOne({userId:req.userId});
    res.status(200).json({balance : user.balance});

});

router.post('/transfer',Auth,async (req,res)=>{
    const from_acc = req.userId;
    const to_Acc = req.body.to;
    const amount = req.body.amount;
    try{
    const session = mongoose.startSession();
    await session.startTransaction();
    const account_from = Account.findOne({userId : from_acc}).session(session);
    if(!account_from){
         await session.abortTransaction();
        res.status(400).json({"message" : "Invalid Account"});
        return;

    }
    if(account_from.balance < amount){
         await session.abortTransaction();
        res.status(400).json({"message" : "insufficient Balance"});
        return;
    }
    const to_account = Account.findOne({userId : to_Acc}).session(session);
    if(!to_account){
       await session.abortTransaction();
      res.status(400).json({"message" : "Invalid Account"});
        return;
    }
    await Account.updateOne({userId: from_acc},{$inc : {balance: -amount}}).session(session);
    await Account.updateOne({userId: to_Acc},{$inc : {balance: amount}}).session(session);
    await session.commitTransaction();
    console.log("transaction Sucessfull");
}catch(err){
    console.log("Transaction Failure");
    console.log(err);
}
await session.endSession();
});

module.exports = router;    