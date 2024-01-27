// users schema--> user first name , last name , password, email
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
try{
mongoose.connect(process.env.MONGO_URL);
console.log("Mongo Db connected successfully")
}catch(err){
    console.log("Mongoose connection issue");
}
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:6,
        trim:true,
    },
    firstName:{
        type:String,
        required:true, 
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
    type:String,
       minLength:6,
       required:true,
       trim:true,
    }
});


const UserModel = mongoose.model('users',UserSchema);

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required : true,
    },
    balance : {
        type : Number,
        default : 0,
        required:true,
    }
})
const Account = mongoose.model('accounts',AccountSchema);
module.exports = {UserModel,Account};