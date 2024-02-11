const express = require('express');
const { default: mongoose } = require('mongoose');
const { Account, Transactions, UserModel } = require('../db');
const { Auth } = require('../middleware/auth');

const router = express.Router();

router.get("/balance",Auth,async(req,res)=>{
    const user = await Account.findOne({userId:req.userId});
    res.status(200).json({balance : user.balance});

});

router.post('/transfer',Auth,async (req,res)=>{
    const from_acc = req.userId;
    console.log(req.userId);
    const to_Acc = req.body.to;
    const amount = req.body.amount;
   
    try{
        const session = await mongoose.startSession();
    await session.startTransaction();
    
    const account_from = await Account.findOne({userId : from_acc}).session(session);
    const sender = await UserModel.findOne({_id:from_acc});
    const receiver = await UserModel.findOne({_id:to_Acc});
    if(!account_from){
        await Transactions.create({Sender:from_acc,Receiver:to_Acc,Sender_username:sender.username,Receiver_username:receiver.username,Amount:amount,Status:"Failure"});

         await session.abortTransaction();
        res.status(400).json({"msg" : "Invalid Sender"});
        return;

    }
    if(account_from.balance < amount){
        await Transactions.create({Sender:from_acc,Receiver:to_Acc,Sender_username:sender.username,Receiver_username:receiver.username,Amount:amount,Status:"Failure"});
         await session.abortTransaction();
         
        res.status(400).json({"msg" : "insufficient Balance"});
        return;
    }
    const to_account = await Account.findOne({userId : to_Acc}).session(session);
    
    if(!to_account){
       await session.abortTransaction();
      
      res.status(400).json({"msg" : "Invalid Receiver"});
        return;
    }
    await Account.updateOne({userId: from_acc},{$inc : {balance: -amount}}).session(session);
    await Account.updateOne({userId: to_Acc},{$inc : {balance: amount}}).session(session);
    await session.commitTransaction();
    console.log("transaction Sucessfull");
  
    await Transactions.create({Sender:from_acc,Receiver:to_Acc,Sender_username:sender.username,Receiver_username:receiver.username,Amount:amount,Status:"Successful"});
    res.status(200).json({"msg":"Transaction Successful"});
   // await session.endSession();
}catch(err){
    console.log("Transaction Failure");
    console.log(err);
}
});

router.post('/transactions',Auth,async(req,res)=>{
    try{
const account = req.userId;
const transactions = await Transactions.find({
$or:[
    {Sender: account},
    {Receiver:account}
]
});

let transaction_converted = transactions.map((transaction)=>{
    const date = new Date(transaction.createdAt);
    const istOffset = 0;
    const istDate = new Date(date.getTime() + istOffset);
  
    const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric',timeZone:'Asia/Kolkata' };
    const timeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' };
  
    return {
      ...transaction,
      Date: new Intl.DateTimeFormat('en-IN', dateFormatOptions).format(istDate),
      Time: new Intl.DateTimeFormat('en-IN', timeFormatOptions).format(istDate),
    };
});

transaction_converted.sort((a, b) => new Date(b._doc.createdAt) - new Date(a._doc.createdAt));

res.status(200).json({
    transactions:transaction_converted
})
    }
    catch(err){
        console.log("Fecthing transactions error");
        console.log(err);
    }
});

router.get('/payments',Auth,async(req,res)=>{
    const account = req.userId;
    const transactions = await Transactions.find({Sender: account});
    
    res.status(200).json({payments:transactions.length});
});

module.exports = router;    