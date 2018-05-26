import express from 'express';
import expressJWT from 'express-jwt';
import expressGraphQL from 'express-graphql';
import http from 'http';
import SocketIO from 'socket.io';
import graphqlSchema from './graphql/schema';
import secret from './secret';
import socketEvents from './sockets';

const app = express();
app.disable('x-powered-by');

const server = http.createServer(app);

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

/**
 * socket
 */

const io = SocketIO(server);
let users = {};

io.on('connection', socket => {
  socketEvents.forEach(socketEvent => {
    socket.on(socketEvent.event, (payload = {}) => {
      socketEvent.handler(payload, users);
    });
  });
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));