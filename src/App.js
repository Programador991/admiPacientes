import './App.css';
import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './componets/Formulario';
import Cita from './componets/Cita';


function App() {

//verificar existencia de citas en el localstorage
let citasLocalstorage = JSON.parse(localStorage.getItem('citas'));
if(!citasLocalstorage){
  citasLocalstorage=[];
}

const [citas , guardarCitas]=useState(citasLocalstorage);

//funcion para copiar la lista de citas y agregar una nueva
const crearCita = cita =>{
  guardarCitas([
    ...citas,
    cita
  ])
}
//useEffect para listener el state citas y set localstorage
useEffect(()=>{
  let citasLocalstorage = JSON.parse(localStorage.getItem('citas'));
  if(citasLocalstorage){
    localStorage.setItem('citas',JSON.stringify(citas));
  }else{
    localStorage.setItem('citas',JSON.stringify([]));
  }
},[citas]);

//eliminar cita por id
const eliminarCita = id =>{
  const nuevasCitas=citas.filter(cita => cita.id!==id);
  guardarCitas(nuevasCitas);
}

//variando titulo
const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita}/>
          </div>
          <div className="one-half column">
            <h1>{titulo}</h1>
            {citas.map(cita =>(
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
