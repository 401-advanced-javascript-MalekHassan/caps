'use strict';
require('dotenv').config();
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

client.connect(PORT, HOST, () => {
  console.log('Driver Connected');
  client.on('data', (bufferData) => {
    const dataObj = JSON.parse(bufferData);
    if (dataObj.event === 'pickup') {
      setTimeout(function () {
        console.log(`picked up ${dataObj.payload.orderID}`);
        const message = JSON.stringify({
          event: 'in-transit',
          payload: dataObj.payload,
        });
        client.write(message);

        setTimeout(function () {
          console.log(`delivered up ${dataObj.payload.orderID}`);
          const message = JSON.stringify({
            event: 'delivered',
            payload: dataObj.payload,
          });
          client.write(message);
        }, 3000);
      }, 1000);
    }
  });
  client.on('close', () => console.log('Connection closed!'));
  client.on('error', (err) => console.log('Logger Error', err.message));
});
