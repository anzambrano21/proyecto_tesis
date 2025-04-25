import { parseISO, format } from 'date-fns';
import React, { useState } from 'react';
export const TablaHistoria = ({ data, funcion }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const handleRowClick = (index, row) => {
    console.log(index);
    
    if(index==selectedIndex){
      setSelectedIndex(null);
    }else{

      setSelectedIndex(index);
    }
    
    
    
    funcion(row);
  };
  const Exportar=(id)=>{
    window.open(`http://127.0.0.1:8000/HitoriaPDF?H=${id}/`, "_blank");
  }

  return (
    <div className="container mt-5">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>N</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            // Parsear la fecha
            const dateObject = parseISO(row.created_at);

            // Formatear la fecha y la hora por separado
            const datePart = format(dateObject, 'yyyy-MM-dd');
            const timePart = format(dateObject, 'hh:mm:ss a');

            return (
              <tr key={index} onClick={() => handleRowClick(index,row)} className={selectedIndex === index ? 'table-success' : ''}>
                <td>{index+1}</td>
                <td>{datePart}</td>
                <td>{timePart}</td>
                <td><button onClick={()=>{
                  Exportar(row.id)
                }} className="btn bg-info w-100">exportar</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
