const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength:4
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data not valid")
            }
        }
    },
    photoUrl: {
         type: String,
         default:"" // need to paste photo link
    },
    about: {
        type:String,
        default:"This is My Info"
    },
    skills:{
        type:[String]

    }
    // createdAt:{
    //     type:Date
    // }
},
{
    //  for saving the data
    timestamps:true
});
const User = mongoose.model("User", userSchema);
module.exports = User;