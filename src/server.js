import express from 'express';
import compression from 'compression';
import expressJWT from 'express-jwt';
import expressGraphQL from 'express-graphql';
import http from 'http';
import SocketIO from 'socket.io';
import jsonwebtoken from 'jsonwebtoken';
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

express.static.mime.define({
  'text/javascript': ['js'],
  'text/html': ['html'],
  'text/css': ['css'],
  'application/x-compressed': ['gz'],
  'application/json': ['json'],
  'audio/mpeg': ['mp3']
});

app.use(compression());
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
    console.log(socketEvent.event);

    socket.on(socketEvent.event, (payload = {}) => {
      try {
        const userData = jsonwebtoken.verify(payload.token, secret);
        socketEvent.handler({
          ...payload,
          userData
        }, users, socket);
      } catch (e) {
        // don't handle this request
        console.log('###### START SOCKET_EVENT_ERROR');
        console.log(e);
        console.log('###### END SOCKET_EVENT_ERROR');
      }
    });
  });
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));