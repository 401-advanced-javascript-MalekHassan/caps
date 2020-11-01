'use strict';

const Events = require('events');

const eventsEmmiter = new Events(); // export the new instance

// Global Events pool
module.exports = eventsEmmiter;
