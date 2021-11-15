const {buildSchema}=require('graphql');

module.exports=buildSchema(`
    type Event{
        _id:ID!
        title:String!
        description:String!
        price:Float!
        date:String
        creator:User!
    }
    type Booking{
        _id:ID
        user:User!
        event:Event!
        createdAt:String!
        updatedAt:String!
    }
    type User{
        _id:ID!
        email:String!
        password:String
        createEvents:[Event!]
    }
    type AuthData{
        userID:ID!
        token:String!
        tokenExpiration:Int!
    }
    input EventInput{
        title:String!
        price:Float!
        description:String!
        date:String!
    }
    input UserInput{
        email:String!
        password:String!
    }
    input updateEventInput{
        title:String
        price:Float
        description:String
        date:String
    }
    type RootQuery{
        events:[Event!]
        booking:[Booking!]
        login(email:String!,password:String!):AuthData!
    }
    type RootMutation{
        createEvent(eventInput:EventInput):Event
        createUser(userInput:UserInput):User
        updateEvent(eventID:String!,updateInput:updateEventInput):Event
        deleteEvent(eventID:String!):String
        bookEvent(eventID:ID!):Booking
        cancelBooking(bookingID:ID!):Event!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);