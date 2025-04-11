import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import React, { useEffect, useState, useContext } from 'react';
import {GeneralCont} from '../componentes/GenerarContenido.jsx'
import {ObcionAdmin} from '../componentes/ObcionesAdmin.jsx'
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
export const Contenido = () => {
    const example = useContext(Exaplecontect)
    console.log();
    if(Object.keys(example.datos).length==0){
        alert("Deves de Iniciar Sesióon")   
        window.location.href="http://127.0.0.1:8000/"
        return
    }
    if(example.datos.Rol!=='medico'){
        return (
            <div>
                <Navegador />
                <GeneralCont id={example.datos.id}/>
    
    
                <Footer />
            </div>
    
        )
    }else{
        return (
            <div>
                <Navegador />
                
                <div className='contenedor py-5 '>
                    <div className='row justify-content-around '>
                    <ObcionAdmin tag={'http://127.0.0.1:8000/Admin'} Titulo={'Info del Consultorio'} descrip={'Cambio de los datos del consultorio (Correo, Fechas, Instagram)'} Imagen={'http://localhost:5173/public/imagen/datos.png'} />
                    <ObcionAdmin tag={'http://127.0.0.1:8000/CrearConte'} Titulo={'Crear Contenido'} descrip={'Crear Contenido o material que el paciente puede usar para su recuperacion'} Imagen={'http://localhost:5173/public/imagen/material.webp'}/>
                    <ObcionAdmin tag={'http://127.0.0.1:8000/Asignar'} Titulo={'Asignar Contenido a paciente'} descrip={'Modulo para la asignacion de material de recuperacion del paciente'} Imagen={'http://localhost:5173/public/imagen/asignacio.webp'} />
                    
                    </div>
                    <div className='row py-5 justify-content-around '>
                    <ObcionAdmin tag={'http://127.0.0.1:8000/fisioCita'} Titulo={'Agenda Fisioterapia'} descrip={'Modulo para Visualizar la agenda del fisioterapeuta '} Imagen={'http://localhost:5173/public/imagen/agenda.webp'} />
                    </div>
                </div>
                <Footer />
            </div>
    
        )
    }
   
}