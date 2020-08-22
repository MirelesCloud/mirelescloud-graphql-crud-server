const { gql } = require('apollo-server-express')


const typeDefs = gql `
   type Movie {
     id: ID!
     name: String!
     producer: String!
     rating: Float!
   }
   type Query {
     movies: [Movie]
     movie(id: ID!): Movie
   }
   type Mutation {
     addMovie(name: String!, producer: String!, rating: Int!): Movie
     updateMovie(id: ID!, updateMovie: UpdateMovie): Movie
     deleteMovie(id: ID!): Movie
   }

   input AddMovie {
     name: String!
     producer: String!
     rating: Int!
   }
   input UpdateMovie {
     name: String
     producer: String
     rating: Int
   }
`


module.exports = typeDefs