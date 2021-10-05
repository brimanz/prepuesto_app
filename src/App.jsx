import React, {useState, useEffect} from 'react'

//components imports
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {
  //using state hook
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCrearGasto] = useState(false);

  //using effect hook
  useEffect(() =>{
    if(creargasto){
      //adding new prepuesto
      guardarGastos([
        ...gastos,
        gasto
      ]);

      //restando presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      guardarCrearGasto(false);
    }
  },[gasto, creargasto, gastos, restante]);

  return (
    <div className="container">
      <header> 
        <h2 className="title">Gasto Semanal</h2>

        <div className="contenido-principal">
          {mostrarpregunta ? 
            (
              <Pregunta
                guardarPresupuesto={guardarPresupuesto}
                guardarRestante={guardarRestante}
                actualizarPregunta={actualizarPregunta}
              />
            )  : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                />
              </div>
              <div className="one-half column">
                <Listado
                  gastos={gastos}
                />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
            )
          }  
        </div>
      </header>
    </div>
    
  );
}

export default App
