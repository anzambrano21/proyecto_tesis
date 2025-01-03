
import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import {FormHistoria} from '../componentes/formularioHistoria.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect,useState } from 'react';

export const Historias=()=>{
    const [data, setData] = useState({Nombre:'',Ocupa:''});
    useEffect(() => { 
        // Esta función se ejecuta antes de que el componente se renderice
        const fetchData = async () => { 
            const urlActual = window.location.href;
            const url = new URL(urlActual);
            const userId = url.searchParams.get("User");
            try { 
                const response = await axios.get(`http://127.0.0.1:8000/api/Usuario/${userId}`); 
                console.log(response.data);
            
                setData(response.data); 
            } catch (error) { 
                console.error('Error fetching data:', error); 
            } 
        }; 
        fetchData(); 
      }, []);

    return(
        <div>
            <Navegador/>
            <FormHistoria dato={data} />
            <Footer/>

        </div>
    )
}