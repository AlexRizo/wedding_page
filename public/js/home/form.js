(() => {
    'use strict';
    
    const body = document.querySelector('.page');
    const form = document.querySelector('form');
    const btnSave = document.querySelector('.btn-save');
    const cardHeader = document.querySelector('.card-header');
    const cardTitle = document.querySelector('.card-title');

    const orderId = document.getElementById('id').value;
    let stepId = 0;

    form.addEventListener ('submit', async(ev) => {
        ev.preventDefault();
        
        const data = {};
        const formData = new FormData()

        const inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            if (input.type === 'file') {
                formData.append(input.name, { 1: input.name, 2: input.files[0].name});
                formData.append(`${ input.name }`, input.files[0]);
            }else {
                data[input.name] = input.value;
            }
        });

        console.log(formData.values('girlfriend_photo'), formData.values({1: 'boyfriend_photo'}));

        formData.append('stepId', stepId);
        formData.append('orderId', orderId);

        fetch(`${ url }/order/image/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'tkn': localStorage.getItem('tkn')
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.error) {
                return sendNotification('Ha ocurrido un error', resp.error);
            }

            socket.emit('send-order-data', data);
        });        
    });

    const formByStep = (title = 'Llena los datos', step = 0, data = {}) => {
        const step1 =  `
            <div class="col-md-6 mb-3">
                <label for="boyfriend" class="form-label">Nombre de la pareja 1</label>
                <input required type="text" class="form-control" id="boyfriend" name="boyfriend_name" placeholder="Nombre completo">
            </div>
            <div class="col-md-6 mb-3">
                <label for="girlfriend" class="form-label">Nombre de la pareja 2</label>
                <input required type="text" class="form-control" id="girlfriend" name="girlfriend_name" placeholder="Nombre completo">
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
                <label for="wedding_date" class="form-label">Fecha de la boda:</label>
                <input required type="date" class="form-control" id="wedding_date" name="wedding_date">
            </div>
            <div class="col-12 mb-5">
                <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                <button type="submit" class="btn btn-dark btn-save">Guardar</button>
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
            <div class="col-12 mb-5">
                <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                <button type="submit" class="btn btn-dark btn-save">Guardar</button>
            </div>
        `;

        const step3 =  `
            <div class="col-md-6 mb-3">
                <label for="church" class="form-label">Iglesia</label>
                <input required type="text" class="form-control" id="church" name="church">
            </div>
            <div class="col-md-6 mb-3">
                <label for="church_time" class="form-label">Hora de la boda</label>
                <input required type="time" class="form-control" id="church_time" name="church_time">
            </div>
            <div class="mb-3">
                <label for="church_location" class="form-label">Ubicación de la iglesia</label>
                <input required type="text" class="form-control" id="church_location" name="church_location">
            </div>
            <div class="mb-3">
                <label for="church_references">Referencias de la iglesia</label>
                <textarea class="form-control" placeholder="Referencias de cómo llegar..." id="church_references" style="height: 100px"></textarea>
            </div>
            <div class="col-12 mb-5">
                <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                <button type="submit" class="btn btn-dark btn-save">Guardar</button>
            </div>
        `;

        const step4 =  `
            <div class="col-md-6 mb-3">
                <label for="event" class="form-label">Lugar del evento</label>
                <input required type="text" class="form-control" id="event" name="event">
            </div>
            <div class="col-md-6 mb-3">
                <label for="event_time" class="form-label">Hora del evento</label>
                <input required type="time" class="form-control" id="event_time" name="event_time">
            </div>
            <div class="mb-3">
                <label for="event_location" class="form-label">Ubicación del evento</label>
                <input required type="text" class="form-control" id="event_location" name="event_location">
            </div>
            <div class="mb-3">
                <label for="event_references">Referencias delugar del evento</label>
                <textarea class="form-control" placeholder="Referencias de cómo llegar..." id="event_references" name="event_references" style="height: 100px"></textarea>
            </div>
            <div class="col-12 mb-5">
                <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                <button type="submit" class="btn btn-dark btn-save">Guardar</button>
            </div>
        `;

        const step5 =  `
            <div class="ladies">
                <div class="mb-3">
                    <label for="ladies" class="form-label">Dama de compaía 1</label>
                    <input required type="text" class="form-control" id="ladies" name="ladies">
                </div>
                <div class="mb-3">
                    <label for="ladies" class="form-label">Dama de compaía 2</label>
                    <input required type="text" class="form-control" id="ladies" name="ladies">
                </div>
                <div class="mb-3">
                    <label for="ladies" class="form-label">Dama de compaía 3</label>
                    <input required type="text" class="form-control" id="ladies" name="ladies">
                </div>
                <button type="button" class="mb-3 btn btn-dark add-ladies">Añadir Acompañante</button>
            </div>
            <div class="gentlemen">
                <div class="mb-3">
                    <label for="gentlemen" class="form-label">Caballero de compaía 1</label>
                    <input required type="text" class="form-control" id="gentlemen" name="gentlemen">
                </div>
                <div class="mb-3">
                    <label for="gentlemen" class="form-label">Caballero de compaía 2</label>
                    <input required type="text" class="form-control" id="gentlemen" name="gentlemen">
                </div>
                <div class="mb-3">
                    <label for="gentlemen" class="form-label">Caballero de compaía 3</label>
                    <input required type="text" class="form-control" id="gentlemen" name="gentlemen">
                </div>
                <button type="button" class="mb-3 btn btn-dark add-gentleman">Añadir Acompañante</button>
            </div>
            <div class="col-12 mb-5">
                <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                <button type="submit" class="btn btn-dark btn-save">Guardar</button>
            </div>
        `;

        const step6 =  `
            <div class="mb-3">
                <label for="men_clothes" class="form-label">Vestimenta en hombres</label>
                <input required type="text" class="form-control" id="men_clothes" name="men_clothes">
            </div>
            <div class="mb-3">
                <label for="women_clothes" class="form-label">Vestimenta en mujeres</label>
                <input required type="text" class="form-control" id="women_clothes" name="women_clothes">
            </div>
            <div class="mb-3">
                <label for="considerations">Consideraciones</label>
                <textarea class="form-control" placeholder="Consideraciones en la vestimenta, asistencia de infantes, etc..." id="considerations" name="considerations" style="height: 100px"></textarea>
            </div>
            <div class="mb-3">
                <label for="gif_link" class="form-label">Link de lista de regalos</label>
                <input required type="text" class="form-control" id="gif_link" name="gif_link">
            </div>
            <div class="mb-3">
                <label for="bank" class="form-label">Cuenta de banco</label>
                <input required type="number" class="form-control" id="bank" name="bank">
            </div>
            <div class="mb-3">
                <label for="history">Nuestra historia</label>
                <textarea class="form-control" placeholder="Su historia de amor..." id="history" name="history" style="height: 100px"></textarea>
            </div>
            <div class="col-12 mb-5">
                <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                <button type="submit" class="btn btn-dark btn-save">Guardar</button>
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
        
            default:
                sendNotification('Ha ocurrido un error desconocido.', 'Si el error persiste comunícate con nosotros.')
                break;
        }

        cardHeader.innerText = title;
        cardTitle.innerText = `Paso ${step} / 6`;
    
    }

    socket.emit('get-actuallly-step', orderId);

    socket.on('set-actuallly-step', (orderStep) => {
        stepId = orderStep.id;
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

            default:
                sendNotification('Ha ocurrido un error desconocido.', 'Si el error persiste comunícate con nosotros.')
                break;
        }
    });

    socket.on('data-saved', (response) => {
        return sendNotification('Datos enviados', 'Se han enviado los datos correctamente.')
    });
})();