
export const ObcionAdmin=({Titulo,Imagen,descrip,tag})=>{
  const handleClick = () => {
    window.location.href = tag
  }
    return (
      <div className="card shadow-sm col" style={{maxWidth: '400px'}} onClick={handleClick}>
      <div className="position-relative">
        {/* Header Image Section */}
        <img 
          src={Imagen || "/placeholder.svg"} 
          className="card-img-top" 
          alt="Course header"
          style={{height: '200px', objectFit: 'cover'}}
        />
        
        {/* Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100  opacity-50"></div>
        
        {/* Icons */}
        <div className="position-absolute top-50 start-50 translate-middle text-white opacity-75">
          <i className="bi bi-people-fill" style={{fontSize: '5rem'}}></i>
        </div>
        <div className="position-absolute bottom-0 end-0 p-3 text-white">
          <i className="bi bi-graph-up-arrow" style={{fontSize: '2rem'}}></i>
        </div>
        
        {/* Tag */}
        <div className="position-absolute top-0 start-0 m-3">
          
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title fw-bold">{Titulo}</h5>
        <p className="card-subtitle text-muted small mb-4">
          {descrip}
        </p>
      </div>
    </div>
      );
}