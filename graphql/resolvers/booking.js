const Booking=require('../../models/booking');
const Event=require('../../models/event')
const merge=require('../../helpers/merge');
const {transformBooking,transformEvent}=require('../../helpers/merge');

var booking=async()=>{
    return await Booking.find()
        .then(async(results)=>{
            console.log("@",results)
            return results.map(result=>{
                return transformBooking(result);
            })
        })
        .catch(err=>{
            throw err;
        })
}

var bookEvent=async(args,req)=>{
    if(!req.isAuth){
        throw new Error('Unauthenticated!');
    }
    var userID=req.userID;
    if(!userID | args.eventID){
        throw Error('Invalid id!');
    }
    return await Event.findById(args.eventID)
        .then(async(event)=>{
            return await new Booking({
                user:userID,
                event:event
            })
            .save()
            .then(result=>{
                return transformBooking(result);
            })
        })
        .catch(err=>{
            throw err;
        })
}

var cancelBooking=async(args)=>{
    var event=await Booking.findById(args.bookingID).populate('event')
                .then(async(booking)=>{
                        return transformEvent(booking.event);      
                    })
                .catch(err=>{
                    throw err.message;
                })
    return await Booking.deleteOne({_id:args.bookingID})
                .then(async(re)=>{
                    if(!re.deletedCount){
                        throw Error("Can't delete!")
                    }
                    return event;
                })
                .catch(err=>{
                    throw err;
                })
}

module.exports={booking,bookEvent,cancelBooking};