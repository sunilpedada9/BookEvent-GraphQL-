const User=require('../../models/user');
const bcrypt=require('bcryptjs');

var createUser=async(args)=>{
    return await User.findOne({email:args.userInput.email}).then(
        async(user)=>{
            if(user){
                throw new Error('User is already exist!.');
            }
            return await bcrypt.hash(args.userInput.password,12)
    .then(async(password)=>{
        var userInput=User({
        email:args.userInput.email,
        password:password
    });
    return await userInput.save()
        .then(async(result)=>{
            console.log(result)
           return {...result._doc,password:null};
        })
        })
        }
    )
    .catch(async(err)=>{
        throw err;
    })
}

module.exports={createUser};