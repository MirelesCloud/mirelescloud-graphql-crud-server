const express = require('express');
const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const PORT = 4000
const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("All good"))
  .catch((e) => console.log(e))

const connection = mongoose.connection 
connection.once('open', () => {
  console.log('MongoDB is connected')
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    reportSchema: true
  }
})

const app = express()

app.use(bodyParser.json())
app.use('*', cors())

server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`🚀 Server ready at Port ` + PORT + `${server.graphqlPath }`)
})