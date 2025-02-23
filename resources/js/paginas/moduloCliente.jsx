import { Carrusel } from "../componentes/Carrusel.jsx"
import { Galeria } from '../componentes/Galeria.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect ,useState} from "react";
import '../../css/app.css'
import {Navegador} from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import React from "react";
export const Cliente = () => {
    const [insta, setInsta] = useState('')
    useEffect(() => { 
        // Esta función se ejecuta antes de que el componente se renderice
        const fetchData = async () => { 

            try { 
                let response = await axios.get(`http://127.0.0.1:8000/api/Insta`); 
                console.log(response.data);
                let response2= await axios.get(`https://graph.instagram.com/${response.data.IDuser}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${response.data.Token}`)  
                console.log(response2.data.data);
                
                
                setInsta(response2.data.data); 
            } catch (error) { 
                console.error('Error fetching data:', error); 
            } 
        }; 
        fetchData(); 
      }, []);
      if (!insta) {
        // Si insta es null, mostrar un mensaje de carga
        return <div></div>;
      }
    return (
        <div >
            <Navegador/>

            <Carrusel />
            <Galeria Instagram={insta}  />
            <Footer/>
        </div>
    )
}