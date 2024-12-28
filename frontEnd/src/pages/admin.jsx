import React from "react";


function admin(){
    return(
        <div>
            <header>
                <h1>Administrador de eventos</h1>
            </header>
            <nav>
                <ul>
                    <li>Eventos disponibles</li>
                    <li>Agregar evento</li>
                </ul>
            </nav>
            <main>
                <div>{/*Aqui se muestran los eventos segun la BD*/}</div>
            </main>
        </div>
    )
}

export default admin;