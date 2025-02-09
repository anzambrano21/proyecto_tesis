import { Navegador } from "../componentes/navegador.jsx";
import { Footer } from "../componentes/Footer.jsx";
import {FormDatAdmin} from "../componentes/AdminForm.jsx"
export const DatAdmin =()=>{
    return(
        <div>
            <Navegador/>
                <FormDatAdmin/>
            <Footer/>

        </div>
    )
}