import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

//crear State de citas
  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

//2do state para mensaje de error
  const [error, setError] = useState(false);

//funcion que se ejecuta cada vez que el usuario escribe
  const actualizarState = e => {
    setCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

//extraer los valores
  const {mascota, propietario, fecha, hora, sintomas } = cita;

//evitamos que se envíe el formulario sin una validación
const submitCita = e => {
  e.preventDefault();

    //Validar información
  if( mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === '')
  {
    setError(true);
    return;
  } else {
    //eliminamos el mensaje de error
    setError(false);
  }

    //Asignamos un id
  cita.id = uuidv4();

    //Crear la cita
    crearCita(cita);

    //Reiniciar el Form
    setCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
}

  return(
    <Fragment>
      <h2>Crear cita</h2>

      {error
        ?
          <p className="alerta-error">Todos los campos son obligatorios</p>
        :
          null
      }

      <form
        onSubmit={submitCita}>
        <label>Nombre mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre del dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha de alta</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Horario de ingreso</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Descripcion de síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        >
        </textarea>
        <button
          type="submit"
          className="u-full-width button-primary"
        >Agregar cita
        </button>
      </form>

    </Fragment>
  )
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
