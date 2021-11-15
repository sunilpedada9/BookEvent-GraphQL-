const Event=require('../../models/event');
const User=require('../../models/user');
const {transformEvent}=require('../../helpers/merge');
const Booking=require('../../models/booking');

var events=async()=>{
    return await Event.find()
    //.populate("creator")
        .then(result=>{
            return result.map(event=>{
                return transformEvent(event);
            })
        })
        .catch(err=>{
            //console.log("in err",err)
            throw err;
        })
}

var createEvent=async(args,req)=>{
    if(!req.isAuth){
        throw new Error('Unauthenticated!')
    }
    return await Event({
        title:args.eventInput.title,
        price:args.eventInput.price,
        description:args.eventInput.description,
        date:new Date().toString(),
        creator:req.userID
    })
    .save()
    .then(async(result)=>{
        console.log("user",req.userID)
        return await User.findById(req.userID)
        .then(async(user)=>{
            console.log("user",user)
            if(!user){
                throw new Error('User not exist!.');
            }
            await user.createEvents.push(result);
            user.save();
            return result;
        })
    })
    .catch((err)=>{
        console.log("@@@",err)
        return err;
    })
}

var updateEvent=async(args)=>{
    var eventID=args.eventID;
    if(!eventID){
        throw Error("Event ID need for update!.")
    };
    // console.log("@",args)
    return await Event.updateOne({_id:eventID},args.updateInput)
    .then(async(e)=>{
        if(!e.modifiedCount){
            throw Error("Can't update!")
        }
        return await Event.findOne({_id:eventID})
        .then(async(result)=>{
            return transformEvent(result);
        })
    })
    .catch(err=>{
        throw err;
    })
}

var deleteEvent=async(args)=>{
    if(!args.eventID){
        throw Error("Event id require!")
    }
    console.log(args.eventID)
    var isBooked= await Booking.findOne({event:args.eventID});
    //console.log("isBooked",isBooked);
    if(isBooked){
        throw new Error('Event is exist in bookings,can not remove!')
    }
    return await Event.deleteOne({_id:args.eventID})
    .then(async(re)=>{
        console.log('@@',re)
        if(!re.deletedCount){
            return "Can't remove!";
        }
        return "Deleted successfully."
    })
    .catch(err=>{
        throw err;
    })
}

module.exports={events,createEvent,updateEvent,deleteEvent};