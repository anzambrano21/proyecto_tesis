import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import {FormUser} from '../componentes/formUsuario.tsx'

import { useState, useEffect, useContext } from 'react'
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
import axios from 'axios';
export const ModuloUsuario=()=>{
    const example = useContext(Exaplecontect)
    if(Object.keys(example.datos).length==0){
        window.location.href="http://127.0.0.1:8000/"
        return
    }
    
    const cerrar=()=>{
        example.setDatos({})
        window.location.href="http://127.0.0.1:8000/"

    }
    const Cambios=async(Ndatos)=>{
        console.log(Ndatos);
        
        axios.put(`http://127.0.0.1:8000/api/Usuario/${example.datos.id}`,Ndatos)
    }
    console.log(example.datos);
    
    return(
        <div>
            <Navegador/>
            <FormUser onClick={cerrar} cambios={Cambios} datos={example.datos}/>

            <Footer/>
            
        </div>
    )
}