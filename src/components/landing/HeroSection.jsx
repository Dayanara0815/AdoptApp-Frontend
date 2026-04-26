export default function HeroSection() {
  return (
    <section className="container py-5 my-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <h1 className="hero-title mb-4">
            Encuentra a tu <br />
            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>compañero</span> ideal.
          </h1>
          <p className="lead mb-5" style={{ color: "#5a6159" }}>
            AdoptApp es el santuario digital donde las almas se conectan. Curamos la búsqueda
            de tu nueva mascota con amor, respeto y elegancia orgánica.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn-landing-primary btn-lg shadow px-5" style={{ fontSize: "1.1rem" }}>
              Empezar adopción
            </button>
            <button className="btn-landing-outline" style={{ backgroundColor: "#e4e4cc" }}>
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
              src="https://static.vecteezy.com/system/resources/thumbnails/074/214/382/small/smiling-purebred-golden-retriever-dog-portrait-sitting-happily-in-a-lush-green-field-bathed-in-warm-golden-hour-sunlight-free-photo.jpeg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}