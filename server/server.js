const express = require('express');
const expressGraphQL = require('express-graphql');
const session = require('express-session');
const schema = require('./schema/schema');
const fs = require('fs');
const http = require('http');
const https = require('https');

const key = fs.readFileSync('../../.secret/key.pem', 'utf8');
const cert = fs.readFileSync('../../.secret/cert.pem', 'utf8');

const app = express();
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

httpServer.listen(8080);
httpsServer.listen(8443);
