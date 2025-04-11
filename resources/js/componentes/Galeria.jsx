
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
const IMAGE_DATA = [
  { id: 1, text: 'Image 1' },
  { id: 2, text: 'Image 2' },
  { id: 3, text: 'Image 3' },
  { id: 4, text: 'Image 4' },
  { id: 5, text: 'Image 5' },
  { id: 6, text: 'Image 6' },
];

const IMAGE_API_URL = 'https://openui.fly.dev/openui/400x400.svg?text=';

export const Galeria = ({ Instagram }) => {
  const [Url, setUrl] = useState({});
  const [Emergent, setEmergent] = useState(false);

  const handleImageClick = (id) => {
    const imageUrl = Instagram.find((img) => img.id === id).media_url;
    setUrl({"URL":imageUrl,"descrip":Instagram.find((img) => img.id === id).caption});
    setEmergent(true);
  };

  const closeEmergent = () => { 
    console.log(Url);
    
    setEmergent(false); };

  if (!Array.isArray(Instagram)) {
    console.error('Instagram debe ser un array');
    return null; // o mostrar un mensaje de error
  }

  return (
    <div className="container">
      <div className="row">

        {Emergent && (
                <div
                className="position-fixed top-50 start-50 translate-middle rounded-3 shadow-lg bg-white overflow-hidden"
                style={{
                  zIndex: 1050,
                  maxWidth: "90vw",
                  width: "800px",
                  maxHeight: "90vh",
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="emergent-panel-title"
              >
                <div className="position-relative">
                  {/* Botón de cierre */}
                  <button type="button" className="btn-close position-absolute end-0 m-3 bg-white rounded-circle p-2 shadow-sm" aria-label="Close" onClick={closeEmergent} style={{ top: '1rem', right: '1rem' }} />
        
        
                  <div className="row g-0">
                    {/* Columna de imagen */}
                    <div className="col-md-6">
                      <div className="h-100 d-flex align-items-center justify-content-center p-3">
                        <img
                          src={Url.URL || "/placeholder.svg"}
                          alt="Imagen descriptiva"
                          className="img-fluid rounded-start"
                          style={{ maxHeight: "70vh", objectFit: "contain" }}
                        />
                      </div>
                    </div>
        
                    {/* Columna de descripción */}
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="p-4">
                        <h5 id="emergent-panel-title" className="mb-3 fw-bold">
                          Información
                        </h5>
                        <p className="mb-0">{Url.descrip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )}
        <div className='row mt-5'>
        {Instagram.map((image, key) => (
          <div key={key} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100" onClick={() => handleImageClick(image.id)}>
              <img id={'imgId ' + image.id} className="card-img-top" src={image.media_url} alt={image.text} />
              
              
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};  

export default Galeria;
