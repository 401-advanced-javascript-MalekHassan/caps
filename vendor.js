'use strict';
const faker = require('faker');
require('dotenv').config();
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const storeName = process.env.STORE_NAME || 'test';

client.connect(PORT, HOST, () => {
  console.log('Vendor Connected');
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
    client.write(message);
  }, 5000);

  client.on('data', (bufferData) => {
    const dataObj = JSON.parse(bufferData);
    if (dataObj.event === 'delivered') {
      console.log(`Thanks you for delivering ${dataObj.payload.orderID}`);
    }
  });

  client.on('close', () => console.log('Connection closed!'));
  client.on('error', (err) => console.log('Logger Error', err.message));
});
