// modulos
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

//typedef y resolvers
const typeDefs  = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello world';
        },
    },
};

//funcion que prende el server con GraphQL
async function startServer(){
    // inicializamos el server
    const app = express()
    //inicializamos apollo-server
    const apolloServer = new ApolloServer({
        //incluimos el esquema.
        typeDefs,
        resolvers,
    });
    
    //despues de la construccion del esquema el servidor apollo queda en espera
    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send('Hola desde apollo server');
    })

    app.listen(4000, () => console.log('corriendo en el puerto 4000'));

}
startServer();