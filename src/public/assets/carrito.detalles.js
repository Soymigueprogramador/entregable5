const cargarProductos = () => {
    let apiUrl = `/api/carrito/${carritoId}`;
    fetch(apiUrl)
        .then(data => {
            return data.json();
        })
        .then(data => { 
            console.log(data);
            let ul = '';
            data.carrito.product.forEach(product => { 
                ul += `<li id="${product.id}"> Id="${product.product.id}" Product: ${product.product.titulo} Cantidad: ${product.quantity} </li>`;
            });
            const ulProduct = document.getElementById('mainProduct');
            ulProduct.innerHTML = ul;
        });
}

cargarProductos();