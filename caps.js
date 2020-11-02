'use strict';
const net = require('net');
const uuidv4 = require('uuid').v4;
const PORT = process.env.PORT || 4000;

const server = net.createServer();
server.listen(PORT, () => console.log(`Server is running on ${PORT}`));

const socketPool = {};
server.on('connection', (socket) => {
  // console.log(socket);
  console.log('Socket Connected!');
  const id = `socket-${uuidv4()}`;
  socketPool[id] = socket;
  // console.log(socketPool);
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('error', (e) => console.log('SOCKET ERROR', e.message));
  socket.on('end', (id) => delete socketPool[id]);
});
server.on('error', (e) => console.log('SERVER ERROR', e.message));

function dispatchEvent(buffer) {
  // console.log('buffer', buffer);
  for (let socket in socketPool) {
    // console.log('socket', socket);
    socketPool[socket].write(buffer);
  }
  const message = JSON.parse(buffer.toString().trim());
  if (message.event == 'pickup') {
    log('pickup', message);
  }
  if (message.event == 'in-transit') {
    log('in-transit', message);
  }
  if (message.event == 'delivered') {
    log('delivered', message);
  }
}

function log(event, payload) {
  console.log('EVENT', { event, time: new Date(), payload });
}
