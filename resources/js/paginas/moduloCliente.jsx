import { Carrusel } from "../componentes/Carrusel.jsx"
import { Galeria } from '../componentes/Galeria.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/app.css'
import {Navegador} from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
export const Cliente = () => {
    return (
        <div >
            <Navegador/>

            <Carrusel />
            <Galeria />
            <Footer/>
        </div>
    )
}