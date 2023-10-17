const socket = io();

const userElement = document.getElementById('user');

userElement.innerHTML = 'user: ' + user;

document.getElementById('cargarMensaje').addEventListener('submit', async (e) => {
    e.preventDefault();
    const datosDelFormulario = new FormData(e.target);

    const datosDelProducto = {
        user: user,
        mensaje: datosDelFormulario.get('mensaje')
    };

    try {
        const respuesta = await fetch('/api/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosDelProducto)
        });

        if (respuesta.ok) {
            
        } else {
            
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const botonEliminar = document.getElementById('botonEliminar');
    botonEliminar.addEventListener('click', () => {
        const url = '/api/mensajes';

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(respuesta => {
            if (respuesta.ok) {
                
            } else {
                console.error('Error al eliminar');
            }
        })
        .catch(error => {
            console.error('Error al eliminar', error);
        });
    });
});

socket.on('limpiarMensaje', ({}) => {
    ul = 'TU chat fue eliminado, inicia con un nuevo chat';
    const ulPorduct = document.getElementById('mainChat');
    ulPorduct.innerHTML = ul; 
});

socket.on('nuevoMensaje', (nuevoMensaje, mensaje) => {
    console.log('nuevoMensaje', '${nuevoMensaje.mensajes}'); 
    let ul = '';
    mensaje.array.forEach(mensaje => {
        ul += `<li>${mensaje.user} : ${mensaje.mensaje}</li>`; 
    })
    const ulPorduct = document.getElementById('mainChat');
    ulPorduct.innerHTML = ul;
});

const cargarProductos = () => {
    fetch('/api/mensaje')
        .then(data => {
            return data.json();
        })
        mensaje.array.forEach(mensaje => {
        ul += `<li>${mensaje.user} : ${mensaje.mensaje}</li>`; 
    })
    const ulPorduct = document.getElementById('mainChat');
    ulPorduct.innerHTML = ul;
};

cargarProductos();