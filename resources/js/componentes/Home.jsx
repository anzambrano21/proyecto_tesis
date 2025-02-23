import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FisioCita} from '../paginas/moduloFisioterapia.jsx'
import { createRoot } from 'react-dom/client'
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Cliente} from '../paginas/moduloCliente.jsx';
import {Citas} from '../paginas/moduloCitas.jsx';
import {Inicisecion} from '../paginas/moduloInicioSecion.jsx'
import {Registro} from '../paginas/moduloRegistro.jsx'
import {Historias} from '../paginas/moduloHistorias.jsx'
import {ModuloUsuario} from '../paginas/moduloUsuario.jsx'
import {DatAdmin} from '../paginas/cambiosdedatosAdmin.jsx'
import { Contenido } from '../paginas/moduloContenido.jsx';
import {CrearConte} from '../paginas/modulocrearConte.jsx';
import {AsignarCont} from '../paginas/moduloAsignarCon.jsx'
export default function Home() {
    return (
        <div>
            <BrowserRouter>

                <Routes>




                    <Route path='/' element={<Cliente />} />
                    <Route path='/Citas' element={<Citas />} />
                    <Route path='/fisioCita' element={<FisioCita/>}/>
                    <Route path='/InicioSecion' element={<Inicisecion/>}/>
                    <Route path='/Registro' element={<Registro/>}/>
                    <Route path='/Historias' element={<Historias/>}/>
                    <Route path='/Usuario' element={<ModuloUsuario/>}/>
                    <Route path='/Admin' element={<DatAdmin/>}/>
                    <Route path='/Conte' element={<Contenido/>}/>
                    <Route path='/CrearConte' element={<CrearConte/>}/>
                    <Route path='/Asignar' element={<AsignarCont/>}/>


                </Routes>


            </BrowserRouter>
        </div>
    );
}

if (document.getElementById('codeareact')) {
    createRoot(document.getElementById('codeareact')).render(
        <ExamplecontexProvier>
            <Home />
        </ExamplecontexProvier>
    )
}