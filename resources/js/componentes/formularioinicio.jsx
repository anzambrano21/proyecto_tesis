import { useState, useEffect, useContext } from 'react'

import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Eye, EyeOff } from 'lucide-react'
import axios from "axios"
export const InicioFormu=()=>{
  const [showPassword, setShowPassword] = useState(false)
  const example = useContext(Exaplecontect)
  
  async function Inicio() {
    let datos={
      email: document.getElementById('email').value,
      contra: document.getElementById('password').value
    }
    let response = await axios.post('http://127.0.0.1:8000/api/log',datos)
    if (response.data['home']=="Login successful"){
      console.log(response);
      alert("Session iniciada")
      example.setDatos(response.data);
      window.location.href="http://127.0.0.1:8000/"
    }else{
      alert("Datos Incorrepto");
    }

    
    
    
    
  }



  return (
    <div className="container mt-5  mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              <div >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="tu@ejemplo.com" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <div className="input-group">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      id="password" 
                      placeholder="••••••••" 
                      required 
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button onClick={Inicio} className="btn btn-primary">
                    Iniciar Sesión
                  </button>
                </div>
              </div>
              <div className="mt-3 text-center">
                <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="mt-2 text-center">
                ¿No tienes una cuenta? <a href="Registro" className="text-decoration-none">Regístrate</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}