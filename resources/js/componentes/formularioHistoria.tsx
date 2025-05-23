"use client"

import React from "react"
import { useState, useEffect } from "react"
import { CheckboxGroup } from "./CheckboxGroup"
import axios from "axios"

interface NotaEvalua {
  id: number
  Nota: string
}

interface Tratamiento {
  id: number
  Tratamiento: string
}

interface FormData {
  id: number
  Nombre: string
  Servicio: string
  sexo: string
  EGRESO: string
  fechaN: string
  estadoC: string
  Ocupa: string
  Lugar: string
  Ubicacion: string
  fechaIngreso: string
  informacionAdicional: string
  motivoIngreso: string
  enfermedadActual: string
  diagnosticoProvisional: string
  diagnosticoServicio: string
  nuevaNotaEvalua: string
  NotaEvalua: NotaEvalua[]
  nuevaTratamiento: string
  Tratamiento: Tratamiento[]
  osteomuscular: string[]
  nerviosoYMental: string[]
  extremidades: string[]
  neurologicoYPsiquico: string[]
  idH: number
}

export const FormHistoria: React.FC<{ dato: Record<string, any> }> = ({ dato }) => {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData | null>(null)

  useEffect(() => {
    // Check if dato is available and has the expected structure
    if (dato && dato[0] && dato[1]) {
      try {
        setFormData({
          id: dato[0].id || 0,
          Nombre: dato[0].Nombre || "",
          Servicio: dato[0].Servicio || "",
          sexo: dato[0].sexo || "",
          fechaN: dato[0].fechaN || "",
          estadoC: dato[0].estadoC || "",
          Ocupa: dato[0].Ocupa || "",
          Lugar: dato[0].Lugar || "",
          Ubicacion: dato[0].Ubicacion || "",
          fechaIngreso: dato.fechaIngreso || "",
          informacionAdicional: dato[1].infoAdd || "",
          motivoIngreso: dato[1].motivoIngreso || "",
          enfermedadActual: dato[1].enfermedadAct || "",
          diagnosticoProvisional: dato[1].diagnosPro || "",
          diagnosticoServicio: dato[1].diagnoServ || "",
          nuevaNotaEvalua: "",
          nuevaTratamiento: "",
          Tratamiento: dato[1].tratamiento
            ? dato[1].tratamiento.map((t: any) => ({ id: t.id, Tratamiento: t.Tratamiento }))
            : [],
          NotaEvalua: dato[1].nota ? dato[1].nota.map((n: any) => ({ id: n.id, Nota: n.Nota })) : [],
          osteomuscular: dato[1].OSTEOMUSCULAR ? dato[1].OSTEOMUSCULAR.split(",") : [],
          nerviosoYMental: dato[1].NERVIOSOMENTAL ? dato[1].NERVIOSOMENTAL.split(",") : [],
          extremidades: dato[1].EXTREMIDADES ? dato[1].EXTREMIDADES.split(",") : [],
          neurologicoYPsiquico: dato[1].NEUROLÓGICOPSÍQUICO ? dato[1].NEUROLÓGICOPSÍQUICO.split(",") : [],
          idH: dato[1].id || 0,
          EGRESO: dato[1].egreso || "",
        })
      } catch (error) {
        console.error("Error setting form data:", error)
      }
    }
    setLoading(false)
  }, [dato])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return

    const { name, id, value } = e.target
    const fieldName = e.target.type === "radio" ? name : id
    setFormData((prevData) => {
      if (!prevData) return null
      return { ...prevData, [fieldName]: value }
    })
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    if (!formData) return

    setFormData((prevData) => {
      if (!prevData) return null

      const currentValues = prevData[name as keyof FormData] as string[]
      if (checked) {
        return { ...prevData, [name]: [...currentValues, value] }
      } else {
        return { ...prevData, [name]: currentValues.filter((v) => v !== value) }
      }
    })
  }

  const handleNotaEvaluaChange = (id: number, value: string) => {
    if (!formData) return

    setFormData((prevData) => {
      if (!prevData) return null
      const newNotaEvalua = prevData.NotaEvalua.map((nota) => (nota.id === id ? { ...nota, Nota: value } : nota))
      return { ...prevData, NotaEvalua: newNotaEvalua }
    })
  }

  const handleTratamientoChange = (id: number, value: string) => {
    if (!formData) return

    setFormData((prevData) => {
      if (!prevData) return null
      const newTratamiento = prevData.Tratamiento.map((trat) =>
        trat.id === id ? { ...trat, Tratamiento: value } : trat,
      )
      return { ...prevData, Tratamiento: newTratamiento }
    })
  }

  const edad = (fecha: string): string => {
    if (!fecha) return ""
    const hoy = new Date()
    const nacimiento = new Date(fecha)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return isNaN(edad) ? "" : edad.toString()
  }

  const guardar = async () => {
    if (!formData) return

    const requiredFields = {
      motivoIngreso: "Motivo de Ingreso",
      enfermedadActual: "Enfermedad Actual",
      diagnosticoProvisional: "Diagnóstico Provisional",
    }

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key as keyof FormData] || (formData[key as keyof FormData] as string).trim() === "")
      .map(([_, label]) => label)

    if (emptyFields.length > 0) {
      alert(`Los siguientes campos son obligatorios y están vacíos:\n${emptyFields.join("\n")}`)
      return
    }

    try {
      console.log(formData)

      const response = await axios.post("http://127.0.0.1:8000/api/Historia", formData)
      console.log("Respuesta del servidor:", response.data)
      alert("Formulario guardado con éxito")
      window.history.back()
    } catch (error) {
      console.error("Error al guardar:", error)
      alert("Error al guardar el formulario")
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="container py-4">
        <h2>Cargando formulario...</h2>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  // Show error if data is not available
  if (!formData) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error al cargar los datos</h4>
          <p>No se pudieron cargar los datos del formulario. Por favor, intente nuevamente.</p>
        </div>
      </div>
    )
  }

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
              <label htmlFor="Nombre">Nombre Completo*</label>
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
              <label htmlFor="Servicio">Servicio *</label>
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
                    value="M"
                    checked={formData.sexo === "M"}
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
                    value="F"
                    checked={formData.sexo === "F"}
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
              <label htmlFor="edad">Edad *</label>
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
              <label htmlFor="estadoC">Estado Civil *</label>
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
              <label htmlFor="Ocupa">Ocupación *</label>
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
              <label htmlFor="Lugar">Lugar de nacimiento *</label>
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
              <label htmlFor="fechaN">Fecha de Nacimiento *</label>
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
              <label htmlFor="Ubicacion">Dirección Completa *</label>
            </div>
          </div>
        </div>

        {/* Sexta fila */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
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
              <label htmlFor="fechaIngreso">Fecha Primera Cita *</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                {/* Título del bloque */}
                <p className="card-title text-center">Motivo de Alta</p>

                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="EGRESO"
                      id="curacion"
                      value="CURACIÓN"
                      checked={formData.EGRESO === "CURACIÓN"}
                      onClick={(e) => {
                        // Use onClick instead of onChange for toggling
                        if (formData.EGRESO === "CURACIÓN") {
                          // If already selected, clear it
                          setFormData({ ...formData, EGRESO: "" })
                        } else {
                          // Otherwise set the new value
                          setFormData({ ...formData, EGRESO: "CURACIÓN" })
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor="curacion">
                      CURACIÓN
                    </label>
                  </div>
                  <div className="form-check ms-5">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="EGRESO"
                      id="mejoria"
                      value="MEJORÍA"
                      checked={formData.EGRESO === "MEJORÍA"}
                      onClick={(e) => {
                        // Use onClick instead of onChange for toggling
                        if (formData.EGRESO === "MEJORÍA") {
                          // If already selected, clear it
                          setFormData({ ...formData, EGRESO: "" })
                        } else {
                          // Otherwise set the new value
                          setFormData({ ...formData, EGRESO: "MEJORÍA" })
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor="mejoria">
                      MEJORÍA
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Séptima fila */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-12">
              <CheckboxGroup
                  title="EXTREMIDADES"
                  name="extremidades"
                  options={["Color", "Edemas", "Temblor", "Deformidades", "Úlceras", "Varices", "Otros"]}
                  values={formData.extremidades}
                  onChange={handleCheckboxChange}
                />
                
              </div>
              <div className="col-12">
              <CheckboxGroup
                  title="OSTEOMUSCULAR"
                  options={["Artralgias", "Debilidad", "Dolores óseos", "Deformidades", "Otros"]}
                  name="osteomuscular"
                  values={formData.osteomuscular}
                  onChange={handleCheckboxChange}
                />
                
              </div>
              <div className="col-12">
              <CheckboxGroup
                  title="NERVIOSO Y MENTAL"
                  options={[
                    "Convulsiones",
                    "Estática",
                    "Estado emocional",
                    "Marcha",
                    "Parálisis",
                    "Temblor",
                    "Tics",
                    "Tipo de personalidad",
                    "Otros",
                  ]}
                  name="nerviosoYMental"
                  values={formData.nerviosoYMental}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-12">
                <CheckboxGroup
                  title="NEUROLÓGICO Y PSÍQUICO"
                  name="neurologicoYPsiquico"
                  options={[
                    "Sensibilidad objetiva",
                    "Movilidad",
                    "Reflectividad",
                    "Escritura",
                    "Tróficos",
                    "Marcha",
                    "Romberg",
                    "Orientación",
                    "Lenguaje",
                    "Coordinación",
                    "Otros",
                  ]}
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
                style={{ minHeight: "200px" }}
                value={formData.informacionAdicional}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="informacionAdicional">Información Adicional</label>
            </div>
          </div>
        </div>

        {/* Octava fila */}
        <div className="row g-3 ">
          <div className="row g-3 ">
            <div className="col-md-4">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="motivoIngreso"
                  name="motivoIngreso"
                  placeholder="MOTIVO(S) DE INGRESO"
                  style={{ height: "150px" }}
                  value={formData.motivoIngreso}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="motivoIngreso">MOTIVO(S) DE Consulta *</label>
              </div>
            </div>
            <div className="col-4">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="enfermedadActual"
                  name="enfermedadActual"
                  placeholder="ENFERMEDAD ACTUAL"
                  style={{ height: "150px" }}
                  value={formData.enfermedadActual}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="enfermedadActual">ENFERMEDAD ACTUAL *</label>
              </div>
            </div>
            <div className="col-4">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="diagnosticoProvisional"
                  name="diagnosticoProvisional"
                  placeholder="DIAGNÓSTICO PROVISIONAL"
                  style={{ height: "150px" }}
                  value={formData.diagnosticoProvisional}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="diagnosticoProvisional">DIAGNÓSTICO PROVISIONAL *</label>
              </div>
            </div>
          </div>

          {/* Diagnóstico del Servicio */}
          <div className="row g-3 ">
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="diagnosticoServicio"
                  name="diagnosticoServicio"
                  placeholder="DIAGNÓSTICO DEL SERVICIO"
                  style={{ height: "150px" }}
                  value={formData.diagnosticoServicio}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="diagnosticoServicio">DIAGNÓSTICO DEL SERVICIO</label>
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id={`nuevaNotaEvalua`}
                  name={`nuevaNotaEvalua`}
                  placeholder="DIAGNÓSTICO DEL SERVICIO"
                  style={{ height: "150px" }}
                  value={formData.nuevaNotaEvalua}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor={`nuevaNotaEvalua`}>Nueva Nota de Evaluación</label>
              </div>
            </div>
          </div>
          {formData.NotaEvalua.map((nota, index) => (
            <div className="row g-3" key={nota.id}>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id={`NotaEvalua-${nota.id}`}
                    name={`NotaEvalua-${nota.id}`}
                    placeholder="DIAGNÓSTICO DEL SERVICIO"
                    style={{ height: "150px" }}
                    value={nota.Nota}
                    onChange={(e) => handleNotaEvaluaChange(nota.id, e.target.value)}
                  ></textarea>
                  <label htmlFor={`NotaEvalua-${nota.id}`}>Nota de Evolución {index + 2}</label>
                </div>
              </div>
            </div>
          ))}
          <div className="row g-3">
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id={`nuevaTratamiento`}
                  name={`nuevaTratamiento`}
                  placeholder="Tratamiento"
                  style={{ height: "150px" }}
                  value={formData.nuevaTratamiento}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor={`nuevaTratamiento`}>Plan de  Tratamiento</label>
              </div>
            </div>
          </div>
          {formData.Tratamiento.map((trat, index) => (
            <div className="row g-3" key={trat.id}>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id={`Tratamiento-${trat.id}`}
                    name={`Tratamiento-${trat.id}`}
                    placeholder="Tratamiento"
                    style={{ height: "150px" }}
                    value={trat.Tratamiento}
                    onChange={(e) => handleTratamientoChange(trat.id, e.target.value)}
                  ></textarea>
                  <label htmlFor={`Tratamiento-${trat.id}`}>Tratamiento {index + 2}</label>
                </div>
              </div>
            </div>
          ))}

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
  )
}
