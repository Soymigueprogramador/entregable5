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
                        id: ${product.id}
                        product: ${product.tittle} 
                        price: ${product.price}
                        categoria: ${product.categoria}
                      </li>`;
            })
            const ulProduct = document.getElementById("mainProducts");
            ulProduct.innerHTML = ul;
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
};

cargarProductos();