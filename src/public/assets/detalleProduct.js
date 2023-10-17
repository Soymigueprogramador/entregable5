const socket = io(); 

function cargarDetalleDelProducto(productId) {
    fetch(`/api/product/${productId}`)
        .then(res => res.json())
        .then(product => {
            const ulProduct = document.getElementById('mainProduct');
            ulProduct.innerHTML = `
                <h2>${product.title}</h2>
                <p>categoria: ${product.description}</p>
                <p>price: ${product.price}</p>
                <button id="${product.id}">Agregar al carrito</button>
            `;
        })
        .catch(error => {
            console.error('Error al cargar el detalle del producto', error);
        });
}

document.addEventListener("click", async (event) => {
    const productId = event.target.getAttribute('data-product-id');
    try {
        const respuesta = await fetch(`api/carrito/1/product/${productId}`, { 
            method: 'POST',
            headers: { 'content-type': 'application/json' }, 
        });

        if (!respuesta.ok) {
            console.log('Producto dentro del carrito');
            alert('Producto dentro del carrito');
        } else {
            console.log('Ups, algo salió mal y tu producto no se pudo agregar al carrito');
            alert('Ups, algo salió mal y tu producto no se pudo agregar al carrito');
        }
    } catch (error) { 
        console.error('Ocurrió un error al intentar agregar el producto al carrito', error);
    }
});