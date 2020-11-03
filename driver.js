'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');
socket.on('pickup', function (data) {
  setTimeout(function () {
    console.log(`DRIVER: Picked up ${data.id}`);
    socket.emit('in-transit', data);
  }, 1500);
  setTimeout(function () {
    console.log(`DRIVER: Delivered ${data.id}`);
    socket.emit('delivered', data);
  }, 3000);
});
socket.on('close', function () {
  console.log('Logger Connection got closed');
});
