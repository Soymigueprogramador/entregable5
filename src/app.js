const express = require('events'); 
const app = express();
const port = 3000;

app.get('/contacto', (req, res) => {
    res.send('hola a todos en el ${port}');
})

app.listen(port, () => {
    console.log('conectados en el ${port}'); 
})