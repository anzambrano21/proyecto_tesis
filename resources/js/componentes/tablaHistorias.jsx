import { parseISO, format } from 'date-fns';
import React, { useState } from 'react';
export const TablaHistoria = ({ data, funcion }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleRowClick = (index, row) => {
    setSelectedIndex(index);
    funcion(row);
  };

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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
