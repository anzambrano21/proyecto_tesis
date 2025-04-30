"use client";

import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { Exaplecontect } from "../context/contexto";
import { Navegador } from "../componentes/navegador";
import { TablaCita } from "../componentes/tablaaCita";
import { TablaHistoria } from "../componentes/tablaHistorias";
import { Footer } from "../componentes/Footer";

export const FisioCita = () => {
  const example = useContext(Exaplecontect);

  const [data, setData] = useState([]);
  const [histo, setHisto] = useState([]);
  const [address, setAddress] = useState("");
  const [mapUrl, setMapUrl] = useState(
    "https://www.openstreetmap.org/export/embed.html?bbox=-74.0107,40.7020,-73.9907,40.7120&layer=mapnik"
  );
  const [formData, setFormData] = useState({
    nombre: "",
    date: "",
    time: "",
    edad: "",
    sexo: "",
    id: "",
  });
  const [historia, setHistoria] = useState({ diagnoServ: "" });

  const API_BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (Object.keys(example?.datos || {}).length === 0 || example?.datos?.Rol === "paciente")
    ) {
      window.location.href = "http://127.0.0.1:8000/";
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/all`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [example]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const bbox = `${Number.parseFloat(lon) - 0.01},${Number.parseFloat(lat) - 0.01},${Number.parseFloat(lon) + 0.01},${Number.parseFloat(lat) + 0.01}`;
        const newMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
        setMapUrl(newMapUrl);
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  const handleSelectCita = async (cita) => {
    const hoy = new Date();
    const nacimiento = new Date(cita.user.fechaN);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    setFormData({
      nombre: cita.user.Nombre,
      date: cita.fecha,
      time: cita.hora,
      edad: edad.toString(),
      sexo: cita.user.sexo,
      id: cita.user.id,
    });

    setAddress(cita.direc);

    try {
      const historias = await axios.get(`${API_BASE_URL}/api/Historia/${cita.IdUser}`);
      setHisto(historias.data);
    } catch (error) {
      console.error("Error fetching historias:", error);
      setHisto([]);
    }
  };

  const crearHistoria = () => {
    if (formData.id !== "") {
      router.push(`/historias?User=${formData.id}&H=0`);
    } else {
      alert("Necesitas Seleccionar un Usuario");
    }
  };

  const editarHistoria = () => {
    if (historia && historia.id) {
      window.location.href = `http://127.0.0.1:8000/Historias?User=${formData.id}&H=${historia.id}`;
    } else {
      alert("Necesitas Seleccionar una Historia");
    }
  };

  const getHisto = (historia) => {
    console.log(historia);

    setHistoria(historia);
  };

  if (
    typeof window !== "undefined" &&
    (Object.keys(example?.datos || {}).length === 0 || example?.datos?.Rol === "paciente")
  ) {
    return null;
  }

  return (
    <div className="">
      <Navegador />
      <div className="row justify-content-around my-4">
        <div className="col-12 col-md-5">
          <TablaCita onSelect={handleSelectCita} data={data} />
        </div>
        <div className="col-12 col-md-5">
          <TablaHistoria data={histo} funcion={getHisto} />
        </div>
      </div>
      <div className="row justify-content-around my-4">
        <div className="col-12 col-md-5">
          <div className="card p-3">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="edad" className="form-label">Edad</label>
                <input
                  id="edad"
                  value={formData.edad}
                  readOnly
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                <input
                  id="ubicacion"
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button onClick={handleSubmit} className="btn btn-primary mt-2">
                  Buscar Ubicación
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <div className="card p-3">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="patologia" className="form-label">Diagnóstico</label>
                <input
                  id="patologia"
                  type="text"
                  value={historia.diagnoServ}
                  readOnly
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="sexo" className="form-label">Sexo</label>
                <input
                  id="sexo"
                  value={formData.sexo}
                  readOnly
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="d-flex gap-2">
                  <button onClick={crearHistoria} className="btn btn-success flex-grow-1">
                    Asociar Historia
                  </button>
                  <button onClick={editarHistoria} className="btn btn-secondary flex-grow-1">
                    Editar Historia
                  </button>
                </div>
              </div>
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
  );
};
