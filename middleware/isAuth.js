const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        req.isAuth=false;
        return next();
    }
    const token=authHeader.split(' ')[1]
    //console.log("auth",token)
    if(!token || token===''){
        req.isAuth=false;
        return next();
    }
    //console.log(authHeader)
    jwt.verify(token,'EventBooking',(err,decoded)=>{
        if(err){
            req.isAuth=false;
            return next();
            }
        req.isAuth=true;
        req.userID=decoded.userID;
        return next();
    })
}