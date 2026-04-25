const objectives = [
  {
    icon: "speed",
    title: "El Match Perfecto",
    description:
      "No solo buscamos mascotas, unimos personalidades. Queremos que tu estilo de vida y la energía de tu nuevo compañero encajen de forma natural y duradera desde el primer día.",
  },
  {
    icon: "verified",
    title: "Adopción con propósito",
    description:
      "Queremos que adoptar sea la primera opción para todos. Educamos y ayudamos a las familias a entender que dar una segunda oportunidad es el acto de amor más grande que existe.",
  },
  {
    icon: "hub",
    title: "Comunidad que Cuida",
    description:
      "Creamos una red donde refugios y familias están siempre conectados. Así, nos aseguramos de que cada mascota reciba el cariño y seguimiento que necesita en su nuevo hogar.",
  },
];

export default function ObjectivesSection() {
  return (
    <section className="section-padding bg-white" id="objetivos">
      <div className="container">
        <div className="text-center mb-5 pb-3">
          <h2 className="display-5 mb-3">Nuestros Objetivos Centrales</h2>
        </div>
        <div className="row g-4">
          {objectives.map((obj) => (
            <div className="col-md-4" key={obj.title}>
              <div className="objective-card">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "rgba(74,101,79,0.1)",
                    color: "var(--primary)",
                  }}
                >
                  <span className="material-symbols-outlined">{obj.icon}</span>
                </div>
                <h4 className="h5 fw-bold mb-3">{obj.title}</h4>
                <p className="text-muted small">{obj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}