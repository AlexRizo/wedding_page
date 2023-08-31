(() => {
    'use strict';
    
    const body = document.querySelector('.page');
    const form = document.querySelector('form');
    const btnSave = document.querySelector('.btn-save');
    const cardHeader = document.querySelector('.card-header');
    const cardTitle = document.querySelector('.card-title');

    const orderId = document.getElementById('id').value;

    btnSave.addEventListener('click', () => {
        form.submit();
    })

    form.addEventListener('submit', (ev) => {
        alert('se ha enviado el formulario')
        ev.preventDefault();
    })

    const formByStep = (title = 'Llena los datos', step = 0, data = {}) => {
        const step1 =  `
            <div class="col-md-6 mb-3">
                <label for="boyfriend" class="form-label">Nombre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend" name="boyfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend" class="form-label">Nombre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend" name="girlfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_email" class="form-label">Correo de la pareja 1</label>
                <input required type="email" class="form-control" id="boyfriend_email" name="boyfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_email" class="form-label">Correo de la pareja 2</label>
                <input required type="email" class="form-control" id="girlfriend_email" name="girlfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_photo" class="form-label">Foto de la pareja 1</label>
                <input required class="form-control" type="file" id="boyfriend_photo" name="boyfriend_photo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_photo" class="form-label">Foto de la pareja 2</label>
                <input required class="form-control" type="file" id="girlfriend_photo" name="girlfriend_photo">
            </div>
            <div class="col-12 mb-4">
                <label for="inputAddress2" class="form-label">Fecha de la boda:</label>
                <input required type="date" class="form-control" id="wedding_date" name="wedding_date">
            </div>
        `;

        const step2 =  `
            <div class="col-md-6 mb-3">
                <label for="godfather" class="form-label">Nombre del padrino</label>
                <input required type="text" class="form-control" id="godfather" name="godfather">
            </div>
            <div class="col-md-6 mb-3">
                <label for="godmother" class="form-label">Nombre de la madrina</label>
                <input required type="text" class="form-control" id="godmother" name="godmother">
            </div>
            <h5 class="my-3">Datos de los padres de la pareja</h5>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_father" class="form-label">Padre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend_father" name="boyfriend_father">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_mother" class="form-label">Madre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend_mother" name="boyfriend_mother">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_father" class="form-label">Padre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend_father" name="girlfriend_father">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_mother" class="form-label">Madre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend_mother" name="girlfriend_mother">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_parents_photo" class="form-label">Foto de los padres de la pareja 1</label>
                <input required class="form-control" type="file" id="boyfriend_parents_photo" name="boyfriend_parents_photo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_parents_photo" class="form-label">Foto de los padres de la pareja 2</label>
                <input required class="form-control" type="file" id="girlfriend_parents_photo" name="girlfriend_parents_photo">
            </div>
        `;

        const step3 =  `
            <div class="col-md-6 mb-3">
                <label for="boyfriend" class="form-label">Nombre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend" name="boyfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend" class="form-label">Nombre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_email" class="form-label">Correo de la pareja 1</label>
                <input required type="email" class="form-control" id="boyfriend_email" name="boyfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_email" class="form-label">Correo de la pareja 2</label>
                <input required type="email" class="form-control" id="girlfriend_email" name="girlfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_photo" class="form-label">Foto de la pareja 1</label>
                <input required class="form-control" type="file" id="boyfriend_photo" name="boyfriend_photo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_photo" class="form-label">Foto de la pareja 2</label>
                <input required class="form-control" type="file" id="girlfriend_photo" name="girlfriend_photo">
            </div>
            <div class="col-12 mb-4">
                <label for="inputAddress2" class="form-label">Fecha de la boda:</label>
                <input required type="date" class="form-control" id="wedding_date" name="wedding_date">
            </div>
        `;

        const step4 =  `
            <div class="col-md-6 mb-3">
                <label for="boyfriend" class="form-label">Nombre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend" name="boyfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend" class="form-label">Nombre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_email" class="form-label">Correo de la pareja 1</label>
                <input required type="email" class="form-control" id="boyfriend_email" name="boyfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_email" class="form-label">Correo de la pareja 2</label>
                <input required type="email" class="form-control" id="girlfriend_email" name="girlfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_photo" class="form-label">Foto de la pareja 1</label>
                <input required class="form-control" type="file" id="boyfriend_photo" name="boyfriend_photo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_photo" class="form-label">Foto de la pareja 2</label>
                <input required class="form-control" type="file" id="girlfriend_photo" name="girlfriend_photo">
            </div>
            <div class="col-12 mb-4">
                <label for="inputAddress2" class="form-label">Fecha de la boda:</label>
                <input required type="date" class="form-control" id="wedding_date" name="wedding_date">
            </div>
        `;

        const step5 =  `
            <div class="col-md-6 mb-3">
                <label for="boyfriend" class="form-label">Nombre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend" name="boyfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend" class="form-label">Nombre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_email" class="form-label">Correo de la pareja 1</label>
                <input required type="email" class="form-control" id="boyfriend_email" name="boyfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_email" class="form-label">Correo de la pareja 2</label>
                <input required type="email" class="form-control" id="girlfriend_email" name="girlfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_photo" class="form-label">Foto de la pareja 1</label>
                <input required class="form-control" type="file" id="boyfriend_photo" name="boyfriend_photo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_photo" class="form-label">Foto de la pareja 2</label>
                <input required class="form-control" type="file" id="girlfriend_photo" name="girlfriend_photo">
            </div>
            <div class="col-12 mb-4">
                <label for="inputAddress2" class="form-label">Fecha de la boda:</label>
                <input required type="date" class="form-control" id="wedding_date" name="wedding_date">
            </div>
        `;

        const step6 =  `
            <div class="col-md-6 mb-3">
                <label for="boyfriend" class="form-label">Nombre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend" name="boyfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend" class="form-label">Nombre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_email" class="form-label">Correo de la pareja 1</label>
                <input required type="email" class="form-control" id="boyfriend_email" name="boyfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_email" class="form-label">Correo de la pareja 2</label>
                <input required type="email" class="form-control" id="girlfriend_email" name="girlfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_photo" class="form-label">Foto de la pareja 1</label>
                <input required class="form-control" type="file" id="boyfriend_photo" name="boyfriend_photo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_photo" class="form-label">Foto de la pareja 2</label>
                <input required class="form-control" type="file" id="girlfriend_photo" name="girlfriend_photo">
            </div>
            <div class="col-12 mb-4">
                <label for="inputAddress2" class="form-label">Fecha de la boda:</label>
                <input required type="date" class="form-control" id="wedding_date" name="wedding_date">
            </div>
        `;

        const step7 =  `
            <div class="col-md-6 mb-3">
                <label for="boyfriend" class="form-label">Nombre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend" name="boyfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend" class="form-label">Nombre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_email" class="form-label">Correo de la pareja 1</label>
                <input required type="email" class="form-control" id="boyfriend_email" name="boyfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_email" class="form-label">Correo de la pareja 2</label>
                <input required type="email" class="form-control" id="girlfriend_email" name="girlfriend_email" placeholder="example@email.com">
            </div>
            <div class="col-md-6 mb-3">
                <label for="boyfriend_photo" class="form-label">Foto de la pareja 1</label>
                <input required class="form-control" type="file" id="boyfriend_photo" name="boyfriend_photo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend_photo" class="form-label">Foto de la pareja 2</label>
                <input required class="form-control" type="file" id="girlfriend_photo" name="girlfriend_photo">
            </div>
            <div class="col-12 mb-4">
                <label for="inputAddress2" class="form-label">Fecha de la boda:</label>
                <input required type="date" class="form-control" id="wedding_date" name="wedding_date">
            </div>
        `;
        
        switch (step) {
            case 1:
                form.innerHTML = step1;
                break;

            case 2:
                form.innerHTML = step2;
                break;

            case 3:
                form.innerHTML = step3;
                break;

            case 4:
                form.innerHTML = step4;
                break;

            case 5:
                form.innerHTML = step5;
                break;

            case 6:
                form.innerHTML = step6;
                break;

            case 7:
                form.innerHTML = step7;
                break;
        
            default:
                sendNotification('Ha ocurrido un error desconocido.', 'Si el error persiste comunícate con nosotros.')
                break;
        }

        cardHeader.innerText = title;
        cardTitle.innerText = `Paso ${step} / 7`;

    }

    socket.emit('get-actuallly-step', orderId);

    socket.on('set-actuallly-step', (orderStep) => {
        switch (orderStep.id) {
            case 1:
                formByStep(orderStep.name, orderStep.id)
                break;

            case 2:
                formByStep(orderStep.name, orderStep.id)
                break;

            case 3:
                formByStep(orderStep.name, orderStep.id)
                break;

            case 4:
                formByStep(orderStep.name, orderStep.id)
                break;

            case 5:
                formByStep(orderStep.name, orderStep.id)
                break;

            case 6:
                formByStep(orderStep.name, orderStep.id)
                break;

            case 7:
                formByStep(orderStep.name, orderStep.id)
                break;

            default:
                sendNotification('Ha ocurrido un error desconocido.', 'Si el error persiste comunícate con nosotros.')
                break;
        }
    });


})();