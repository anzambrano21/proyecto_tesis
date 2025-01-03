import React, { useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
export const Carrusel = () => {
    useEffect(() => {
        // Importar Bootstrap JS dinámicamente en el lado del cliente
        import('bootstrap/dist/js/bootstrap.bundle.min.js')
      }, [])
    const images = [
        { src: "http://localhost:5173/public/imagen/imagen1.jpg", alt: "Image 1" },
        { src: "http://localhost:5173/public/imagen/imagen2.jpg", alt: "Image 2" },
        { src: "http://localhost:5173/public/imagen/imagen3.jpg", alt: "Image 3" },
        { src: "http://localhost:5173/public/imagen/imagen4.jpg", alt: "Image 4" },
        { src: "http://localhost:5173/public/imagen/imagen5.jpg", alt: "Image 5" },
      ]
    return (
        <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            width={600}
                            height={550}
                            className="d-block w-100"
                        />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )

}