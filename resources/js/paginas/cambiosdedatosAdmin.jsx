import { Navegador } from "../componentes/navegador.jsx";
import { Footer } from "../componentes/Footer.jsx";
import {FormDatAdmin} from "../componentes/AdminForm.jsx"
import React,{useContext} from "react";
import  { Exaplecontect } from "../context/contexto"
export const DatAdmin =()=>{
    const example = useContext(Exaplecontect)
    if(Object.keys(example.datos).length==0 || example.datos.Rol=='paciente'){
        window.location.href="http://127.0.0.1:8000/"
        return
    }
    return(
        <div>
            <Navegador/>
                <FormDatAdmin/>
            <Footer/>

        </div>
    )
}