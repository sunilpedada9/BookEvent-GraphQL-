const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const uuid=require("uuid");

var User=new Schema({
    id:{
        type:String,
        require:true,
        default:()=>uuid.v4()
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    createEvents:[
        {
            type:String,
            ref:"Event"
        }
    ]
});

module.exports=mongoose.model("User",User);