import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import React, { useEffect, useState } from 'react';
import {GeneralCont} from '../componentes/GenerarContenido.jsx'

export const Contenido = () => {
    
    return (
        <div>
            <Navegador />
            <GeneralCont/>


            <Footer />
        </div>

    )
}