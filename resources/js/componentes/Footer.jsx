import { useState, useEffect } from "react"

export const Footer = () => {
  const [datos, setdatos] = useState()
  useEffect(() => {
    // Esta función se ejecuta antes de que el componente se renderice
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://127.0.0.1:8000/api/Insta`)





        setdatos(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  let dias=["Lunes","Martes","Miercoles","Jueves","Viernes"]
  let fin=["Sabado","Domingo"]

  let ban = (window.location.pathname == '/' || window.location.pathname == "/fisioCita" || window.location.pathname == "/Registro" || window.location.pathname == "/conte"
    || window.location.pathname == "/Historias" || window.location.pathname == "/Admin") ? true : false;
  console.log(ban);//Historias
  if(!datos){
    return(
      <div></div>
    )
  }else{
  return (
    <footer className={ban ? "bgprimario py-4" : "bgprimario py-4 footer text-primary-foreground"}>
      <div className="contenedor">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            <h3 className="h5 mb-3">Contáctanos</h3>
            <address className="mb-0">
              <p className="mb-1">{datos.Direccion}</p>
              
              <p className="mb-1">{datos.Correo}</p>
              <p className="mb-0">{datos.Telefono}</p>
            </address>
          </div>
          <div className="col-12 col-md-4 text-md-end">
            <h3 className="h5 mb-3">Horas de Atención</h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-1">{dias.filter(dia => !datos.Dias.includes(dia))} 8am-4pm</li>
              <li className="mb-1">{fin.filter(dia => !datos.Dias.includes(dia))}: 8am - 12pm</li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )}
}