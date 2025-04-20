import { useState, useEffect,useContext } from "react"
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
let dias=["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
let fin=["Sábado", "Domingo"]
export const Footer = () => {
  const example = useContext(Exaplecontect)
  const [datos, setdatos] = useState()
  useEffect(() => {
    // Esta función se ejecuta antes de que el componente se renderice
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://127.0.0.1:8000/api/Insta`)


        let info={
          Direccion:response.data.Direccion,
          Correo:response.data.Correo,
          Telefono:response.data.Telefono,
          Dias:response.data.Dias? response.data.Dias.split(","):[] ,
        }
          

        setdatos(info)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  let ban = (window.location.pathname == '/' || window.location.pathname == "/fisioCita" || window.location.pathname == "/Registro" || (window.location.pathname == "/conte" && example.datos.Rol=="medico")
    || window.location.pathname == "/Historias" || window.location.pathname == "/Admin") ? true : false;
  //Historias
  if(!datos){
    return(
      <div></div>
    )
  }else{
  return (
    <footer className={ban ? "bgprimario py-4 " : "bgprimario mt-6 py-4 footer text-primary-foreground"}>
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
              <li className="mb-1">{dias.filter(dia => !datos.Dias.includes(dia)).join(", ")}: 8am-4pm</li>
              <li className="mb-1">{fin.filter(dia => !datos.Dias.includes(dia)).join(", ")}: 8am - 12pm</li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )}
}