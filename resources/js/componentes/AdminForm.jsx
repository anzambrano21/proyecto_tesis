"use client"

import { useState, useEffect,useContext  } from "react"
import axios from "axios"

const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export const FormDatAdmin = () => {

  const [selectedDays, setSelectedDays] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
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
  const [Citas,setCitas]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://127.0.0.1:8000/api/Insta`)
        console.log(response.data)

        // Ensure all fields have at least empty strings if they're null/undefined
        const sanitizedData = {
          IDuser: response.data.IDuser || "",
          Token: response.data.Token || "",
          Nombre: response.data.Nombre || "",
          Apellido: response.data.Apellido || "",
          Direccion: response.data.Direccion || "",
          Telefono: response.data.Telefono || "",
          Correo: response.data.Correo || "",
          Dias: response.data.Dias ? response.data.Dias.split(',') : []
        }
        console.log(sanitizedData);
        

        setDatos(sanitizedData)

        // Establecer los días seleccionados basados en los datos recibidos
        if (sanitizedData.Dias.length > 0) {
          setSelectedDays(sanitizedData.Dias)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Error al cargar los datos. Por favor, intente nuevamente.")
      } finally {
        setLoading(false)
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

  const validateForm = () => {
    const { IDuser, Token, Nombre, Apellido, Direccion, Telefono, Correo } = datos
    const missingFields = []

    if (!IDuser) missingFields.push("ID User")
    if (!Token) missingFields.push("Token")
    if (!Nombre) missingFields.push("Nombre")
    if (!Apellido) missingFields.push("Apellido")
    if (!Direccion) missingFields.push("Dirección")
    if (!Telefono) missingFields.push("Teléfono")
    if (!Correo) missingFields.push("Correo")

    return {
      isValid: missingFields.length === 0,
      missingFields,
    }
  }

  const guardar = async () => {
    const validation = validateForm()

    if (validation.isValid) {
      const datosToSend = {
        ...datos,
        dias: selectedDays.join(","),
      }
      console.log(selectedDays);
      


      try {
        let res = await axios.put(`http://127.0.0.1:8000/api/Insta/${0}`, datosToSend)
        if(res.data.length>0){
          setCitas(res.data)
        }else{
          alert("Datos Actualizados")
          window.location.href="http://127.0.0.1:8000/conte"
        }
        
      } catch (error) {
        console.error("Error al actualizar los datos:", error)
        alert("Hubo un error al actualizar los datos.")
      }
    } else {
      alert(`Los siguientes campos son requeridos: ${validation.missingFields.join(", ")}`)
    }
  }
  const guardar2= async (res)=>{
    if(res){
      const datosToSend = {
        ...datos,
        dias: selectedDays.join(","),
        fechas:Citas
      }
      console.log(datosToSend);
      
      try {
        axios.put(`http://127.0.0.1:8000/api/Insta/${1}`, datosToSend)
        alert("Datos Actualizados")
        setCitas([])
        window.location.href="http://127.0.0.1:8000/conte"
      } catch (error) {
        console.error("Error al actualizar los datos:", error)
        alert("Hubo un error al actualizar los datos.")
      }
    }else{
      setCitas([])
    }
    
  }

  if (loading) {
    return <div className="container py-4">Cargando...</div>
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    )
  }


  return (
    <div className="container py-4">
      <h1 className="mb-4">Información de Consultorio</h1>
      <div>
        <div className="border rounded p-3 mb-4">
          <h5 className="mb-3">Días de Descanso</h5>
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
        <div className={Citas.length>0?"emergent-panel2 bgprimario":'none'}>
          <div className="conemer" >
          <h4>Tiene CItas para estos dias </h4>
          <p>(Al Aceptar los Cambios se Borraran las Citas de Estos Dias)</p>
          <ul>
          {Citas.map((row, index) => (
           <li key={index}>{row}</li>
          ))}
          </ul>
          <div className="d-flex justify-content-evenly">
          <button className="btn btn-danger"onClick={()=>{guardar2(false)}}>Rechazar Cambios</button>
          <button className="btn btn-primary" onClick={()=>{guardar2(true)}}>Guardar Cambios</button>
          </div>
          
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="IDuser">ID User</label>
            <input
              type="text"
              className="form-control"
              value={datos.IDuser}
              id="IDuser"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Token">Token</label>
            <input
              type="text"
              className="form-control"
              value={datos.Token}
              id="Token"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="Nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={datos.Nombre}
              id="Nombre"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Apellido">Apellido</label>
            <input
              type="text"
              className="form-control"
              value={datos.Apellido}
              id="Apellido"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Direccion">Dirección</label>
          <input
            type="text"
            className="form-control"
            value={datos.Direccion}
            id="Direccion"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="Telefono">Teléfono</label>
            <input
              type="tel"
              className="form-control"
              value={datos.Telefono}
              id="Telefono"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Correo">Correo</label>
            <input
              type="email"
              className="form-control"
              value={datos.Correo}
              id="Correo"
              onChange={handleChange}
              required
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

