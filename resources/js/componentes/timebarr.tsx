import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es, id } from 'date-fns/locale';
import axios from 'axios';
import ExamplecontexProvier, { Exaplecontect } from "../context/contexto"
interface DiaColorido {
  fecha: Date;
  color: string;
}

interface MiCalendarioProps {
  diasColoridos: DiaColorido[];

}
// eslint-disable-next-line react/display-name
export const TimesBar = ({ diasColoridos, diasBloqueados, proxima }) => {
  const example = useContext(Exaplecontect)
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [hora, setHora] = useState(['']);
  const [time, setTime] = useState('');
  const [direc, setdirec] = useState('')
  const [Pago, setpago] = useState('TPago')
  const [selectedValue, setSelectedValue] = useState('');
  const handleDateChange = async (date) => {

    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    let response = await axios.get(`http://127.0.0.1:8000/api/Cita/${date.toLocaleDateString('sv-SE')}`)

    setHora(response.data)
    setFechaSeleccionada(adjustedDate);
  };


  const colorearDia = (date) => {
    const dayToColor = diasColoridos.find(d => {
      // Comparación de sólo la fecha sin la hora 
      return d.fecha.toDateString() === date.toDateString();
    });
    if (dayToColor) {
      return {
        backgroundColor: dayToColor.color
      };
    } return {};
  };
  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;


    if (hora.includes(selectedTime)) {
      alert('Esta hora no está disponible. Por favor, selecciona otra hora.');
      setTime(''); // Restablece el valor del input 
    } else { setTime(selectedTime); }
  };
  const handleRadioChange = (event) => {


    setSelectedValue(event.target.value);
  };
  const direccion = (direc) => {
    setdirec(direc.target.value)
  }
  const pago = (event) => {
    setpago(event.target.value)


  }
  const Guardar = async () => {

    fechaSeleccionada.setDate(fechaSeleccionada.getDate());
    const formattedDate = fechaSeleccionada.toISOString().split('T')[0];
    let dato = {
      dia: formattedDate,
      hora: time,
      direc: direc,
      pago: Pago,
      tipCit: selectedValue,
      id: example['datos'].id

    };
    let response = await axios.post('http://127.0.0.1:8000/api/Cita', dato)
    if (response.data == 'exito') {
      alert('Cita Guardada con Exito')
      window.location.href = "http://127.0.0.1:8000/"
    }

  }
  const filterDates = (date) => {
    const day = date.getDay();
    return !diasBloqueados.includes(day);
  };
  return (
    <div className=" p-8 row justify-content-around">
      <h2 className="text-2xl font-bold mb-4">Fechas Disponibles</h2>
      <div className="col-4 d-flex justify-content-center">
        <DatePicker
          selected={fechaSeleccionada}
          onChange={handleDateChange}
          inline
          locale={es}
          minDate={new Date()}
          dayClassName={() => 'text-center'}
          calendarClassName="border rounded-lg shadow-lg"
          wrapperClassName="w-100"
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
          renderDayContents={(day, date) => (
            <div
              className="w-100 h-100 d-flex align-items-center justify-content-center"
              style={colorearDia(date)}>
              {day}
            </div>
          )}
          filterDate={filterDates}
        />
      </div>
      <div className="Formulario col-4 justify-content-start">
        <div className="row">
          <div className="col-5">
            <label htmlFor="hora">Selecciona una hora:</label>
            <select className="form-control" name="hora" id="hora" onChange={handleTimeChange}>
              <option value="08:00">8 am</option>
              <option value="09:00">9 am</option>
              <option value="10:00">10 am</option>
              <option value="11:00">11 am</option>
              <option value="13:00">1 pm</option>
              <option value="14:00">2 pm</option>
              <option value="15:00">3 pm</option>
              <option value="16:00">4 pm</option>
            </select>
            <br /> <label htmlFor="direc">Dirección</label> <input onChange={direccion} type="text" id="direc" name="Ubicacion" className="form-control" />
            <br /> <label htmlFor="PrimeraCita" className="ml-2">Primera Cita</label>
            <input type="radio" name="TCit" id="PrimeraCita" value="Primera Cita" checked={selectedValue === 'Primera Cita'} onChange={handleRadioChange} className="form-check-input" />
            <br />
            <label htmlFor="Seguimiento">Cita de Seguimiento</label>
            <input type="radio" name="TCit" id="Seguimiento" value="Cita de Seguimiento" checked={selectedValue === 'Cita de Seguimiento'} onChange={handleRadioChange} className="form-check-input" />
          </div>
          <div className="col-5"> <label htmlFor="Pago">Forma de Pago</label>
            <select name="Pago" className="form-control" onChange={pago} id="Pago">
              <option value="TPago">Transferencia</option>
              <option value="PagoM">Pago Móvil</option>
              <option value="Efectivo">Efectivo</option>
            </select>
            <button className="mt-5 btn btn-primary w-100" onClick={Guardar} type="submit">Reservar</button>
          </div>
        </div>
        <div className="row">
          <h3>{proxima}</h3>
        </div>
      </div>
      <div>

      </div>

    </div>
  );
}

export default TimesBar