var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var uuid=require('uuid');

var schema= new Schema({
    id:{
        type:String,
        require:true,
        default:()=>uuid.v4()
    },
    user:{
        type:String,
        ref:'User'
    },
    event:{
        type:String,
        ref:'Event'
    }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Booking',schema);