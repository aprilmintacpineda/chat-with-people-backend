import express from 'express';
import expressJWT from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jsrsasign from 'jsrsasign';
import graphqlSchema from './graphql/schema';

const app = express();
const webDir = __dirname + '/web';
const publicDir = webDir + '/public';
const secret = 'how long should this be in order to be counted as strong?';
const pathsWithNoJWT = [
  '/api/login',
  '/api/register'
];

app.use('/public', express.static(publicDir));
app.use('/api', expressJWT({ secret }).unless({ path: pathsWithNoJWT }), expressGraphQL({
  schema: graphqlSchema,
  graphiql: true
}));
app.use('*', (request, response) => {
  response.sendFile(webDir + '/index.html');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));