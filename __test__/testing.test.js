'use strict';

const events = require('../events');

xdescribe('Event Driven', () => {
  let order = {
    storeName: 'JH45',
    orderId: 89625,
    customerName: 'Ahmad',
    address: 'UAE',
  };

  let spy = jest.spyOn(console, 'log').mockImplementation();

  it('pick up', () => {
    events.emit('pickup', order);
    console.log(spy);
    expect(spy).toHaveBeenCalled();
  });
  it('transit', () => {
    events.emit('transit', order);
    expect(spy).toHaveBeenCalled();
  });
  it('delivered', () => {
    events.emit('delivered', order);
    expect(spy).toHaveBeenCalled();
  });
});
