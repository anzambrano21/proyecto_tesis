"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export const FormDatAdmin = () => {
  const [selectedDays, setSelectedDays] = useState([])
  const [datos, setDatos] = useState({
    IDuser: "",
    Token: "",
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Telefono: "",
    Correo: "",
    Dias: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/Insta`)
        console.log(response.data)
        setDatos(response.data)
        // Establecer los días seleccionados basados en los datos recibidos
        if (response.data.Dias && Array.isArray(response.data.Dias)) {
          setSelectedDays(response.data.Dias)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day) ? prevSelectedDays.filter((d) => d !== day) : [...prevSelectedDays, day],
    )
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setDatos((prevDatos) => ({
      ...prevDatos,
      [id]: value,
    }))
  }

  const guardar = async () => {
    const { IDuser, Token, Nombre, Apellido, Direccion, Telefono, Correo } = datos

    if (IDuser && Token && Nombre && Apellido && Direccion && Telefono && Correo) {
      const datosToSend = {
        ...datos,
        dias: selectedDays.join(','),
      }

      console.log("Datos:", datosToSend)
      try {
        await axios.put(`http://127.0.0.1:8000/api/Insta/${IDuser}`, datosToSend)
        alert("Datos Actualizados")
      } catch (error) {
        console.error("Error al actualizar los datos:", error)
        alert("Hubo un error al actualizar los datos.")
      }
    } else {
      alert("Todos los campos deben estar llenos y no pueden ser nulos o vacíos.")
    }
  }

  if (!datos.IDuser) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Información de Usuario</h1>
      <div>
        <div className="border rounded p-3 mb-4">
          <h5 className="mb-3">Días Disponibles</h5>
          <div className="row g-2">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDayChange(day)}
                  />
                  <label className="form-check-label" htmlFor={day}>
                    {day}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={datos.IDuser}
              id="IDuser"
              onChange={handleChange}
              placeholder="ID Usuario"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={datos.Token}
              id="Token"
              onChange={handleChange}
              placeholder="Token de validación"
            />
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={datos.Nombre}
              id="Nombre"
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={datos.Apellido}
              id="Apellido"
              onChange={handleChange}
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={datos.Direccion}
            id="Direccion"
            onChange={handleChange}
            placeholder="Dirección"
          />
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="tel"
              className="form-control"
              value={datos.Telefono}
              id="Telefono"
              onChange={handleChange}
              placeholder="Teléfono"
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              value={datos.Correo}
              id="Correo"
              onChange={handleChange}
              placeholder="Correo"
            />
          </div>
        </div>
        <div className="d-grid gap-2">
          <button onClick={guardar} className="btn btn-primary">
            Guardar Información
          </button>
        </div>
      </div>
    </div>
  )
}

