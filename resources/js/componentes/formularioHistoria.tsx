import React, { useState, useEffect } from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import axios from "axios"
interface FormData {
  id: number;
  Nombre: string;
  Servicio: string;
  sexo: string;
  fechaN: string;
  estadoC: string;
  Ocupa: string;
  Lugar: string;
  Ubicacion: string;
  fechaIngreso: string;
  informacionAdicional: string;
  motivoIngreso: string;
  enfermedadActual: string;
  diagnosticoProvisional: string;
  diagnosticoServicio: string;
  osteomuscular: string[];
  nerviosoYMental: string[];
  extremidades: string[];
  neurologicoYPsiquico: string[];
}

export const FormHistoria: React.FC<{ dato: Record<string, any> }> = ({ dato }) => {
  const [formData, setFormData] = useState<FormData>({
    id:  dato.id,
    Nombre: dato.Nombre || '',
    Servicio: dato.Servicio || '',
    sexo: dato.sexo || '',
    fechaN: dato.fechaN || '',
    estadoC: dato.estadoC || '',
    Ocupa: dato.Ocupa || '',
    Lugar: dato.Lugar || '',
    Ubicacion: dato.Ubicacion || '',
    fechaIngreso: dato.fechaIngreso || '',
    informacionAdicional: dato.informacionAdicional || '',
    motivoIngreso: dato.motivoIngreso || '',
    enfermedadActual: dato.enfermedadActual || '',
    diagnosticoProvisional: dato.diagnosticoProvisional || '',
    diagnosticoServicio: dato.diagnosticoServicio || '',
    osteomuscular: dato.osteomuscular || [],
    nerviosoYMental: dato.nerviosoYMental || [],
    extremidades: dato.extremidades || [],
    neurologicoYPsiquico: dato.neurologicoYPsiquico || []
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      id:  dato.id || prevData.id,
      Nombre: dato.Nombre || prevData.Nombre,
      Servicio: dato.Servicio || prevData.Servicio,
      sexo: dato.sexo || prevData.sexo,
      fechaN: dato.fechaN || prevData.fechaN,
      estadoC: dato.estadoC || prevData.estadoC,
      Ocupa: dato.Ocupa || prevData.Ocupa,
      Lugar: dato.Lugar || prevData.Lugar,
      Ubicacion: dato.Ubicacion || prevData.Ubicacion,
      fechaIngreso: dato.fechaIngreso || prevData.fechaIngreso,
      informacionAdicional: dato.informacionAdicional || prevData.informacionAdicional,
      motivoIngreso: dato.motivoIngreso || prevData.motivoIngreso,
      enfermedadActual: dato.enfermedadActual || prevData.enfermedadActual,
      diagnosticoProvisional: dato.diagnosticoProvisional || prevData.diagnosticoProvisional,
      diagnosticoServicio: dato.diagnosticoServicio || prevData.diagnosticoServicio,
      osteomuscular: dato.osteomuscular || prevData.osteomuscular,
      nerviosoYMental: dato.nerviosoYMental || prevData.nerviosoYMental,
      extremidades: dato.extremidades || prevData.extremidades,
      neurologicoYPsiquico: dato.neurologicoYPsiquico || prevData.neurologicoYPsiquico
    }));
  }, [dato]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prevData => {
      const currentValues = prevData[name as keyof FormData] as string[];
      if (checked) {
        return { ...prevData, [name]: [...currentValues, value] };
      } else {
        return { ...prevData, [name]: currentValues.filter(v => v !== value) };
      }
    });
  };

  const edad = (fecha: string): string => {
    if (!fecha) return '';
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return isNaN(edad) ? '' : edad.toString();
  };

  const guardar = async () => {
    console.log(formData);
    
    
    axios.post('http://127.0.0.1:8000/api/Historia',formData)
  };

  return (
    <div className="container py-4">
      <h2>Formulario Historias</h2>
      <div>
        {/* Primera fila */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="Nombre"
                name="Nombre"
                placeholder="Nombre Completo"
                value={formData.Nombre}
                onChange={handleChange}
              />
              <label htmlFor="Nombre">Nombre Completo</label>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="Servicio"
                name="Servicio"
                placeholder="Servicio"
                value={formData.Servicio}
                onChange={handleChange}
              />
              <label htmlFor="Servicio">Servicio</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="sexo"
                    id="masculino"
                    value="masculino"
                    checked={formData.sexo === 'M'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="masculino">
                    Masculino
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="sexo"
                    id="femenino"
                    value="femenino"
                    checked={formData.sexo === 'F'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="femenino">
                    Femenino
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="edad"
                name="edad"
                placeholder="Edad"
                value={edad(formData.fechaN)}
                readOnly
              />
              <label htmlFor="edad">Edad</label>
            </div>
          </div>
        </div>

        {/* Segunda fila */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="estadoC"
                name="estadoC"
                placeholder="Estado Civil"
                value={formData.estadoC}
                onChange={handleChange}
              />
              <label htmlFor="estadoC">Estado Civil</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="Ocupa"
                name="Ocupa"
                placeholder="Ocupación"
                value={formData.Ocupa}
                onChange={handleChange}
              />
              <label htmlFor="Ocupa">Ocupación</label>
            </div>
          </div>
        </div>

        {/* Tercera fila */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="Lugar"
                name="Lugar"
                placeholder="Lugar de nacimiento"
                value={formData.Lugar}
                onChange={handleChange}
              />
              <label htmlFor="Lugar">Lugar de nacimiento</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                id="fechaN"
                name="fechaN"
                placeholder="Fecha de Nacimiento"
                value={formData.fechaN}
                onChange={handleChange}
              />
              <label htmlFor="fechaN">Fecha de Nacimiento</label>
            </div>
          </div>
        </div>

        {/* Cuarta fila */}
        <div className="row g-3 mb-4">
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="Ubicacion"
                name="Ubicacion"
                placeholder="Dirección Completa"
                value={formData.Ubicacion}
                onChange={handleChange}
              />
              <label htmlFor="Ubicacion">Dirección Completa</label>
            </div>
          </div>
        </div>

        {/* Sexta fila */}
        <div className="row g-3 mb-4">
          <div className="col-md-12">
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                id="fechaIngreso"
                name="fechaIngreso"
                placeholder="Fecha de Primera Cita"
                value={formData.fechaIngreso}
                onChange={handleChange}
              />
              <label htmlFor="fechaIngreso">Fecha Primera Cita</label>
            </div>
          </div>
        </div>

        {/* Séptima fila */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-12">
                <CheckboxGroup 
                  title="OSTEOMUSCULAR" 
                  options={['Artralgias', 'Debilidad', 'Dolores óseos', 'Deformidades', 'Otros']} 
                  name='osteomuscular'
                  values={formData.osteomuscular}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-12">
                <CheckboxGroup 
                  title="NERVIOSO Y MENTAL" 
                  options={['Convulsiones', 'Estática', 'Estado emocional', 'Marcha', 'Parálisis', 'Temblor', 'Tics', 'Tipo de personalidad', 'Otros']} 
                  name='nerviosoYMental'
                  values={formData.nerviosoYMental}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-12">
                <CheckboxGroup 
                  title="EXTREMIDADES" 
                  name='extremidades'
                  options={['Color', 'Edemas', 'Temblor', 'Deformidades', 'Úlceras', 'Varices','Otros']} 
                  values={formData.extremidades}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-12">
                <CheckboxGroup 
                  title="NEUROLÓGICO Y PSÍQUICO" 
                  name='neurologicoYPsiquico'
                  options={['Sensibilidad objetiva', 'Movilidad', 'Reflectividad', 'Escritura', 'Tróficos','Marcha','Romberg','Orientación','Lenguaje' ,'Coordinación','Otros']} 
                  values={formData.neurologicoYPsiquico}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column">
            <div className="form-floating flex-grow-1">
              <textarea
                className="form-control h-100"
                id="informacionAdicional"
                name="informacionAdicional"
                placeholder="Información Adicional"
                style={{ minHeight: '200px' }}
                value={formData.informacionAdicional}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="informacionAdicional">Información Adicional</label>
            </div>
          </div>
        </div>

        {/* Octava fila */}
        <div className="row g-3 mb-4"><div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="motivoIngreso"
                name="motivoIngreso"
                placeholder="MOTIVO(S) DE INGRESO"
                style={{ height: '150px' }}
                value={formData.motivoIngreso}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="motivoIngreso">MOTIVO(S) DE INGRESO</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="enfermedadActual"
                name="enfermedadActual"
                placeholder="ENFERMEDAD ACTUAL"
                style={{ height: '150px' }}
                value={formData.enfermedadActual}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="enfermedadActual">ENFERMEDAD ACTUAL</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="diagnosticoProvisional"
                name="diagnosticoProvisional"
                placeholder="DIAGNÓSTICO PROVISIONAL"
                style={{ height: '150px' }}
                value={formData.diagnosticoProvisional}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="diagnosticoProvisional">DIAGNÓSTICO PROVISIONAL</label>
            </div>
          </div>
        </div>

        {/* Diagnóstico del Servicio */}
        <div className="row g-3 mb-4">
          <div className="col-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="diagnosticoServicio"
                name="diagnosticoServicio"
                placeholder="DIAGNÓSTICO DEL SERVICIO"
                style={{ height: '150px' }}
                value={formData.diagnosticoServicio}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="diagnosticoServicio">DIAGNÓSTICO DEL SERVICIO</label>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="row">
          <div className="col-12">
            <button onClick={guardar} className="btn btn-primary">
              Guardar Formulario
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

