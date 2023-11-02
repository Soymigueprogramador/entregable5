const socket = io(); 

document.getElementById('eliminarProductosDelFormulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const productId = document.getElementById('productoAEliminarPorId').Value;
    try {
        const respuesta = await fetch('/api/products/${productId}', {
            method: 'DELETE',
        });
        if (!respuesta.ok) {
            cargarProductos();
        } else {

        }
    } catch (error) {
        console.error('Error al querer eliminar un producto', error);
    }
});

document.getElementById('agregarProductosAlFormulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new formData(e.target); 
    const productData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        imageUrl: formData.get('imageUrl'),
        code: formData.get('code'),
        stock: parseInt(formData('stock')),
        category: formData('category')
    }
    console.log(productsData);
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'content-type': 'aplication.json' }, 
            body: JSON.stringify(productData),
        });
        if(!response.ok) {

        } else {

        }
    } catch (error) {
        console.error('Error al agregar un producto', error);
    }
});

socket.on('listaDeProductosActualizados', (products) => {
    const listaDeProductos = document.getElementById('listaDeProductos');
    listaDeProductos.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `id: ${product.id} Título: ${product.title} Descripción: ${product.descripcion}`;
        listaDeProductos.appendChild(li);
    });
});

socket.on('nuevoProducto', (nuevoProducto, products) => {
    console.log('Ya se cargo: ${product.title}');
    let ul = '';
    products.forEach(product => {
        ul += '<li id="${product.id}"> id: ${product.id} product: ${product.title} price: ${product.price} </li>';
    });
    let ulProduct = document.getElementById('mainProduct');
    ulProduct.innerHTML = ul; 
});

socket.on('productoEliminado', ({ productoEliminado, product }) => {
    console.log('Se elimino el producto con id:${productId}');
    const elementoDelProducto = document.getElementById('productId');
    if   (elementoDelProducto) {
        elementoDelProducto.remove();
    }
    listaDeProductosActualizada(products);
}); 

function actualizarLaListaDeLosProductos(products) {
    let ul = '';
    products.forEach(product => {
        ul += '<li id="${product.id}"> id: ${product.id} product: ${product.title} price: ${product.price} </li>';
    });
    let ulProduct = document.getElementById('mainProduct');
    ulProduct.innerHTML = ul;
};
actualizarLaListaDeLosProductos();

const cargarProductos = () => {
    fetch('/api/product?Limit=100') 
        .then((response) => {
            return response.json();
        })
        .then((products) => {
            let ul = '';
            products.forEach((product) => {
                ul += `<li id="${product.id}"> id: ${product.id} product: ${product.title} price: ${product.price} </li>`;
            });
            let ulProduct = document.getElementById('mainProduct');
            ulProduct.innerHTML = ul;
        });
}
cargarProductos();