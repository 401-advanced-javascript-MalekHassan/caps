'use strict';
const faker = require('faker');
require('dotenv').config();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');
const storeName = process.env.STORE_NAME || 'test';

socket.emit('join', storeName);
socket.on('delivered', (data) => {
  console.log(`Thank you for delivering ${data.id}`);
});

setInterval(function () {
  let message = JSON.stringify({
    event: 'pickup',
    payload: {
      storeName,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    },
  });
  socket.emit('pickup', message);
}, 5000);
