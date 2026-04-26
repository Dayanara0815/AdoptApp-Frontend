const images = {
  col1: [
    {
      src: "https://www.admitablas.com/wp-content/uploads/2024/12/Gemini_Generated_Image_ybdbquybdbquybdb.jpeg",
      alt: "Happy dog",
      height: 250,
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/066/583/797/large_2x/dog-background-golden-retriever-dog-and-british-shorthair-cat-relaxing-together-in-lush-green-grass-free-photo.jpg",
      alt: "Cat",
      height: 180,
    },
  ],
  col2: [
    {
      src: "https://static.vecteezy.com/system/resources/previews/066/583/717/non_2x/dog-background-golden-retriever-dog-portrait-golden-fur-sunny-outdoors-happy-canine-free-photo.jpg",
      alt: "Small dog",
      height: 180,
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHWe2opkFWTl640fGsl_wHZhPxoGLYkY6XxVCPRfBXizRI6ai8mYiwGhVpGuFzSmDQ4LH-bOZHM3O9iopcdKrrQ3DS1jtlaCvAWiBu6p1aS7EDFp7xnH2L5ZisiUcgeBRYKfob_y9_L8gtxVtJiyCqYIqDVmgRXWTpvr4nFRKQshjohMiFwx9UbJZtR6lEMwZBrNVNc9_20u4hSbKx0imYzw2KY583h81Yd88MHppMk8eTSExShEtIwIB7VQElxz7J-unFlwekJdA",
      alt: "Dogs in park",
      height: 250,
    },
  ],
};

export default function AboutSection() {
  return (
    <section className="section-padding" id="quienes-somos" style={{ backgroundColor: "#F5F5DC" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <div className="badge-curator mb-4">Quiénes Somos</div>
            <h2 className="display-5 mb-4">Donde las almas nobles encuentran su hogar</h2>
            <div className="lead" style={{ color: "#5a6159" }}>
              <p className="mb-4">
                AdoptApp no es solo un catálogo de búsqueda; es el comienzo de una nueva historia.
                Nacimos para devolverle la humanidad al acto de adoptar, creando un puente emocional
                basado en la confianza y el respeto profundo por la vida animal.
              </p>
              <p>
                Creemos en el "match" perfecto: ese donde la personalidad de una mascota y el ritmo
                de una familia se encuentran para siempre. Aquí, cada conexión es pausada, consciente
                y llena de propósito.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-6 pt-5">
                {images.col1.map((img) => (
                  <img
                    key={img.alt}
                    alt={img.alt}
                    className="img-fluid rounded-4 mb-3"
                    src={img.src}
                    style={{ height: img.height, objectFit: "cover", width: "100%" }}
                  />
                ))}
              </div>
              <div className="col-6">
                {images.col2.map((img) => (
                  <img
                    key={img.alt}
                    alt={img.alt}
                    className="img-fluid rounded-4 mb-3"
                    src={img.src}
                    style={{ height: img.height, objectFit: "cover", width: "100%" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}