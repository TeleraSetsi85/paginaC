import React from "react";

// Componentes
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Ejemplo de llamada al servidor
import { main } from "../api/servidor";

function Home() {
  // Ejemplo de uso del servidor
  const btnBorrar = async () => {
    try {
      const res = await main();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={btnBorrar}>Borrar</button>
      <Navbar />
      <Header />
      <main className="container mt-5">
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h3 className="text-gold fw-bold">Descubre la grandeza</h3>
            <p>Con la cual descubrirás tu propósito, juntos transformaremos tu vida.</p>
          </div>
          <div className="col-md-6 text-center">
            <img src="https://via.placeholder.com/300" alt="photo" className="img-fluid rounded" />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <h3 className="text-gold fw-bold">Vive una vida más plena y satisfactoria</h3>
            <p>¡Contáctame para emprender este viaje juntos!</p>
          </div>
          <div className="col-md-6 order-md-1 text-center">
            <img src="/img/yogaPhoto.jpeg" alt="photo" className="img-fluid rounded" />
          </div>
        </div>
      </main>

      <section className="container mt-5" id="who-section">
        <h1 className="text-gold fw-bold">¿Quién es Lexo Salmon?</h1>
        <div className="row align-items-center">
          <div className="col-md-4">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/img/photo 2.jpg" className="d-block w-100 img-fluid" alt="photo 1" />
                </div>
                <div className="carousel-item">
                  <img src="/img/photo 3.jpg" className="d-block w-100 img-fluid" alt="photo 2" />
                </div>
                <div className="carousel-item">
                  <img src="/img/photo 4.jpg" className="d-block w-100 img-fluid" alt="photo 3" />
                </div>
                <div className="carousel-item">
                  <img src="/img/photo 5.jpg" className="d-block w-100 img-fluid" alt="photo 4" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>

          <div className="col-md-8">
            <p className="custom-text">
              Instructor personal motivacional y Orador. He recorrido un camino lleno de retos que me han llevado a crecer tanto en lo personal como
              en lo espiritual. Gracias a herramientas como la filosofía estoica, la sanación espiritual y el trabajo introspectivo, he logrado
              transformar obstáculos en oportunidades y alcanzar metas que parecían inalcanzables.
            </p>
            <p className="custom-text">
              Quiero ser tu guía para descubrir el enorme potencial que habita en ti. Juntos trabajaremos para que identifiques tu propósito,
              enfrentes tus temores y construyas una vida plena y con significado.
            </p>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <h1 className="text-gold fw-bold">¿Qué puedo ofrecerte?</h1>
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <div className="card">
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="Motivación Personalizada" />
              <div className="card-body">
                <h2 className="card-title">Motivación Personalizada</h2>
                <p className="card-text text-dark">Te inspiraré a alcanzar tus objetivos, sin importar cuán grandes o pequeños sean.</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card">
              <img src="/img/photo-course 1.jpg" className="card-img-top" alt="Herramientas Prácticas" />
              <div className="card-body">
                <h2 className="card-title">Herramientas Prácticas</h2>
                <p className="card-text text-dark">
                  Te enseñaré técnicas basadas en la filosofía estoica y la espiritualidad para mejorar tu bienestar emocional y mental.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card">
              <img src="/img/desarrolloPhoto.jpeg" className="card-img-top" alt="Desarrollo Personal" />
              <div className="card-body">
                <h2 className="card-title">Desarrollo Personal</h2>
                <p className="card-text text-dark">
                  Te guiaré en un proceso de autodescubrimiento para que conozcas tus fortalezas y trabajes tus áreas de oportunidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-footer" className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-6 text-start">
            <h5>Si estás listo para transformar tu vida, contacta conmigo</h5>
          </div>
          <div className="col-md-2 text-center">
            <img src="/img/salmonLogo.png" id="salmon-image" className="img-fluid" alt="Photo Salmon" />
          </div>
          <div className="col-md-4 text-end">
            <h5>De la planificación a la acción solo existe un paso... ¡Dalo!</h5>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="contacto-pop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                ¡Contactame!
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <i className="text-primary d-flex justify-content-center">alejandrolopezc@live.com.mx</i>
            </div>
            <div className="modal-footer d-flex justify-content-center ">
              <a href="https://www.facebook.com/share/NmRng2uBJtkdiFuf/" target="_blank" className="contact-btn">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" className="contact-btn">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/lexo47?igsh=d3A2eHpuODZ1bHdt" target="_blank" className="contact-btn">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
