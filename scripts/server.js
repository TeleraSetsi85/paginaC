const express = require('express');
const app = express();
const port = 3000;

// Middleware simulado para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/html/login.html'); // Redirige al login si no está autenticado
    }
}

// Sirve archivos estáticos
app.use(express.static(__dirname));

// Ruta principal para `/`
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/main.html');
});

// Para que muestre el link al iniciar
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Ruta para la compra del boleto
// app.get('/compra-boleto', isAuthenticated, (req, res) => {
//     res.sendFile(__dirname + '/html/compra.html');
// });

// Ruta para la página de login/registro
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html');
});
