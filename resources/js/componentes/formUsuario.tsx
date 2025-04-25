import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { useState, useEffect, useContext } from 'react'

export const FormUser = ({onClick,cambios,datos}) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: Record<string, string | string[]> = {};

        // Obtener valores de los inputs de texto, número, fecha y hora
        const inputIds = [
            'nombre', 'ubicacion', 'email', 'telefono', 'password', 'ocupa',
            'lugar', 'fechaN'
        ];

        inputIds.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
                formData[id] = element.value;
            }
        });
        const selectIds = ['estadoC', 'sexo'];
         // Añade los IDs de tus elementos select aquí 
         selectIds.forEach(id => { 
            const element = document.getElementById(id) as HTMLSelectElement;
             if (element) { 
                formData[id] = element.value; 
            } });



        cambios(formData)
        // Aquí puedes enviar formData a una API o realizar otras acciones
    };

    return (
        <div className="card-body container pt-5">
            <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="row g-3">

                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" required />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                        <input type="text" className="form-control" id="ubicacion" required />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required value={datos.email} />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="telefono" required />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" required />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="sexo" className="form-label">Sexo</label>
                        <select className="form-select" id="sexo" required>
                            <option value="">Seleccionar...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="O">Otro</option>
                        </select>
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="estadoC" className="form-label">Estado Civil</label>
                        <select className="form-select" id="estadoC" required>
                            <option value="">Seleccionar...</option>
                            <option value="soltero">Soltero/a</option>
                            <option value="casado">Casado/a</option>
                            <option value="divorciado">Divorciado/a</option>
                            <option value="viudo">Viudo/a</option>
                        </select>
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="ocupa" className="form-label">Ocupación</label>
                        <input type="text" className="form-control" id="ocupa" required />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="lugar" className="form-label">Lugar de Nacimiento</label>
                        <input type="text" className="form-control" id="lugar" required />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="fechaN" className="form-label">Fecha de Nacimiento</label>
                        <input type="date" className="form-control" id="fechaN" required />
                    </div>
                    <div className=" col-3 mt-4">
                        <button className="btn btn-primary w-100" type="submit">Guardar</button>
                    </div>
                    <div className=" col-3 mt-4">
                        <button className="btn btn-danger w-100" onClick={onClick}>Cerrar Sesión</button>
                    </div>
                </div>


            </form>
        </div>
    )
}