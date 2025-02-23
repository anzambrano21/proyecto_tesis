import React, { useState, useEffect, useContext } from "react";
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
export const Navegador = () => {
    const example = useContext(Exaplecontect)
    console.log(example);


    return (
        <header className="bgprimario py-1 px-6">
            <div className="contenedor">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 className="text-primary-foreground text-2xl font-bold">Medical Center</h1>
                    </div>
                    <div className="col-md-6">
                        <nav>
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <a href="/" className="nav-link secundario ">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/Citas" className="nav-link secundario">Citas</a>
                                </li>

                                <li className="nav-item">
                                    <a href={(Object.keys(example.datos).length > 0) ? "/Usuario" : "/InicioSecion"} className="nav-link secundario">{(Object.keys(example.datos).length > 0) ? "Usuario" : "Inicio Sesion"}</a>
                                </li>
                                {example.datos.Rol === "medico" ? (
                                    <>
                                        <li className="nav-item">
                                            <a href="/fisioCita" className="nav-link secundario">Agendas</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/Admin" className="nav-link secundario">Admin</a>
                                        </li>
                                    </>
                                ) : null}

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}