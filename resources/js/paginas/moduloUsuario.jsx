import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import {FormUser} from '../componentes/formUsuario.tsx'

import { useState, useEffect, useContext } from 'react'
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
import axios from 'axios';
export const ModuloUsuario=()=>{
    const example = useContext(Exaplecontect)
    console.log(example);
    
    const cerrar=()=>{
        example.setDatos({})
        window.location.href="http://127.0.0.1:8000/"

    }
    const Cambios=async(Ndatos)=>{
        console.log(Ndatos);
        
        axios.put(`http://127.0.0.1:8000/api/Usuario/${example.datos.id}`,Ndatos)
    }
    
    return(
        <div>
            <Navegador/>
            <FormUser onClick={cerrar} cambios={Cambios}/>

            <Footer/>
            
        </div>
    )
}