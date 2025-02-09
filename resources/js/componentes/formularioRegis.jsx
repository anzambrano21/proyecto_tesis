import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Eye, EyeOff, User, Mail, MapPin, Phone, Lock } from 'lucide-react'
import axios from 'axios'
export  const RegistroForm=()=> {
  const [showPassword, setShowPassword] = useState(false)
  async function  Registro() {
    let datos={
      nom: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      ubica: document.getElementById('ubicacion').value,
      telef: document.getElementById('telefono').value,
      contra: document.getElementById('password').value,

    }
    axios.post('http://127.0.0.1:8000/api/Usuario',datos)
    //window.location.href="http://127.0.0.1:8000/InicioSecion"
    
  }

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg my-5">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4 fw-bold">Registro de Paciente</h2>
              <div >
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <User size={18} />
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-start-0 bg-light" 
                      id="nombre" 
                      placeholder="Nombre completo" 
                      required 
                      aria-label="Nombre completo"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Mail size={18} />
                    </span>
                    <input 
                      type="email" 
                      className="form-control border-start-0 bg-light" 
                      id="email" 
                      placeholder="Correo electrónico" 
                      required 
                      aria-label="Correo electrónico"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MapPin size={18} />
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-start-0 bg-light" 
                      id="ubicacion" 
                      placeholder="Ubicación" 
                      required 
                      aria-label="Ubicación"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Phone size={18} />
                    </span>
                    <input 
                      type="tel" 
                      className="form-control border-start-0 bg-light" 
                      id="telefono" 
                      placeholder="Teléfono" 
                      required 
                      aria-label="Teléfono"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Lock size={18} />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control border-start-0 border-end-0 bg-light" 
                      id="password" 
                      placeholder="Contraseña" 
                      required 
                      aria-label="Contraseña"
                    />
                    <button 
                      className="btn btn-light border border-start-0" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button onClick={Registro} className="btn btn-primary btn-lg">
                    Registrarse
                  </button>
                </div>
                <div className="text-center">
                  ¿Ya tienes una cuenta? <a href="InicioSecion" className="text-decoration-none">Inicia sesión</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}