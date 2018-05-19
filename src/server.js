import express from 'express';
import expressJWT from 'express-jwt';
import expressGraphQL from 'express-graphql';
import graphqlSchema from './graphql/schema';
import secret from './secret';

const app = express();
const publicDir = __dirname + '/public';
const pathsWithNoJWT = [
  '/api/login',
  '/api/register'
];

app.use('/public', express.static(publicDir));
app.use('/webfonts', express.static(publicDir + '/webfonts'));
app.use('/api', expressJWT({ secret }).unless({ path: pathsWithNoJWT }), expressGraphQL({
  schema: graphqlSchema,
  graphiql: true,
  formatError (err) {
    return err.message;
  }
}));
app.use('*', (request, response) => {
  response.sendFile(publicDir + '/index.html');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));