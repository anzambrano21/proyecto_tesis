import { parseISO, format } from 'date-fns';

export const TablaHistoria = ({ data }) => {

  const handleRowClick = (url) => {
    console.log(url);
    
    // Abrir una nueva ventana o pestaña con la dirección específica
    window.open(url, '_blank');
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
              <tr key={index} onClick={() => handleRowClick(`http://127.0.0.1:8000/HitoriaPDF?H=${row.id}`)}>
                <td>{index}</td>
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
