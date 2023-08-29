(() => {
    'use strict';

    socket.emit('get-all-my-orders');

    socket.on('set-all-my-orders', (orders) => {
        console.log(orders);
    });
})();