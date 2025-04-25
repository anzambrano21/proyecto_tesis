import { Navegador } from '../componentes/navegador.jsx'
import { Footer } from "../componentes/Footer.jsx";
import { TablaCont } from "../componentes/TablaConte.jsx";
import { TablaUser } from "../componentes/tablaUsuario.jsx";
import { Contenido } from "../componentes/Contenido.jsx";
import { useState, useEffect,useContext } from "react"
import { Alert } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import  { Exaplecontect } from "../context/contexto"
export const AsignarCont = () => {
    const example = useContext(Exaplecontect)
    const [Conteni, setContenido] = useState()
    const [Conteniuser, setContenidouser] = useState([])
    const [usuario, setusuario] = useState([])
    const [Conte, setConte] = useState([])
    const [user, setuser] = useState()
    useEffect(() => {
        // Esta función se ejecuta antes de que el componente se renderice
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/Usuario');
                const response2 = await axios.get('http://127.0.0.1:8000/api/Material');



                setusuario(response.data);
                setConte(response2.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const SelecMate = (Mate) => {
        if(Mate){
            let registro = {}
            registro['material'] = Mate
            console.log(Mate);
    
            setContenido(registro)
            
        }else{
            setContenido()
        }


    }
    const SelecUser = async (User) => {

        setuser(User)
        let response=await axios.get(`http://127.0.0.1:8000/api/Material/${User.id}`)
        setContenidouser(response.data)
        console.log(User);

    }
    const Asignar = async () => {
        if (!user) {
            alert('Selecciona un Usuario')
            return
        }
        let datos = {
            IdUser: user.id,
            IdMat: Conteni.material.id
        }

 
        try {
            axios.post('http://127.0.0.1:8000/api/Asignar', datos);




            alert("Asignacion Completada")
            window.location.href="http://127.0.0.1:8000/Asignar"
        } catch (error) {
            Alert('Error fetching data:', error);
        }
    };
    const eliminar = async (cont) => {
        if (!user) {
            alert('Selecciona un Usuario')
            return
        }
        let datos = {
            IdUser: user.id,
            IdMat: cont.material.id
        }


        try {
            axios.put(`http://127.0.0.1:8000/api/Material/${1}`, datos);




            alert("material eliminado")
            window.location.href="http://127.0.0.1:8000/Asignar"
        } catch (error) {
            Alert('Error fetching data:', error);
        }
    };
    if(Object.keys(example.datos).length==0 || example.datos.Rol=='paciente'){
        window.location.href="http://127.0.0.1:8000/"
        return
    }


    return (
        <div>
            <Navegador />
            <main className="flex-grow-1 py-4">
                <div className="contenedor">
                    <div className="row">
                        {/* Columna de la tabla */}
                        <div className="col-md mb-4 mb-md-0">
                            <TablaCont data={Conte} funcion={SelecMate} />
                        </div>
                        <div className="col-md mb-4 mb-md-0">
                            <TablaUser data={usuario} funcion={SelecUser} />
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0 scroll ">
                            {Conteni ? (
                                <div className=''>
                                    <Contenido registro={Conteni} />
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        style={{
                                            borderRadius: "8px",
                                            padding: "12px",
                                            fontSize: "18px",
                                        }}
                                        onClick={Asignar}
                                    >
                                        Asignar
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {Conteniuser.map((row, index) => (
                                <div key={index}>
                                <Contenido registro={row} />
                                <button
                                    type="submit"
                                    className="btn btn-danger w-100"
                                    style={{
                                        borderRadius: "8px",
                                        padding: "12px",
                                        fontSize: "18px",
                                    }}
                                    onClick={()=>{eliminar(row)}}
                                >
                                    Eliminar
                                </button>
                            </div>
                            ))}

                        </div>

                        {/* Columna del formulario */}

                    </div>
                </div>
            </main>
            <Footer />

        </div>
    )
}