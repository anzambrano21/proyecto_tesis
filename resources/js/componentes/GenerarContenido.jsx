
import React, { useEffect, useState } from 'react';
import { Contenido } from "../componentes/Contenido.jsx";
export const GeneralCont = ({id}) => {
    const [Conte, setConte] = useState([])
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/Material/${id}`); 
                console.log(response.data);
                
                setConte(response.data); 
                
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        }; 
        fetchAppointments();
    }, []);
    return (
        <div>
            {Conte.map((row, index) => (
            <Contenido key={index} registro={row}/>
          ))}
            
            
        </div>
    )
}