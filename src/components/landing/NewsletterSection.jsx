import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="container mb-5 pb-5">
      <div className="newsletter-section">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h2 className="display-5 mb-3 fw-bold">Únete a nuestra comunidad de curadores.</h2>
            <p className="mb-0 lead" style={{ opacity: 0.75 }}>
              Recibe historias de éxito y consejos sobre bienestar animal directamente en tu
              bandeja de entrada.
            </p>
          </div>
          <div className="col-lg-5">
            <div className="d-sm-flex gap-3">
              <input
                className="newsletter-input"
                placeholder="Tu correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn-subscribe mt-3 mt-sm-0">Suscribirse</button>
            </div>
          </div>
        </div>
        {/* Decoration */}
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
      </div>
    </section>
  );
}