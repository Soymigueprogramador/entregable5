const imagenInput = document.getElementById('imagenInput');
const aviso = document.getElementById('aviso');

imagenInput.addEventListener('change', function() {
    if (imagenInput.files.length === 0) {
        aviso.textContent = 'Falta la imagen del producto';
        aviso.style.color = 'red';
    } 
    else if (imagenInput.files.length <= 1) {
        aviso.textContent = 'Se cargó la imagen';
        aviso.style.color = 'green';
    }
});