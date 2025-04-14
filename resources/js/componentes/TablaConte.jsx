import React, { useState } from 'react';

export const TablaCont = ({ data, funcion }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleRowClick = (index, row) => {
        if(index==selectedIndex){
            setSelectedIndex(null);
            funcion(null);
        }else{
            setSelectedIndex(index);
            funcion(row);
        }

    };

    return (
        <table className="table table-striped table-hover col">
            <thead className="table-dark">
                <tr>
                    <th>Titulo</th>
                    <th>Archivo</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr 
                        key={index} 
                        onClick={() => handleRowClick(index, row)} 
                        className={selectedIndex === index ? 'table-success' : ''}
                    >
                        <td>{row.Titulo}</td>
                        <td>{row.Archivo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
