let parrafo = document.createElement("p"); 
parrafo.innerHTML = "<p> Seleccione sus entradas para el partido de la selección Argentina vs Brasil (Maximo 2 entradas por persona) </p>"
document.body.append (parrafo);
parrafo.classList.add("Parrafo");

const pintarEntradas = (data) => { 
    const contenedor = document.getElementById("entrada-contenedor"); // Mediante el DOM acceso al html

    data.forEach(entrada => {
        const div = document.createElement('div'); // creo un elemento html (div)
        div.classList.add('card'); // Le doy la clase card al div
        div.innerHTML += // modifico el html
                            `<div class="card-image">
                            <img src=${entrada.imagen}>
                            <h1 class="card-title">${entrada.tribuna}</h1>
                            <a class="btn-floating halfway-fab wabes-effect waves-light blue"><i id=${entrada.id} class="material-icons agregar">add_shopping_cart</i></a>
                            </div>

                            <div class="card-content">
                            <p>${entrada.desc}</p>
                            <p>$ ${entrada.precio}</p>
                            </div> `

        contenedor.appendChild(div);

    });
}
