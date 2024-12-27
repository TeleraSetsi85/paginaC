import apiAxios from "./axios.js";

export const main = async () => await apiAxios.get("/");

//Servidor con express
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/Home.jsx'); //Revisar si lo manda a la pagina principal
});

app.get('/event.jsx', (req, res)=>{
    res.sendFile(__dirname + '/pages/event.jsx'); //Igual
});
