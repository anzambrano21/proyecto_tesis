import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import React, { useState, useEffect } from 'react';
import { TimesBar } from "../componentes/timebarr.tsx";
    
import '../../css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export const Citas = () => {
    const [diasColoridos, setDiasColoridos] = useState([]);
    const [diasBloqueados, setDiasBloqueados] = useState([0, 1, 3, 6]);
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/Cita');
                const response2 = await axios.get(`http://127.0.0.1:8000/api/Insta/${0}`);
                setDiasBloqueados(response2.data)
                const appointments = response.data;
                const updatedDiasColoridos = appointments.map(appointment => {
                    const fecha = new Date(appointment.date + 'T00:00:00'); let color;
                    console.log( appointment.date);
                    if (appointment.count >= 6) {
                        color = '#FF0000'; // Rojo para 10 o más citas
                    } else if (appointment.count >= 3) {
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

            <TimesBar diasColoridos={diasColoridos} diasBloqueados={diasBloqueados} />




            <Footer className="footercitas" />

        </div>
    )
}