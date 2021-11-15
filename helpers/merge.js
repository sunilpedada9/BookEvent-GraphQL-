const User=require('../models/user');
const Event=require('../models/event');

var singleEvent=async(eventID)=>{
    return await Event.findById(eventID)
        .then(async(eventdt)=>{
            console.log("single result",eventdt._doc.creator);
            return {...eventdt._doc};
        })
        .catch(err=>
            {
                throw new Error(err.message);
            })
}

var eventsList=async(events)=>{
    console.log("eventslist",events);
    return await Event.find({_id:{$in:events}})
    .then(async(result)=>{
        console.log('result',result)
        return result.map(events=>{console.log("map",events._doc.creator) 
        return{...events._doc,creator:user.bind(this,events._doc.creator)}});
    })
    .catch(err=>{
        throw new Error(err.message);
    })
}

// Manual populate
var user=async(userID)=>{
    console.log('userID',userID)
    return await User.findById(userID)
    .then(async(user)=>{
        console.log("userdt",user);
        return {...user._doc,
                createEvents:eventsList.bind(this,user._doc.createEvents)};
    })
    .catch(err=>{
        throw new Error(err.message);
    })

}

// Transform event
var transformEvent= async(event)=>{
    console.log("##",event._doc.creator)
    return {...event._doc,_id:event.id,creator:user.bind(this,event._doc.creator)}
} 

// Transform booking
var transformBooking=async(booking)=>{
    console.log("trf",booking._doc.user)
    return {...booking._doc,
        user:user.bind(this,booking._doc.user),
        event:singleEvent.bind(this,booking._doc.event),
        createdAt:new Date(booking._doc.createdAt).toISOString(),
        updatedAt:new Date(booking._doc.updatedAt).toISOString()
    }
}

module.exports={transformEvent,transformBooking};