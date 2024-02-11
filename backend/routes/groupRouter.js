
const express = require('express');

const mongoose = require('mongoose');
const { Auth } = require('../middleware/auth');
const { Group, UserModel } = require('../db');

const group_router = express.Router();


group_router.post("/create",Auth,async(req,res)=>{
    try{
        
    const creator = await UserModel.findOne({_id:req.userId});
    req.body.users.push({userId:req.userId,username:creator.username});
const result = await Group.create({name:req.body.name, Creator:{userId:req.userId,username:creator.username},participants:req.body.users});
res.status(200).json({"msg" : `${req.body.name} Group creation Successfull`});
    }
    catch(err){
        console.log("group creation error");
        console.log(err);
    }
});

group_router.get("/crews",Auth,async(req,res)=>{
    
    const groups = await Group.find({});
   
    const selected_groups = groups.map((group)=>{
        
        if(group.Creator.userId == req.userId){
            return {group_id:group._id,name:group.name};
        }
        for(let i = 0; i < group.participants.length;i++){
            if(req.userId == group.participants[i].userId){
                return {group_id:group._id,name:group.name};
            }
        }
    });

    
    res.status(200).json({
        "groups" : selected_groups
    });
    

});

group_router.post("/find",Auth,async(req,res)=>{
    try{
    const resp = await Group.findOne({_id:req.body.groupId});
    res.status(200).json({"group" : resp});
    }
    catch(err){
        console.log("group creation error");
        console.log(err);
    }
});

group_router.post("/delete",Auth,async(req,res)=>{

    const group_id = req.body.group_id;
    const record = await Group.findOne({_id:group_id});
    const attempt_id = req.userId;
    if(attempt_id == record.Creator.userId){
        const result = await Group.deleteOne({_id:group_id});
        res.status(200).json({"msg":"Group deleteion Successful"});
    }
    else{
        res.status(413).json({"msg":"Not Authorized to delete"});
    }



});


module.exports = group_router;

