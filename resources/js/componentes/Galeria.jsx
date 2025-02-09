
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
  const [Url, setUrl] = useState('');
  const [Emergent, setEmergent] = useState(false);

  const handleImageClick = (id) => {
    const imageUrl = Instagram.find((img) => img.id === id).media_url;
    setUrl(imageUrl);
    setEmergent(true);
  };

  const closeEmergent = () => { setEmergent(false); };

  if (!Array.isArray(Instagram)) {
    console.error('Instagram debe ser un array');
    return null; // o mostrar un mensaje de error
  }

  return (
    <div className="container">
      <div className="row">
        {Emergent && (
          <div className="emergent-panel position-fixed top-25 left-25 w-50 h-55 d-flex align-items-center justify-content-between bgprimarioEmer" style={{ zIndex: 1050 }}>
            <img src={Url} alt="Emergent" style={{ width: '500px', height: 'auto' }} className="img-fluid" />
            
            <button type="button" className="btn btn-close position-absolute" aria-label="Close" onClick={closeEmergent} style={{ top: '1rem', right: '1rem' }} />
          </div>
        )}
        {Instagram.map((image, key) => (
          <div key={key} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100" onClick={() => handleImageClick(image.id)}>
              <img id={'imgId ' + image.id} className="card-img-top" src={image.media_url} alt={image.text} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};  

export default Galeria;
