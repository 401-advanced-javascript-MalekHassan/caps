'use strict';

// everything will fall in here
require('dotenv').config();
const events = require('./events');
const faker = require('faker');
require('./caps');
events.on('delivered', (payload) =>
  console.log(`VENDOR: Thank you for delivering ${payload.id}`)
);
// user fake order every 5 min==>
setInterval(function () {
  events.emit('pickup', {
    storeName: process.env.storeName || `TETE's store`,
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
    id: faker.random.number(),
  });
}, 5000);
