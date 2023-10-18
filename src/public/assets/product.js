const socket = io();  

const cargarProductos = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get('query');  
    const sort = urlSearchParams.get('sort');    
    const limit = urlSearchParams.get('limit');  
    const page = urlSearchParams.get('page');    
    
    let apiUrl = '/api/product';
    if (query) {
        apiUrl += `?query=${query}`;
    }   
    if (sort) {
        apiUrl += `&sort=${sort}`;
    }
    if (limit) {
        apiUrl += `&limit=${limit}`;
    }
    if (page) {
        apiUrl += `&page=${page}`;
    }

    fetch(apiUrl)
        .then(response => response.json())  
        .then(data => {
            console.log(data);
            let ul = '';
            data.products.forEach(product => {  
                ul += `<li id="${product.id}">
                        <spam> id: ${product.id} </spam>
                        <a href="/product/${product.id}"> ${product.title} </a>
                        <spam> categoria: ${product.categoria} </spam>
                        <spam> price: ${product.price} </spam>
                        <button> Agregar al carrito </button>
                      </li>`;
            })
            const ulProduct = document.getElementById("mainProducts");
            ulProduct.innerHTML = ul;
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

        const totalPages = products.totalPages;
        const hasPrevPage = products.hasPrevPage;
        const hasNextPage = products.hasNextPage;
        const prevPage = products.prevPage;
        const nextPage = products.nextPage;

        const paginacionDiv = document.createElement('a');

        const enlacePrimerPagina = document.createElement('a');
        enlacePrimerPagina.href = '/product?page=1';
        enlacePrimerPagina.innerText = 'pag.1';

        if(hasPrevPage) {
            const enlaceAnterior = document.createElement('a');
            enlaceAnterior.href = `/product?page=${prevPage}`;
            enlaceAnterior.innerText = 'prev.pag.';
            paginacionDiv.appendChild(enlaceAnterior)
        } else {
            const prevPageSpan = document.createElement('span');
            prevPageSpan.textContent = 'prev.pag.';
            paginacionDiv.appendChild(prevPageSpan);
        }

        if(hasNextPage) {
            const enlaceSiguientePagina = document.createElement('a');
            enlaceSiguientePagina.href = `/product?page=${nextPage}`;
            enlaceSiguientePagina.textContent = 'next.pag.';
            paginacionDiv.appendChild(enlaceSiguientePagina);
        } else {
            const nextPageSpan = document.createElement('span');
            nextPageSpan.textContent = 'next.pag.';
            paginacionDiv.appendChild(nextPageSpan);
        }

        const enlaceAnterior = document.createElement('a');
        enlaceAnterior.href = `/product?page=${totalPages}`;
        enlaceAnterior.textContent = `ult.pag.`;

        paginacionDiv.appendChild(enlaceAnterior);
        paginacionDiv.appendChild(enlaceAnterior);

};
cargarProductos();

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