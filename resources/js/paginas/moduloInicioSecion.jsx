import React, { useState } from 'react';
import { Footer } from "../componentes/Footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Eye, EyeOff } from 'lucide-react'
import { Navegador } from '../componentes/navegador.jsx'
import {InicioFormu} from '../componentes/formularioinicio.jsx'
export const Inicisecion = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => {

        // Aquí iría la lógica de autenticación
        console.log('Intento de inicio de sesión')
    }

    return (
        <div >
            <Navegador/>
            <InicioFormu/>

            <Footer />
        </div>
    )
}