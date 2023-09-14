(() => {
    'use strict';
    
    const body = document.querySelector('.page');
    
    const paintBody = (content = '') => {
        return body.innerHTML = content;
    }
    socket.emit('get-all-my-orders');

    socket.on('set-all-my-orders', (orders) => {
        console.log(orders);
        let contentPage = ``;

        orders.forEach(order => {
            contentPage += `
            <div class="card mb-3 col-7">
                <h5 class="card-header">Pedido no. #${ order.serial_number }</h5>
                <div class="card-body">
                    <h5 class="card-title">${ order.name }</h5>
                    <p class="text-secondary">Estado: <span class="text-decoration-underline">${ (order.status ? 'Completado' : 'Pendiente') }</span></p>
                    <p class="card-text">${ order.description }</p>
                    ${(order.status) ? '<a href="/order/' + order.userId + '/' + order.serial_number + '" class="btn btn-dark">Ver Pedido</a>' : '<a href="/order/complete/' + order.userId + '/' + order.serial_number + '" class="btn btn-dark">Completar pedido</a>'}
                </div>
            </div>
            `;
        });

        return paintBody(contentPage);
    });
})();