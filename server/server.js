const express = require('express');
const expressGraphQL = require('express-graphql');
const session = require('express-session');
const schema = require('./schema/schema');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');

const key = fs.readFileSync('../../.secret/key.pem', 'utf8');
const cert = fs.readFileSync('../../.secret/cert.pem', 'utf8');

const app = express();

app.use(function (req, res, next) {
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
const httpsServer = https.createServer({ key, cert }, app);

module.exports = { httpServer };
