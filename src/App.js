import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario.js'
import Cita from './components/Cita.js'

function App() {
//Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

//Arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

//useEffect para realizar ciertas operaciones uando el state cambia
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales] )


//función que tome las citas actuales, y agregue la nueva
  const crearCita = cita => {
     setCitas([
       ...citas,
       cita
     ])
  }

//funcion que elimina una cita por su id
  const eliminarCita = id => {
    const eliminar = citas.filter(cita => cita.id !== id);
    setCitas(eliminar)
  };

  //mensaje condicional
  const mensajeNuevaCita = citas.length === 0
      ?
        'Crea una nueva cita'
      :
        'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{mensajeNuevaCita}</h2>
            {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
