export const TablaHistoria=()=>{
    let data = [
        { name: "Juan", date: "2024-12-12", time: "10:00 AM" },
        { name: "Ana", date: "2024-12-12", time: "11:00 AM" },
        { name: "Ana", date: "2024-12-12", time: "11:00 AM" },
        { name: "Ana", date: "2024-12-12", time: "11:00 AM" },
        { name: "Ana", date: "2024-12-12", time: "11:00 AM" },
        { name: "Ana", date: "2024-12-12", time: "11:00 AM" },
        // Agrega más registros según sea necesario
      ];
    return(
        <div className="container mt-5">
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>N</th>
                    <th>Fecha</th>
                    

                    <th>Tratamiento</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.date}</td>
                        <td>{row.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}