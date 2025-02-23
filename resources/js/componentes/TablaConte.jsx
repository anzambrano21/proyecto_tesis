export const TablaCont=({data,funcion})=>{
    return(
        <table className="table table-striped table-hover col ">
        <thead className="table-dark">
            <tr>
                <th>Titulo</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
            <tr key={index} onClick={() => funcion(row)}>
              
              <td>{row.Titulo}</td>
              <td>{row.Archivo}</td>

            </tr>
          ))}
        </tbody>
    </table>
    )
}