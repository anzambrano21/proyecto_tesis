import React, { useState } from 'react';
export const TablaUser=({data,funcion})=>{
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleRowClick = (index, row) => {
        setSelectedIndex(index);
        funcion(row);
    };
    return(
        <table className=" table table-striped table-hover col ">
            <thead className="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
            <tr key={index} onClick={() => handleRowClick(index, row)} 
            className={selectedIndex === index ? 'table-success' : ''}>
              
              <td>{row.Nombre}</td>
              <td>{row.email }</td>

            </tr>
          ))}

            </tbody>
        </table>
    )
}