(() => {
    'use strict';
    
    const body = document.querySelector('.page');
    const form = document.querySelector('form');
    const cardHeader = document.querySelector('.card-header');
    const cardTitle = document.querySelector('.card-title');
    
    const orderId = document.getElementById('id').value;
    let stepId = 0;

    const validateDate = (date) => {
        // Obtén la fecha actual en el formato "YYYY-MM-DD"
        const actualDate = new Date().toISOString().split('T')[0];
      
        // Compara la fecha ingresada con la fecha actual
        if (date < actualDate) {
          sendNotification('Ha ocurrido un error', 'La fecha no puede ser anterior a la fecha actual');
          return false;
        } else {
          return true;
        }
    }

    const getOrderData = () => {
        const inputs     = document.querySelectorAll('input')     || null,
              textsareas =  document.querySelectorAll('textarea') || null,
              selects    =  document.querySelectorAll('select')   || null,
              orderData  = new FormData();

        let status = true;

        // * Para inputs;
        if (inputs) {
            inputs.forEach(input => {
                // ? Si es necesario añade más validaciones para distintos inputs;
                if (input.type === 'file') {
                    orderData.append(input.name, { 1: input.name, 2: input.files[0].name });
                    orderData.append(input.name, input.files[0]);
                } else if (input.type === 'date') {
                    status = validateDate(input.value);
                    orderData.append(input.name, input.value);
                }else if (input.name === 'bank') {
                    orderData.append(input.name, input.value);
                } else {
                    console.log({ name: input.name, value: input.value });
                    orderData.append(input.name, input.value);
                }
            });
        }

        // * Para textareas;
        if (textsareas) {
            textsareas.forEach(textarea => {
                orderData.append(textarea.name, textarea.value);
            });
        }

        // * Para selects;
        if (selects) {
            selects.forEach(select => {
                orderData.append(select.name, select.value);
            });
        }

        orderData.append('stepId', stepId);

        return { orderData, status };
    }

    form.addEventListener ('submit', async(ev) => {
        ev.preventDefault();
        getLoader();
        
        const orderData = getOrderData();

        if (!orderData.status) {
            return false;
        }

        fetch(`${ url }/order/continue/${ orderId }`, {
            method: 'PUT',
            headers: {
                'tkn': localStorage.getItem('tkn'),
            },
            body: orderData.orderData
        })
        .then(response => response.json())
        .then(({ expressErrors = null, error = null, response = null })=> {
            if (expressErrors) {
                let errorString = '';
                
                expressErrors.forEach($error => {
                    errorString += `${ $error.msg } <br>`;
                });

                console.error(expressErrors);
                removeLoader();
                return sendNotification('Campos inválidos', errorString);
            } else if (error) {
                console.error(error);
                removeLoader();
                return sendNotification('Ha ocurrido un error', error);
            }

            socket.emit('get-actuallly-step', orderId);
            return sendNotification('Datos enviados', response);
        })
        .catch(console.error);
    });

    const formByStep = (title = 'Llena los datos', step = 0, data = {}) => {
        removeLoader()
        const steps = {
            1: `            
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
            `,
            2: `
                <div class="col-md-6 mb-3">
                    <label for="godfather" class="form-label">Nombre del padrino</label>
                    <input required type="text" class="form-control" id="godfather" name="godfather" placeholder="Nombre completo">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="godmother" class="form-label">Nombre de la madrina</label>
                    <input required type="text" class="form-control" id="godmother" name="godmother" placeholder="Nombre completo">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="godfather_photo" class="form-label">Foto del padrino</label>
                    <input required class="form-control" type="file" id="godfather_photo" name="godfather_photo">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="godmother_photo" class="form-label">Foto de la madrina</label>
                    <input required class="form-control" type="file" id="godmother_photo" name="godmother_photo">
                </div>
                <h5 class="my-3">Datos de los padres de la pareja</h5>
                <div class="col-md-6 mb-3">
                    <label for="boyfriend_father" class="form-label">Padre de la pareja 1</label>
                    <input required type="text" class="form-control" id="boyfriend_father" name="boyfriend_father" placeholder="Nombre completo">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="boyfriend_mother" class="form-label">Madre de la pareja 1</label>
                    <input required type="text" class="form-control" id="boyfriend_mother" name="boyfriend_mother" placeholder="Nombre completo">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="girlfriend_father" class="form-label">Padre de la pareja 2</label>
                    <input required type="text" class="form-control" id="girlfriend_father" name="girlfriend_father" placeholder="Nombre completo">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="girlfriend_mother" class="form-label">Madre de la pareja 2</label>
                    <input required type="text" class="form-control" id="girlfriend_mother" name="girlfriend_mother" placeholder="Nombre completo">
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
            `,
            3: `
                <div class="col-md-6 mb-3">
                    <label for="church" class="form-label">Iglesia</label>
                    <input required type="text" class="form-control" id="church" name="church">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="church_time" class="form-label">Hora de la boda</label>
                    <input required type="time" class="form-control" id="church_time" name="church_time">
                </div>
                <div class="mb-3">
                    <label for="church_photo" class="form-label">Foto de la iglesia</label>
                    <input required class="form-control" type="file" id="church_photo" name="church_photo">
                </div>
                <div class="mb-3">
                    <label for="church_location" class="form-label">Ubicación de la iglesia</label>
                    <input required type="text" class="form-control" id="church_location" name="church_location" placeholder="Ubicación / Link">
                </div>
                <div class="mb-3">
                    <label for="church_references">Referencias de la iglesia</label>
                    <textarea required class="form-control" placeholder="Referencias de cómo llegar..." id="church_references" name="church_references" style="height: 100px"></textarea>
                </div>
                <div class="col-12 mb-5">
                    <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                    <button type="submit" class="btn btn-dark btn-save">Guardar</button>
                </div>
            `,
            4: `
                <div class="col-md-6 mb-3">
                    <label for="event" class="form-label">Lugar del evento</label>
                    <input required type="text" class="form-control" id="event" name="event" maxLength="50">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="event_time" class="form-label">Hora del evento</label>
                    <input required type="time" class="form-control" id="event_time" name="event_time">
                </div>
                <div class="mb-3">
                    <label for="event_photo" class="form-label">Foto del lugar del evento</label>
                    <input required class="form-control" type="file" id="event_photo" name="event_photo">
                </div>
                <div class="mb-3">
                    <label for="event_location" class="form-label">Ubicación del evento</label>
                    <input required type="text" class="form-control" id="event_location" name="event_location" maxLength="100">
                </div>
                <div class="mb-3">
                    <label for="event_references">Referencias delugar del evento</label>
                    <textarea required class="form-control" placeholder="Referencias de cómo llegar..." id="event_references" name="event_references" style="height: 100px" maxLength="200"></textarea>
                </div>
                <div class="col-12 mb-5">
                    <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                    <button type="submit" class="btn btn-dark btn-save">Guardar</button>
                </div>
            `,
            5: `
                <div class="form-ladies">
                    <div class="ladies">
                        <div class="mb-3">
                            <label for="ladie" class="form-label">Dama de compaía</label>
                            <input required type="text" class="form-control" id="ladie" name="ladies" maxLength="50">
                        </div>
                        <div class="mb-3">
                            <label for="ladie" class="form-label">Dama de compaía</label>
                            <input required type="text" class="form-control" id="ladie" name="ladies" maxLength="50">
                        </div>
                        <div class="mb-3">
                            <label for="ladie" class="form-label">Dama de compaía</label>
                            <input required type="text" class="form-control" id="ladie" name="ladies" maxLength="50">
                        </div>
                    </div>
                    <button type="button" class="mb-3 btn btn-dark add-ladies" onclick="addInputTo('ladies', 'Dama')">Añadir Acompañante</button>
                </div>
                <div class="form-gentlemen">
                    <div class="gentlemen">
                        <div class="mb-3">
                            <label for="gentleman" class="form-label">Caballero de compaía</label>
                            <input required type="text" class="form-control" id="gentleman" name="gentlemen" maxLength="50">
                        </div>
                        <div class="mb-3">
                            <label for="gentleman" class="form-label">Caballero de compaía</label>
                            <input required type="text" class="form-control" id="gentleman" name="gentlemen" maxLength="50">
                        </div>
                        <div class="mb-3">
                            <label for="gentleman" class="form-label">Caballero de compaía</label>
                            <input required type="text" class="form-control" id="gentleman" name="gentlemen" maxLength="50">
                        </div>
                    </div>
                    <button type="button" class="mb-3 btn btn-dark add-gentlemen" onclick="addInputTo('gentlemen', 'Caballero')">Añadir Acompañante</button>
                </div>
                <div class="col-12 mb-5">
                    <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                    <button type="submit" class="btn btn-dark btn-save">Guardar</button>
                </div>
            `,
            6: `
                <div class="mb-3">
                    <label for="men_clothes" class="form-label">Vestimenta en hombres</label>
                    <input required type="text" class="form-control" id="men_clothes" name="men_clothes" maxLength="100">
                </div>
                <div class="mb-3">
                    <label for="women_clothes" class="form-label">Vestimenta en mujeres</label>
                    <input required type="text" class="form-control" id="women_clothes" name="women_clothes" maxLength="100">
                </div>
                <div class="mb-3">
                    <label for="considerations">Consideraciones</label>
                    <textarea class="form-control" placeholder="Consideraciones en la vestimenta, asistencia de infantes, etc..." id="considerations" name="considerations" style="height: 100px" maxLength="200"></textarea>
                </div>
                <div class="mb-3">
                    <label for="gif_link" class="form-label">Link de lista de regalos</label>
                    <input required type="text" class="form-control" id="gif_link" name="gif_link" maxLength="100">
                </div>
                <div class="mb-3">
                    <label for="bank" class="form-label">Número de tarjeta / Cuenta clave</label>
                    <input required type="text" class="form-control" id="bank" name="bank" maxLength="22" oninput="validCard(this)">
                </div>
                <div class="mb-3">
                    <label for="history">Nuestra historia</label>
                    <textarea class="form-control outline-danger" oninput="inputCounter(this, 'historyCounter')" placeholder="Su historia de amor..." id="history" name="history" style="height: 100px" maxLength="5000"></textarea>
                    <div class="text-end">
                        <span class="text-secondary" id="historyCounter">5000</span>
                    </div>
                </div>
                <div class="col-12 mb-5">
                    <!-- <button type="button" disabled class="btn btn-dark btn-back">Regresar</button> -->
                    <button type="submit" class="btn btn-dark btn-save">Guardar</button>
                </div>
            `,
            7: true
        };
        
        switch (step) {
            case 1:
                form.innerHTML = steps[1];
                break;

            case 2:
                form.innerHTML = steps[2];
                break;

            case 3:
                form.innerHTML = steps[3];
                break;

            case 4:
                form.innerHTML = steps[4];
                break;

            case 5:
                form.innerHTML = steps[5];
                break;

            case 6:
                form.innerHTML = steps[6];
                break;

            case 7:
                form.innerHTML = steps[7];
                break;
        
            default:
                sendNotification('Ha ocurrido un error desconocido', 'Si el error persiste vuelve a iniciar sesión.')
                break;
        }

        cardHeader.innerText = title;
        cardTitle.innerText = `Paso ${ step } / 7`;
    
    }

    const addInputTo = (origin = '', subject = '') => {
        const divInput = document.createElement('div');
        const input = `
            <label for="${ origin }" class="form-label">${ subject } de compaía</label>
            <input type="text" class="form-control" id="${ origin }" name="${ origin }">
        `;
        
        divInput.classList.add('mb-3');
        divInput.innerHTML = input;

        switch (origin) {
            case 'ladies':
                const ladiesDiv = document.querySelector('.ladies');
                ladiesDiv.appendChild(divInput);
                break;

            case 'gentlemen':
                const gentlemenDiv = document.querySelector('.gentlemen');
                gentlemenDiv.appendChild(divInput);
                break;
        
            default:
                alert('Bebé, lo que te pido, ven, dame lo que te exijo.');
                break;
        }
    }

    const inputCounter = (input, tag) => {
        const tagCounter = document.getElementById(tag),
              maxLength  = input.getAttribute('maxLength'),
              counter    = parseInt(maxLength) - input.value.length;
        
        tagCounter.innerText = counter;
        
        if (counter <= 0) {
            input.classList.add('border-warning', 'input-limit');
        } else {
            input.classList.remove('border-warning', 'input-limit');
        }
    }

    const validCard = (input) => {
        const invalidChar = input.value.replace(/\D/g, ''),
              groups      = invalidChar.match(/.{1,4}/g);
        if (groups) {
            input.value = groups.join(' ');
        } else {
            input.value = '';
        }
    }

    socket.emit('get-actuallly-step', orderId);

    socket.on('set-actuallly-step', (orderStep) => {
        stepId = orderStep.id;
                
        switch (orderStep.id) {
            case 1:
                formByStep(orderStep.name, stepId);
                break;

            case 2:
                formByStep(orderStep.name, stepId);
                break;

            case 3:
                formByStep(orderStep.name, stepId);
                break;

            case 4:
                formByStep(orderStep.name, stepId);
                break;

            case 5:
                formByStep(orderStep.name, stepId);
                break;

            case 6:
                formByStep(orderStep.name, stepId);
                break;

            case 7:
                window.location = `${ url }/layout/select`;
                break;

            default:
                sendNotification('Ha ocurrido un error desconocido.', 'Si el error persiste comunícate con administración.')
                break;
        }
    });

    socket.on('data-saved', () => {
        return sendNotification('Datos enviados', `Se han enviado los datos correctamente.`)
    });

    // ? Exports:
    window.addInputTo = addInputTo;
    window.inputCounter = inputCounter;
    window.validCard = validCard;
}) ();