
const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
import React from "react"
import { useState } from "react"
import axios from "axios"
export const FormDatAdmin = () => {
    const [selectedDays, setSelectedDays] = useState([])

    const handleDayChange = (day) => {
        setSelectedDays((prevSelectedDays) =>
          prevSelectedDays.includes(day)
            ? prevSelectedDays.filter((d) => d !== day)
            : [...prevSelectedDays, day]
        );
      };


    const Guardar = async ()=>{
        const datos = {
            idUser: document.getElementById('idUser').value,
            Token: document.getElementById('validationToken').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            availableDays: selectedDays
          };
        axios.post('http://127.0.0.1:8000/api/Insta',datos);
        
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
              <input type="text" className="form-control" id="idUser" placeholder="ID Usuario" />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" id='validationToken' placeholder="Token de validación" />
            </div>
          </div>
  
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input type="text" className="form-control" id='firstName' placeholder="Nombre" />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" id="lastName" placeholder="Apellido" />
            </div>
          </div>
  
          <div className="mb-3">
            <input type="text" className="form-control" id="address" placeholder="Dirección" />
          </div>
  
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input type="tel" className="form-control" id="phone" placeholder="Teléfono" />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control" id="email" placeholder="Correo" />
            </div>
          </div>
  
          <div className="d-grid gap-2">
            <button onClick={Guardar} className="btn btn-primary">
              Guardar Información
            </button>
          </div>
        </div>
      </div>
    )
}