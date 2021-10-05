import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import Error from './Error';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {

//using state
const [nombre, guardarNombre] = useState('');
const [cantidad, guardarCantidad] = useState(0);
const [error, guardarError] = useState(false);

//adding gasto
const agregarGasto = e =>{
    e.preventDefault();

    //validate
    if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
        guardarError(true);
        return;
    }

    guardarError(false);

    //build gasto
    const gasto = {
        nombre, 
        cantidad,
        id: uuidv4()
    }

    //send to main component
    guardarGasto(gasto);
    guardarCrearGasto(true);

    //reset form
    guardarNombre('');
    guardarCantidad(0);
}

    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tu gasto</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios"/> : null}

            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width" 
                    placeholder="Ej. Comida"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width" 
                    placeholder="Ej. 200"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                />
            </div>
            <input 
                type="submit" 
                className="button-primary u-full-width"
                value="Agregar"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;