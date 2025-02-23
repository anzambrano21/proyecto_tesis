import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import { TablaCont } from "../componentes/TablaConte.jsx";
import { useState,useEffect } from "react"
import axios from 'axios';
export const CrearConte = () => {
    const [file, setFile] = useState(null)
    const [dragActive, setDragActive] = useState(false)
    const [Conte, setConte] = useState([])
    useEffect(() => { 
        // Esta función se ejecuta antes de que el componente se renderice
        const fetchData = async () => { 
          try { 
            
            const response2 = await axios.get('http://127.0.0.1:8000/api/Material'); 
            
            
            
            
            setConte(response2.data); 
          } catch (error) { 
            console.error('Error fetching data:', error); 
          } 
        }; 
        fetchData(); 
      }, []);

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }


    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const Guardaar=async()=>{
        if(!file){
            alert("Adjunta un Archivo")
            return
        }
        let datos={
            Archivo:file,
            Titulo: document.getElementById('Titulo').value,
            COntenido:document.getElementById('motivoIngreso').value
            
        }
        console.log(datos);
        try {
            
            axios.post('http://127.0.0.1:8000/api/Material', datos, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('Archivo subido exitosamente', response.data);
            })
            .catch(error => {
                console.error('Error al subir el archivo', error);
            });
        } catch (error) {
            
        }

        
    }
    return (
        <div>
            <Navegador />
            <main className="flex-grow-1 py-4">
                <div className="contenedor">
                    <div className="row">
                        {/* Columna de la tabla */}
                        <div className="col-md-6 mb-4 mb-md-0">
                            <TablaCont data={Conte} />
                        </div>

                        {/* Columna del formulario */}
                        <div className="col-md-6">
                            <div className="row g-4">
                                {/* Input de Dirección */}
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Titulo"
                                            name="Ubicacion"
                                            placeholder="Dirección Completa"
                                            style={{
                                                height: "60px",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <label htmlFor="Titulo">Dirección Completa</label>
                                    </div>
                                </div>

                                {/* Textarea de Motivo de Ingreso */}
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea
                                            className="form-control"
                                            id="motivoIngreso"
                                            name="motivoIngreso"
                                            placeholder="MOTIVO(S) DE INGRESO"
                                            style={{
                                                height: "200px",
                                                borderRadius: "8px",
                                                resize: "none",
                                            }}
                                        ></textarea>
                                        <label htmlFor="motivoIngreso">Descripcion</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div
                                        className={`form-control d-flex flex-column justify-content-center align-items-center`}
                                        style={{
                                            height: "150px",
                                            borderRadius: "8px",
                                            borderStyle: "dashed",
                                            backgroundColor: dragActive ? "#e9ecef" : "transparent",
                                            transition: "background-color 0.3s ease"
                                        }}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="documento"
                                            className="position-absolute invisible"
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="documento" className="mb-0 text-center">
                                            <i className="bi bi-cloud-upload fs-2 mb-2"></i><br />
                                            {file ? file.name : "Arrastra y suelta tu documento aquí o haz clic para seleccionar"}
                                        </label>
                                    </div>
                                </div>
                                {/* Botón Guardar */}
                                <div className="col-12 mt-4">
                                    <button
                                        onClick={Guardaar}
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        style={{
                                            borderRadius: "8px",
                                            padding: "12px",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />

        </div>
    )
}