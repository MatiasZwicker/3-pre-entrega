let carrito = [];

const entradaContenedor = document.getElementById('entrada-contenedor');

// escucha el click y detecta su id
entradaContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarEntradaCarrito(e.target.id);
    }
});

const validarEntradaCarrito = (entradaId) => {
    //detecta si el producto que estoy recibiendo esta en el carrito (true) o si no esta (false)
    const estaRepetido = carrito.some(entrada => entrada.id == entradaId);

    if (!estaRepetido) {
        //si el producto no esta repetido, agregarlo al carrito (push)
        const entrada = entradas.find(entrada => entrada.id == entradaId);
        carrito.push(entrada);
        pintarEntradaCarrito(entrada);
        actualizarTotalesCarrito(carrito);
    } else {
        // si el producto esta repetido, sumar la cantida++
        const entrada = carrito.find(entrada => entrada.id == entradaId);
        const cantidad = document.getElementById(`cantidad${entrada.id}`);
        entrada.cantidad++
        cantidad.innerText = `Cantidad: ${entrada.cantidad}`;
        actualizarTotalesCarrito(carrito);
    }
};


const pintarEntradaCarrito = (entrada) => {

    const contenedor = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');
    div.classList.add('entradaEnCarrito');
    div.innerHTML = `
    <p>${entrada.tribuna}</p>
    <p>Precio: $${entrada.precio}</p>
    <p id=cantidad${entrada.id}>Cantidad: ${entrada.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${entrada.id}">X</button>

    `
    contenedor.appendChild(div);

};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    console.log('Total Cantidad:', totalCantidad);
    console.log('Total Compra:', totalCompra);
    guardarCarritoStorage(carrito);
    pintarTotalesCarrito(totalCantidad, totalCompra);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(entrada => {
        const div = document.createElement('div');
        div.classList.add('entradaEnCarrito');
        div.innerHTML = `
            <p>${entrada.tribuna}</p>
            <p>Precio: $${entrada.precio}</p>
            <p id=cantidad${entrada.id}>Cantidad: ${entrada.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${entrada.id}">X</button>
        `;

        contenedor.appendChild(div);
    });

    // Crear el botón de "Confirmar compra" después de agregar todos los elementos del carrito
   // const confirmarCompraButton = document.createElement('button');
    //confirmarCompraButton.id = 'confirmar-compra-button';
    //onfirmarCompraButton.textContent = 'Confirmar compra';

    // Agregar el botón al final del contenedor
    //contenedor.appendChild(confirmarCompraButton);
};

const eliminarEntradaCarrito = (entradaId) => {
    const entrada = carrito.find(entrada => entrada.id == entradaId);

    if (entrada) {
        if (entrada.cantidad > 1) {
            entrada.cantidad--;
            const cantidadElement = document.getElementById(`cantidad${entrada.id}`);
            cantidadElement.innerText = `Cantidad: ${entrada.cantidad}`;
        } else {
            const entradaIndex = carrito.findIndex(entrada => entrada.id == entradaId);
            carrito.splice(entradaIndex, 1);
            const entradaDiv = document.querySelector(`.entradaEnCarrito[value="${entrada.id}"]`);
            if (entradaDiv) {
                entradaDiv.remove();

            }
        }
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    }
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};


const obtenerCarritoStorage = () => {
    return JSON.parse(localStorage.getItem('carrito'));
};

const cargarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    }
};
cargarCarrito(); 


function borrarCarrito() {
    // Borra todos los elementos del carrito
    carrito = [];
    
    // Limpia el contenedor del carrito en el DOM
    const contenedor = document.getElementById('carrito-contenedor');
    contenedor.innerHTML = '';

    // Actualiza los totales del carrito
    actualizarTotalesCarrito(carrito);

    // Guarda el carrito vacío en el almacenamiento local si es necesario
    guardarCarritoStorage(carrito);
}