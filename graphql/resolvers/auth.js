const User=require('../../models/user');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');

var login=async(args)=>{
    console.log("in ligin")
    var user=await User.findOne({email:args.email})
    if(!user){
        throw new Error("User not exist!");
        }
    var isValid= await bcrypt.compare(args.password,user.password);
    if(!isValid){
        throw new Error('Password is invalid!.')
    }
    var token= await jwt.sign({email:user.email,userID:user.id },'EventBooking',{
        expiresIn:'1h'
    });
    return {
        userID:user.id,
        token:token,
        tokenExpiration:1
    }

}

module.exports={login}