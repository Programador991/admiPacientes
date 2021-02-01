import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    const [cita , actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error , actualizarError]=useState(false);
    
    //funcion para ejecutar cada vez que el usuario escribe en un input
    const actualizarState= e => {

        actualizarCita({
            ...cita,
            [e.target.name]:e.target.value
        })
        
   
    }
    //Añadiendo destruction
    const {mascota, propietario, fecha , hora, sintomas}=cita;

    //submir cita
    const submitCita = e =>{
        e.preventDefault(); //cancela un evento

        //Validar
        if (mascota.trim()==='' || propietario.trim()==='' ||fecha.trim()==='' ||hora.trim()==='' ||sintomas.trim()===''){
            actualizarError(true);
            return;
        }
        actualizarError(false);

        cita.id=uuidv4();
        console.log(cita.id);

        //envio cita a useState app
        crearCita(cita);

        //reiniciar formulario
        actualizarCita({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
        });
    }

    return (
        <Fragment>
            <h1>Crear Cita</h1>
            {error ? <p className="alerta-error">Se debe completar todos los campos</p> : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />   

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />    
                
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />  

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />  

                <label>Sintomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea> 

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>    

            </form>  
        </Fragment>
    );
}
//proptypes
Formulario.propTypes={
    crearCita:PropTypes.func.isRequired
}

export default Formulario;