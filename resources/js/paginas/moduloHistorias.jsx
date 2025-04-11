
import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import {FormHistoria} from '../componentes/formularioHistoria.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect,useState,useContext  } from 'react';
import { Exaplecontect } from "../context/contexto.jsx"
export const Historias=()=>{
    const example = useContext(Exaplecontect)
    const [data, setData] = useState([{Nombre:'',Ocupa:''},{}]);
    const [data2, setData2] = useState({});
    useEffect(() => { 
        // Esta función se ejecuta antes de que el componente se renderice
        const fetchData = async () => { 
            const urlActual = window.location.href;
            const url = new URL(urlActual);
            const userId = url.searchParams.get("User");
            const Histo = url.searchParams.get("H");

            try {
                
                
                if (Histo > 0) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/Usuario/${userId}`);
                    const response2 = await axios.get(`http://127.0.0.1:8000/api/most/${Histo}`);
                    
            
                    // Verificar que response.data y response2.data sean arrays
                    const data1 = Array.isArray(response.data) ? response.data : [response.data];
                    const data2 = Array.isArray(response2.data) ? response2.data : [response2.data];
            
                    const data = data1.concat(data2);
                    console.log(data);
                    
                    setData(data);
                } else {
                    const response = await axios.get(`http://127.0.0.1:8000/api/Usuario/${userId}`);
                    setData([response.data].concat([{}]));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
            
        }; 
        fetchData(); 
      }, []);
    if(Object.keys(example.datos).length==0 || example.datos.Rol=='paciente'){
        window.location.href="http://127.0.0.1:8000/"
        return
    }

    return(
        <div>
            <Navegador/>
            <FormHistoria dato={data} />
            <Footer/>

        </div>
    )
}