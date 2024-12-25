const express = require('express');
const path = require('path'); // Módulo para manejar rutas
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../html')));

// Ruta principal para `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/main.html')); 
});

// Ruta para la página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/login.html'));
});

// Ruta para la página de registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/register.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
