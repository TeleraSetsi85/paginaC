import React from "react";



function events(){
    return (
        <>
            <header>
                <h1>Upcoming Events</h1> 
            </header>
            <nav> 
                {/*Agregar un timer del evento mas cercano*/}
            </nav>
            <main>
                {/*Los eventos apareceran segun los coloque el autor*/}
                {/*primer evento */}
                <section>
                    <div>
                        <h3>Nombre del evento</h3>
                        <img src="" alt="photo-event" />
                        <p>00/00/00</p>{/*Fecha de cuando es*/}
                        <p>00:00:00</p> {/*Si se puede poner un timer de cuanto falta*/}
                        <p>{/*Una descripcion del evento*/}</p>
                    </div>
                    <div>
                        <label htmlFor="">Nombre Completo</label>
                        <input type="text"  placeholder="Ingresa nombre completo"/>
                        <button>Comprar ahora</button>
                    </div>

                </section>
                {/*Metodo de pago*/}
                <dialog>

                </dialog>
            </main>
        </>
    
    );
        
}

export default events;