export const Footer=()=>{
    
    let ban=(window.location.pathname=='/' || window.location.pathname=="/fisioCita" || window.location.pathname=="/Registro" 
      || window.location.pathname=="/Historias"    )? true: false;
    console.log(ban);//Historias
    
    return(
<footer className={ban ? "bgprimario py-4" : "bgprimario py-4 footer text-primary-foreground"}>
  <div className="contenedor">
    <div className="row justify-content-between">
      <div className="col-12 col-md-4">
        <h3 className="h5 mb-3">Contáctanos</h3>
        <address className="mb-0">
          <p className="mb-1">123 Medical Center Street</p>
          <p className="mb-1">City, Country</p>
          <p className="mb-1">contact@medicalcenter.com</p>
          <p className="mb-0">555-123-456</p>
        </address>
      </div>
      <div className="col-12 col-md-4 text-md-end">
        <h3 className="h5 mb-3">Horas de Atención</h3>
        <ul className="list-unstyled mb-0">
          <li className="mb-1">Lunes - Viernes: 8am - 6pm</li>
          <li className="mb-1">Sábado: 9am - 3pm</li>
          <li className="mb-0">Domingo: Cerrado</li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    )
}