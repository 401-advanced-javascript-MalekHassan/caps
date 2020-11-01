'use strict';

const events = require('./events');
require('./caps');
events.on('pickup', (payload) => handler(payload));

function handler(payload) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.id}`);
    events.emit('transit', payload);
    setTimeout(() => {
      console.log('Delivered');
      events.emit('delivered', payload);
    }, 3000);
  }, 1000);
}
