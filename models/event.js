const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const uuid=require('uuid');

var eventSchema=new Schema({
    id:{
        type:String,
        require:true,
        default:()=>uuid.v4()
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    creator:{
        type:String,
        ref:"User"
    }
    });

module.exports=mongoose.model('Event',eventSchema);