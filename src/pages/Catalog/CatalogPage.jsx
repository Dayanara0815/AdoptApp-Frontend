import React from 'react';
import CatalogHeader from '../../components/Catalog/CatalogHeader';
import CatalogSidebar from '../../components/Catalog/CatalogSidebar';
import CatalogGrid from '../../components/Catalog/CatalogGrid';
import CatalogNavbar from '../../components/Catalog/CatalogNavbar';
import Footer from '../../components/Catalog/CatalogFooter';
import './CatalogPage.css';

const CatalogPage = () => {
    return (
        <div className="catalog-theme">
            <div className="bg-background text-on-background min-vh-100 selection-custom">
                <CatalogNavbar />

            {/* Main Content Area */}
            <main className="container-xl px-4 mx-auto" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
                <CatalogHeader />

                <div className="row mt-5 g-5">
                    {/* Sidebar */}
                    <div className="col-12 col-lg-3">
                        <CatalogSidebar />
                    </div>

                    {/* Main Grid */}
                    <div className="col-12 col-lg-9">
                        <CatalogGrid />
                    </div>
                </div>
            </main>

            <Footer />

            {/* FAB for Mobile */}
            <div className="position-fixed bottom-0 end-0 m-4 d-md-none" style={{ zIndex: 1000 }}>
                <button className="btn bg-primary text-on-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center border-0 active-scale" style={{ width: '3.5rem', height: '3.5rem' }}>
                    <span className="material-symbols-outlined">pets</span>
                </button>
            </div>
            </div>
        </div>
    );
};

export default CatalogPage;