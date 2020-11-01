import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import imagen from './img/criptomonedas.png';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

import axios from 'axios';

function App() {

  //crear state
  const [ moneda, guardarMoneda] = useState('');
  const [ criptomoneda, guardarCriptomoneda] = useState('');
  const [ resultado, guardarResultado] = useState({});
  const [ cargando, guardarCargando] = useState(false);


  useEffect( () => {

     const Cotizar = async () =>{
        //Evitamos la ejecion por primera vez
        if(moneda==='') return;

        //consultar la api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await axios.get(url);
        //mostrar el spinner
        guardarCargando(true);

        setTimeout(()=>{
          guardarCargando(false);
          guardarResultado(respuesta.data.DISPLAY[criptomoneda][moneda]);
        }, 3000);
     }

     Cotizar();

  },[moneda,criptomoneda]);

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>;
  return (
    <div className="container">
      <div>
        <img 
          src={imagen}
          alt="imagen cripto"
          className="image"
        />
      </div>
      <div>
        <div className="heading">
          COTIZA CRIPTOMONEDAS AL INSTANTE
        </div>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </div>
  );
}

export default App;
