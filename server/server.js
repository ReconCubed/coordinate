const express = require('express');
const expressGraphQL = require('express-graphql');
const session = require('express-session');
const schema = require('./schema/schema');
const http = require('http');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Request-Headers', 'content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
}));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const httpServer = http.createServer(app);

module.exports = { httpServer };
