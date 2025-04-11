import "../../css/app.css";

export const TablaCita = ({onSelect,data}) => {


  return (
    <div className="container mt-5">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>N</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Ubicacion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => onSelect(row)}>
              <td>{index+1}</td>
              <td>{row.user.Nombre}</td>
              <td>{row.fecha}</td>
              <td>{row.hora}</td>
              <td>{row.direc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
