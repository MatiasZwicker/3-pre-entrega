const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito'); 
const alertt = document.querySelector ('#boton');

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.remove('modal-active'); 
});

modalContenedor.addEventListener('click', (e) => {
        cerrarCarrito.click();
    
});

modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('boton-eliminar')) {
        eliminarEntradaCarrito(e.target.value); 
    }
});


        alertt.addEventListener('click', () => {
            Swal.fire({
                icon: 'success',
                title: 'Su compra se realizo con exito'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Llama a la función para borrar el carrito
                    borrarCarrito();
                }
            });
        });
        