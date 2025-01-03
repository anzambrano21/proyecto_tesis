import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import {FormUser} from '../componentes/formUsuario.tsx'
export const ModuloUsuario=()=>{
    
    return(
        <div>
            <Navegador/>
            <FormUser/>

            <Footer/>
            
        </div>
    )
}