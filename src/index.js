const {ApolloServer} = require('apollo-server'); // help you build production-ready GraphQL servers.
const fs = require('fs')
const path = require('path')


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }];


const resolvers = {
    Query : {
        info: () => `This is the API of a Hackernews Clone`,
     feed : () => links,
     get_link_by_id:(parent,args) => {
     const link = links.find(link => link.id === args.id)
     return link;
     }
    },
    
    Mutation:{
        post: (parent,args) => {
            let idCounts = links.length
            const link = {
                id:`link-${idCounts++}`,
                description:args.description,
                url:args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent,args) => {
            const link = links.find(link => link.id === args.id)
            link.url = args.url ? args.url : link.url;
            if(link.description){
                args.description = link.description
            }
            return link
        },
        deleteLink: (parent,args) => {
            const index = links.findIndex(link => link.id === args.id);
            const link = links[index];
            links.splice(index, 1)
            return link;
        } 
    }
}

// resolvers object is the actual implementation of the GraphQL schema
// Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.

const server = new ApolloServer({
    typeDefs:fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),'utf8'),
    resolvers
});

// the schema and resolvers are bundled and passed to ApolloServer which is imported from apollo-server. 
// This tells the server what API operations are accepted and how they should be resolved.
// One convenient thing about the constructor of the GraphQLServer is that typeDefs can be 
// provided either directly as a string (as you previously did) or 
// by referencing a file that contains your schema definition (this is what you’re doing now).


server.listen().then(({url}) => console.log(`server is running on ${url}`))