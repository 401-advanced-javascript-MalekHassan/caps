'use strict';

const events = require('./events');
require('./vendor');
require('./driver');
events.on('pickup', (payload) => log('pickup', payload));
events.on('transit', (payload) => log('transit', payload));
events.on('delivered', (payload) => log('delivered', payload));

function log(event, payload) {
  let time = new Date();
  console.log('EVENT LOG', { event, time, payload });
}
