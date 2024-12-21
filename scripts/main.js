//Nav bar functions
document.getElementById('Acerca-de').addEventListener('click', ()=>{
    const section = document.getElementById('who-section'); //Read the section
    section.scrollIntoView({behavior: 'smooth'}); //scroll to the section
});

document.getElementById('Redes-sociales').addEventListener('click', ()=>{
    const sectionFooter = document.getElementById('section-footer');
    sectionFooter.scrollIntoView({behavior: 'smooth'});
});

// Referencias a los elementos
const contacto = document.getElementById('contacto');
const popUp = document.getElementById('contacto-pop');
const closeModal = document.getElementById('close-modal');

// Función para abrir el modal
const abrirModal = () => {
    popUp.showModal();
};

// Función para cerrar el modal
const cerrarModal = () => {
    popUp.close();
};

// Se asigna a los eventos
contacto.addEventListener('click', abrirModal);
closeModal.addEventListener('click', cerrarModal);



document.getElementById('register').addEventListener('click', ()=>{
    window.location.href = 'register.html';
});