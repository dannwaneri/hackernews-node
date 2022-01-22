const {ApolloServer} = require('apollo-server'); // help you build production-ready GraphQL servers.


const typeDefs = ` 
    type Query{
        info:String!
    }

`



// defines your GraphQL schema. Here, it defines a simple Query type with one field called info. 
// This field has the type String!. 
// The exclamation mark in the type definition means that this field is required and can never be null.



const resolvers = {
    Query : {
        info: () => `This is the API of a Hackernews Clone`
    }
    
}



// resolvers object is the actual implementation of the GraphQL schema
// Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.

const server = new ApolloServer({typeDefs, resolvers})

// the schema and resolvers are bundled and passed to ApolloServer which is imported from apollo-server. 
// This tells the server what API operations are accepted and how they should be resolved.



server.listen().then(({url}) => console.log(`server is running on ${url}`))