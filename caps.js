'use strict';

const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('CORE', socket.id);
});
const caps = io.of('/caps');
caps.on('connection', (socket) => {
  console.log('connected', socket.id);
  socket.on('join', (room) => {
    console.log('registered as', room);
    socket.join(room);
  });
  socket.on('pickup', (payload) => {
    pickup('pickup', payload);
    caps.emit('pickup', payload);
  });
  socket.on('in-transite', (payload) => {
    pickup('in-transite', payload);
    caps.to(payload.storeName).emit('in-transit', payload);
  });
  socket.on('delivered', (payload) => {
    pickup('delivered', payload);
    caps.to(payload.storeName).emit('delivered', payload);
  });
});

function pickup(event, payload) {
  let time = new Date();
  console.log('Event', { event, time, payload });
}
