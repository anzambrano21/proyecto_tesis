import React, { useState } from 'react';
import { Footer } from "../componentes/Footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'

import { Navegador } from '../componentes/navegador.jsx'
import {InicioFormu} from '../componentes/formularioinicio.jsx'
export const Inicisecion = () => {
    



    return (
        <div >
            <Navegador/>
            <InicioFormu/>

            <Footer />
        </div>
    )
}