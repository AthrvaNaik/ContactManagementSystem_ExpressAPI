const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true,"Please Add The Name"]
    },
    email:{
        type:String,
        required:[true,"Please Add The Email"]
    },
    phone:{
        type:String,
        required:[true,"Please Add The Phone Number"]
    },

},{
    timestamps:true,
});

module.exports=mongoose.model("Contact",contactSchema)