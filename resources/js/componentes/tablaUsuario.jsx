export const TablaUser=({data,funcion})=>{
    return(
        <table className="table table-striped table-hover col ">
            <thead className="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
            <tr key={index} onClick={() => funcion(row)}>
              
              <td>{row.Nombre}</td>
              <td>{row.email }</td>

            </tr>
          ))}

            </tbody>
        </table>
    )
}