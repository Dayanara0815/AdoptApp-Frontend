export default function MissionVisionSection() {
  return (
    <section className="section-padding container">
      <div className="row g-4">

        {/* Misión */}
        <div className="col-md-6" id="mision">
          <div className="card-mission">
            <span
              className="material-symbols-outlined mb-4"
              style={{ fontSize: "3rem", color: "var(--primary)" }}
            >
              track_changes
            </span>
            <h3 className="mb-4">Nuestra Misión</h3>
            <p className="lead mb-5" style={{ color: "#5a6159" }}>
              Facilitar encuentros genuinos entre animales en situación de vulnerabilidad y hogares
              responsables, utilizando tecnología de punta para garantizar que cada adopción sea un
              éxito duradero y amoroso.
            </p>
            <div className="d-flex gap-2">
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--primary)" }} />
              <div style={{ width: 48, height: 8, borderRadius: 4, backgroundColor: "rgba(74,101,79,0.2)" }} />
            </div>
          </div>
        </div>

        {/* Visión */}
        <div className="col-md-6" id="vision">
          <div className="card-vision">
            <span
              className="material-symbols-outlined mb-4"
              style={{ fontSize: "3rem", color: "var(--secondary)" }}
            >
              visibility
            </span>
            <h3 className="mb-4">Nuestra Visión</h3>
            <p className="lead mb-5" style={{ color: "#5a6159" }}>
              Ser la plataforma líder a nivel global en la curaduría del bienestar animal,
              transformando la percepción de la adopción y logrando que ningún animal sano pase su
              vida en un refugio.
            </p>
            <div className="d-flex gap-2">
              <div style={{ width: 48, height: 8, borderRadius: 4, backgroundColor: "rgba(141,170,145,0.2)" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--secondary)" }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}