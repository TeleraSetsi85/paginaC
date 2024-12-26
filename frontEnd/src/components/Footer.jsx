import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white text-center py-4" id="section-footer">
        <div className="container">
          <h5>Sígueme en redes sociales</h5>
          <div className="d-flex justify-content-center mt-3">
            <a href="https://www.facebook.com/share/NmRng2uBJtkdiFuf/" target="_blank" className="social-btn">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="social-btn">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/lexo47?igsh=d3A2eHpuODZ1bHdt" target="_blank" className="social-btn">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="mt-3">© 2024 Lexo Salmon. Si estas listo para transformar tu vida contacta conmigo</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
