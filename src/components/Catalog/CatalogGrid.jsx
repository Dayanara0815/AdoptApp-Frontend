import React from 'react';
import PetCard from './CatalogPetCard';

const petsData = [
    {
        id: 1,
        name: 'Whiskers',
        age: '2 Años',
        description: 'Un compañero tranquilo y amable que ama las tardes silenciosas y perseguir los rayos de sol en la alfombra.',
        breed: 'Pelo Corto Doméstico',
        trait: 'De interior',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEZv0QIWExlQrXOIajM_D2qJMBDW7XcZfVJBcDf_S0s23rof8uouKcGvtrqL3KSCztxMffMYvbw-8PnBlYNbK90F0iOKlhswGQTB0tkdzf5fG3KMo5pP_xYrgw3Ayze_FlaEZ6HR_1E1Yab7AIabJJzMK5LzeiICB9vsfx1Zmk_lz50HxKWUUrBFZyvEfqY4XuymBd600y-B8pZlecedTkQnh3Np4ja_HWtYvbbGpdSv8TpgBtBaIx6N3SuV4TZ5vlWtl1FUvcf1U',
        isNewArrival: true,
        isSpecialNeed: false
    },
    {
        id: 2,
        name: 'Luna',
        age: '5 Meses',
        description: 'Cachorro con mucha energía que busca una familia activa que ame correr por las mañanas y hacer caminatas los fines de semana.',
        breed: 'Golden Retriever',
        trait: 'Activo',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1CUa2pnaJ4Ok2DBcIj-IBGUlxZX6w98ahRvBKveAnE4bkF17rSXTSiohX3-OJE00GD9kknCAywQs7Xyu4tP_tlJEww2t_9OnZO5X--qBO8vc507kpUvmR8wG_tIWQjOBNLx93GKJpgdh6tKL6Pqh2KfyTWkkRdCbsdxLo_j4mkI5bLbhuPkXBtfo_ksXfGGCEsn9tGF-dso6wqKG8v9PG8DqrmNNc1OvIc6ahfG1c4cxJ3a0kF7MOpmUQWaDqAJpozjZGYiw15nc',
        isNewArrival: false,
        isSpecialNeed: true
    },
    {
        id: 3,
        name: 'Barnaby',
        age: '8 Años',
        description: 'Un caballero mayor que disfruta de paseos cortos y largas siestas. Perfectamente entrenado para estar en casa y excelente con los niños.',
        breed: 'Mezcla de Beagle',
        trait: 'Mayor',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlkjF0fptes5Yujqcn9hMRlEC4Qno7NEKzGb9EGGj_rgYF632ioQnMp3Qtk4lioa2W6CFEgbYpy4UCbqNMde--iIVk886kqLItEZGYn2xgj0lfnHCJLQdIqKJf65KLRQBigmXsTo57w0d55wJm-H-q6F6IdLpaHn4BTvb6eWFBwuVtlF2cosg7oJOeXhWf7F4Q2CsqiaWUhe5JAwzkqvPFear-4sHwWAi91GtFr5Cys8HnIluf504UjNjLTV_rAWE-RQjHukDG700',
        isNewArrival: false,
        isSpecialNeed: false
    },
    {
        id: 4,
        name: 'Oliver',
        age: '1 Año',
        description: 'Un perro pequeño con una gran personalidad. Te seguirá a todas partes y exigirá todas las caricias.',
        breed: 'Pug',
        trait: 'Pequeño',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqkC0oMgD4p5mBMJwLMPDtcjdjQ0aV0oOG76v7KWZnNbXT3mfls7DpvrDlNVj_wertrTEHRckSNZkjg7s1-P1AiireSeg3sO7s43whNRbaNelmU55TPBm5oRQIEJ8HaUvzhIR5PTYEGd11U8ddXy4w6PZATDSJny4grBw27kBPwnywuIzij0LI3ejtLZ2YFxrJkcUoiEsdQlMtUdKyRJkyPtWAarzRgZ3tj4Xm2C7phEUsSyYS6rjIIghdZamNFJItnEfKAqw0IOE',
        isNewArrival: false,
        isSpecialNeed: false
    },
    {
        id: 5,
        name: 'Misty',
        age: '3 Años',
        description: 'Reservada pero profundamente cariñosa una vez que confía en ti. Busca un entorno familiar tranquilo.',
        breed: 'Azul Ruso',
        trait: 'Tranquila',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmz5yWuM-lnWiXVFMl3l9GSxl70MW4T6Vr0Rnqk3ZcddPItQFdX0eW1OM-1wW6Q4E9rt5KHayNGnezBaR1Q-8RtCSbglnC-l7e0vYqtTRmt1giqahVu6obXu-Oz8TXQ_7hIhFFhUwmZiTW-j5tdDYxD4L7PRZJ740SBDcYqh43viwTClTWH3ZXLG7HmMsYJvMdKj4ZbXGanBHp0MPuk2hfRJmj962zBmwLxL7Rk6TqcDiejSFHd_7zTkCSE5CGrejy0BmcgbFsWa8',
        isNewArrival: false,
        isSpecialNeed: false
    },
    {
        id: 6,
        name: 'Felix',
        age: '4 Años',
        description: 'Maestro cazador de ratones de juguete y amante de los lugares altos. Felix necesita espacio vertical para prosperar.',
        breed: 'Gato Tuxedo',
        trait: 'Juguetón',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc3ZsGLs13SD3t-XpZ87mPJpQPGtpY7OrQ1Sek1PKhSf-4Ndbzub1Iybeb5gMuzK5FfUCi4_R8KwJf0T9SXtlG2NOhgrdE29PS6TWms-_MDU7EVHH5L6QgfJGBFFktaCYeCIk9f7MYOG2QscQLS3WvVeNaIf1l4VOggee1sd5AWxmtFwav5CpBaLjYrpEhJcAWDIuW-knqytM4WobakbEeq6iMojKcxRqUMUnpuLn8Httnh59yksihDDN4a9XeLU3SMFCQGvQ2rVs',
        isNewArrival: false,
        isSpecialNeed: false
    }
];

const CatalogGrid = () => {
    return (
        <div>
            <div className="row g-4">
                {petsData.map((pet) => (
                    <div key={pet.id} className="col-12 col-md-6 col-xl-4">
                        <PetCard {...pet} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center gap-2 mt-5 pt-4">
                <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>

                <button className="btn bg-primary text-on-primary rounded-circle fw-bold" style={{ width: '2.5rem', height: '2.5rem' }}>1</button>
                <button className="btn btn-light rounded-circle fw-medium border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>2</button>
                <button className="btn btn-light rounded-circle fw-medium border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>3</button>

                <span className="px-2 text-secondary">...</span>

                <button className="btn btn-light rounded-circle fw-medium border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>12</button>

                <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default CatalogGrid;