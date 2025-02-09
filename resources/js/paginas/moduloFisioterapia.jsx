import 'bootstrap/dist/css/bootstrap.min.css';
import { TablaCita } from "../componentes/tablaaCita.jsx";
import { TablaHistoria } from '../componentes/tablaHistorias.jsx';
import { Navegador } from '../componentes/navegador.jsx';
import { Footer } from "../componentes/Footer.jsx";
import React, { useState ,useEffect,useContext} from 'react';
import axios from 'axios';
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
export const FisioCita = () => {
  const example = useContext(Exaplecontect)
  console.log(example);
  
  const [data, setData] = useState([]);
  const [histo, sethisto] = useState([]);
  useEffect(() => { 
    // Esta función se ejecuta antes de que el componente se renderice
    const fetchData = async () => { 
      try { 
        const response = await axios.get('http://127.0.0.1:8000/api/all'); 
        console.log(response.data);
        
        setData(response.data); 
      } catch (error) { 
        console.error('Error fetching data:', error); 
      } 
    }; 
    fetchData(); 
  }, []);
  const [formData, setFormData] = useState({ nombre: '', date: '', time: '',edad:'',sexo:'',id:'' });
  const [direccion, setDireccion] = useState('');
  const [coordenadas, setCoordenadas] = useState(null);
  const [error, setError] = useState(null);

  const obtenerCoordenadas = async (direccion) => {
    try {
      const respuesta = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: direccion, format: 'json', addressdetails: 1, limit: 1 }
      });
      if (respuesta.data.length > 0) {
        const resultado = respuesta.data[0];
        setCoordenadas({ lat: resultado.lat, lon: resultado.lon });
        setError(null);
      } else {
        setCoordenadas(null);
        setError('No se encontraron coordenadas para esta dirección.');
      }
    } catch (error) {
      console.error('Error obteniendo coordenadas:', error);
      setCoordenadas(null);
      setError('Hubo un error al obtener las coordenadas.');
    }
  };




  const manejarCambioDireccion = async (event) => {
    const nuevaDireccion = event.target.value;
    setDireccion(nuevaDireccion);
    if (nuevaDireccion) {
      await obtenerCoordenadas(nuevaDireccion);
    } else {
      setCoordenadas(null);
      setError(null);
    }
  };
  
  const handleSelectCita = async (cita) => {
    const hoy = new Date(); 
    const nacimiento = new Date(cita.user.fechaN); 
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); 
    const mes = hoy.getMonth() - nacimiento.getMonth(); 
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) { edad--; }
    setFormData({
      nombre: cita.user.Nombre,
      date: cita.fecha,
      time: cita.hora,
      edad: edad,
      sexo: cita.user.sexo,
      id: cita.id
    });
    setDireccion(cita.direc)
    let historias= await axios.get(`http://127.0.0.1:8000/api/Historia/${cita.IdUser}`)
    sethisto(historias.data);
    


    // manejarCambioDireccion({ target: { value: cita.direccion } });
  };
  const CrearHistoria=()=>{
    window.location.href=`http://127.0.0.1:8000/Historias?User=${formData.id}`
  }

  return (
    <div>
      <Navegador />
      <div className='row justify-content-around'>
        <div className="col-4">
          <TablaCita onSelect={handleSelectCita} data={data} />
        </div>
        <div className='col-4'>
          <TablaHistoria data={histo} />
        </div>
      </div>
      <div className="row justify-content-around ">
        <div className="col-4 ">
          <div className="row justify-content-between">
            <div className="col">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" value={formData.nombre} readOnly className="form-control" />
            </div>
            <div className="col">
              <label htmlFor="edad">Edad</label>
              <input id="edad" value={formData.edad} readOnly type="text" className="form-control" />
            </div>
          </div>
          <div className="row mt-2 justify-content-between">
            <div className="col">
              <label htmlFor="ubicacion">Ubicación</label>
              <input id="ubicacion" type="text"   className="form-control" value={direccion} onChange={manejarCambioDireccion} />
            </div>
          </div>
        </div>
        <div className="col-4 ">
          <div className="row mt-2 justify-content-between">
            <div className="col">
              <label htmlFor="patologia">Patología</label>
              <input id="patologia" type="text" className="form-control" />
            </div>
            <div className="col">
              <label htmlFor="tratamiento">Tratamiento</label>
              <input id="tratamiento" type="text" className="form-control" />
            </div>
          </div>
          <div className="row mt-2 justify-content-between">
            <div className="col">
              <label htmlFor="sexo">Sexo</label>
              <input id="sexo" value={formData.sexo} readOnly type="text" className="form-control" />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-4">
              <button onClick={CrearHistoria}  className="btn btn-success w-100">Asociar Historia</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row mt-5 mb-5 justify-content-center">
          <iframe src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordenadas ? `${coordenadas.lon},${coordenadas.lat}` : '-68.024,10.191,-67.999,10.214'}&layer=mapnik`} width="600" height="450" allowFullScreen="" style={{ border: 0 }} title="Mapa de OpenStreetMap"></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FisioCita;
