const chalk = require('chalk')
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const graphqlHTTP = require('express-graphql')
const proxy = require('express-http-proxy')

const CONF = require('./conf')
const port = CONF.server.PORT || 3000;

const root = {
  ip(args, request) {
    return request.ip
  }
}
app.use('/graphql', graphqlHTTP({
  schema: require('./graphql/index').schema,
  rootValue: root,
  graphiql: true,
}))

/*
const fs = require('fs')
const path = require('path')
const STATIC_PATH = path.resolve(__dirname, '..', 'static')
app.use(express.static(STATIC_PATH));
*/
app.use('/', proxy('localhost:7749'))

function onConnection(socket) {
  socket.emit('connection', 'hello world')
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);



http.listen(port, () => console.log(`${chalk.green('starting listen')} :${chalk.blue(CONF.server.PORT)}`));
