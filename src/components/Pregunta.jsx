import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    //using state
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //presupuesto function
    const definirPresupuesto = e =>{
        guardarCantidad(parseInt(e.target.value, 10));
    }

    //submir presupuesto
    const agregarPresupuesto = e =>{
        e.preventDefault();

        //validate
        if(cantidad < 1 || isNaN(cantidad)){
            guardarError(true);
            return;
        }

        //pass validate
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }

    return ( 
        <Fragment>
            <h2>Ingresa el Gasto</h2>
            {error ? <Error mensaje='Presupuesto incorrecto'/> : null}

            <form
                onSubmit={agregarPresupuesto}
            >
                <input 
                    type="number"
                    className='u-full-width'
                    placeholder='Coloca tu presupuesto'
                    onChange={definirPresupuesto}
                />

                <input 
                    type="submit"
                    className='button-primary u-full-width'
                    value='Agregar'
                />
            </form>
        </Fragment>
     );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;