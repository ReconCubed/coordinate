import express from 'express';
import expressGraphQL from 'express-graphql';
import session from 'express-session';
import schema from './schema/schema';

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

app.listen(4000, () => {
  console.log('Listening');
});
