const express=require('express');
const bodyParser=require('body-parser');
const express_graphql=require('express-graphql').graphqlHTTP;
const mongoose=require("mongoose");
const app=express();
const graphQLShema=require('./graphql/schema/index');
const graphQLResolvers=require('./graphql/resolvers/index');
const authMiddleware=require('./middleware/isAuth');

app.use(bodyParser.json()); 

app.use(authMiddleware);

app.use('/eventAPI',express_graphql({
    schema:graphQLShema,
    rootValue:graphQLResolvers,
    graphiql:true
}))

mongoose.connect("mongodb://localhost:27017/graphql-nodejs-react")
.then(
    ()=>{
        app.listen(4000,()=>{
            console.log('Sarver started at port 4000.');
        })
    }
    )
.catch(
    (error)=>{
        console.log(`Error occured ${error}`);
    }
)