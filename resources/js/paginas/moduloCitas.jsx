import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import React, { useState, useEffect,useContext } from 'react';
import { TimesBar } from "../componentes/timebarr.tsx";
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
import '../../css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export const Citas = () => {
    const example = useContext(Exaplecontect)
    const [diasColoridos, setDiasColoridos] = useState([]);
    const [proxCit, setproxCit] = useState('');
    const [diasBloqueados, setDiasBloqueados] = useState([0, 1, 3, 6]);
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/Cita');
                const response2 = await axios.get(`http://127.0.0.1:8000/api/Insta/${0}`);
                let proxcit= await axios.get(`http://127.0.0.1:8000/api/proxCit/${example.datos.id}`)
                setproxCit(proxcit.data)
                setDiasBloqueados(response2.data)
                const appointments = response.data;
                const updatedDiasColoridos = appointments.map(appointment => {
                    const fecha = new Date(appointment.date + 'T00:00:00'); let color;
                    console.log( appointment.date);
                    if (appointment.count >= 8) {
                        color = '#FF0000'; // Rojo para 10 o más citas
                    } else if (appointment.count >= 4) {
                        color = '#FFA500'; // Naranja para 5 a 9 citas 
                    } else {
                        color = '#00FF00';
                        // Verde para menos de 5 citas
                    }
                    return { fecha, color };
                });
                setDiasColoridos(updatedDiasColoridos);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        }; fetchAppointments();
    }, []);
   
    

    return (
        <div >
            <Navegador />

            <TimesBar diasColoridos={diasColoridos} diasBloqueados={diasBloqueados} proxima={proxCit} />




            <Footer className="footercitas" />

        </div>
    )
}