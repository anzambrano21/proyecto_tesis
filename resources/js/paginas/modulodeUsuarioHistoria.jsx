"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { TablaUser } from "../componentes/tablaUsuario.jsx"
import { TablaHistoria } from "../componentes/tablaHistorias.jsx"
import { Navegador } from "../componentes/navegador.jsx"
import { Footer } from "../componentes/Footer.jsx"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Exaplecontect } from "../context/contexto.jsx"
import React from "react"

export const UsuarieHistoria = () => {
  const example = useContext(Exaplecontect)


  const [data, setData] = useState([])
  const [histo, setHisto] = useState([])
  const [address, setAddress] = useState("")
  const [mapUrl, setMapUrl] = useState(
    "https://www.openstreetmap.org/export/embed.html?bbox=-74.0107,40.7020,-73.9907,40.7120&layer=mapnik",
  )
  const [formData, setFormData] = useState({
    nombre: "",
    date: "",
    time: "",
    edad: "",
    sex : ""})
    
    const [historia, setHistoria] = useState()

  useEffect(() => {
    // Esta función se ejecuta antes de que el componente se renderice
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/Usuario")
        
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!address.trim()) return

    try {
      // Use Nominatim (OpenStreetMap's free geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const { lat, lon } = data[0]

        // Calculate a bounding box around the point (approximately 0.01 degrees)
        const bbox = `${Number.parseFloat(lon) - 0.01},${Number.parseFloat(lat) - 0.01},${Number.parseFloat(lon) + 0.01},${Number.parseFloat(lat) + 0.01}`

        // Create the OpenStreetMap embed URL
        const newMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
        setMapUrl(newMapUrl)
      }
    } catch (error) {
      console.error("Error geocoding address:", error)
    }
  }

  const handleSelectCita = async (cita) => {
    
    
    const hoy = new Date()
    const nacimiento = new Date(cita.fechaN)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }

    setFormData({
      nombre: cita.Nombre,
      edad: edad,
      sexo: cita.sexo,
      id: cita.id,
    })

    
    setAddress(cita.Ubicacion) // Actualizar la dirección para el mapa

    try {
      const historias = await axios.get(`http://127.0.0.1:8000/api/Historia/${cita.id}`)
      setHisto(historias.data)
    } catch (error) {
      console.error("Error fetching historias:", error)
      setHisto([])
    }
  }

  const CrearHistoria = () => {
    if (formData.id !== "") {
      window.location.href = `http://127.0.0.1:8000/Historias?User=${formData.id}&H=0`
    } else {
      alert("Necesitas Seleccionar un Usuario")
    }
  }

  const EditarHistoria = () => {
    if (historia && historia.id) {
      window.location.href = `http://127.0.0.1:8000/Historias?User=${formData.id}&H=${historia.id}`
    } else {
      alert("Necesitas Seleccionar una Historia")
    }
  }

  const getHisto = (historia) => {
    setHistoria(historia)
  }
  if(Object.keys(example.datos).length==0 || example.datos.Rol=='paciente'){
    window.location.href="http://127.0.0.1:8000/"
    return
}

  return (
    <div>
      <Navegador />
      <div className="row justify-content-around">
        <div className="col-4 mt-5">
          <TablaUser funcion={handleSelectCita} data={data} />
        </div>
        <div className="col-4">
          <TablaHistoria data={histo} funcion={getHisto} />
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
              <input
                id="ubicacion"
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button onClick={handleSubmit} className="btn btn-primary mt-2">
                Buscar ubicación
              </button>
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
            <div className="d-flex justify-content-evenly">
              <button onClick={CrearHistoria} className="btn btn-success w-100">
                Asociar Historia
              </button>
              <button onClick={EditarHistoria} className="btn btn-secondary w-100">
                Editar Historia
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center my-5">
        <div className="col-12 col-lg-10">
          <iframe
            src={mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            title="OpenStreetMap"
          />
        </div>
      </div>
       
      <Footer />
    </div>
  )
}


