const Event=require('../../models/event');
const User=require('../../models/user');
const Booking=require('../../models/booking');
const bcrypt=require('bcryptjs');
const date=require('../../helpers/date');
const jwt=require('jsonwebtoken');
const eventResolver=require('./event');
const bookingResolver=require('./booking');
const userResolver=require('./user');
const authResolver=require('./auth');

module.exports={
    events:eventResolver.events,
    createEvent:eventResolver.createEvent,
    updateEvent:eventResolver.updateEvent,
    deleteEvent:eventResolver.deleteEvent,
    booking:bookingResolver.booking,
    bookEvent:bookingResolver.bookEvent,
    cancelBooking:bookingResolver.cancelBooking,
    createUser:userResolver.createUser,
    login:authResolver.login
}