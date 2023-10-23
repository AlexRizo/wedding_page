(() => {
    'use strict';
    
    const body = document.querySelector('.page');
    const layoutsDiv = document.querySelector('.layouts-container');
    
    const layout = () => {
        fetch(`${ url }/layout/get-all`, {
            method: 'GET',
            headers: {
                tkn: token
            }
        })
        .then(response => response.json())
        .then(({ layouts }) => {
            
            let children = ``;
            console.log(layouts.rows);
            layouts.rows.forEach(layout => {
                children += `
                <div class="col">
                    <div class="card hover-effect" style="height: 100%;">
                        <img src="${ layout.LayoutPicture.url }" class="card-img-top" alt="${ layout.name }_picture">
                        <div class="card-body row">
                            <h5 class="card-title">${ layout.name }</h5>
                            <p class="card-text">${ layout.description }</p>
                            <div class="align-self-end">
                                <a href="#" class="btn btn-dark">Seleccionar</a>
                                <a href="${ url }/layout/demo/${ layout.id }" class="btn btn-primary">Ver</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });

            removeLoader();
            layoutsDiv.innerHTML = children;
        })
        .catch(console.error);
    }

    layout();
})();