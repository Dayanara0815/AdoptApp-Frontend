import { useNavigate } from "react-router-dom";
import heroDog from "../../assets/hero-dog.png";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="container py-4 my-4">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <h1 className="hero-title mb-4">
            Encuentra a tu <br />
            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>compañero</span> ideal.
          </h1>
          <p className="lead mb-5" style={{ color: "#5a6159" }}>
            Alguien te está esperando.
            Cada mascota en AdoptApp tiene una historia sin terminar. Ayúdanos a escribir el capítulo feliz.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button
              className="btn-landing-primary btn-lg shadow px-5"
              style={{ fontSize: "1.1rem" }}
              onClick={() => navigate("/login")}
            >
              Empezar adopción
            </button>
            <button
              className="btn-landing-outline"
              style={{ backgroundColor: "#e4e4cc" }}
              onClick={() => navigate("/login")}
            >
              Saber más
            </button>
          </div>
        </div>

        <div className="col-lg-6 position-relative">
          <div className="hero-img-container">
            <img
              alt="Perro feliz"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              src={heroDog}
            />
          </div>
        </div>
      </div>
    </section>
  );
}