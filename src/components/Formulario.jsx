import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

   const [ listacripto, guardarCriptomonedas ] = useState([]);
   const [ error, guardarError ] = useState(false);

   const MONEDAS = [
      { codigo: 'USD', nombre: 'Dolar de Estado Unidos'},
      { codigo: 'MXN', nombre: 'Peso Mexicano'},
      { codigo: 'EUR', nombre: 'Euro'},
      { codigo: 'GBP', nombre: 'Libra Esterlina'},
      { codigo: 'CLP', nombre: 'Pesos Chilenos'}
   ]

   // Utilizar useMoneda
   const [moneda, SelectMoneda ] = useMoneda('Elige tu moneda', '', MONEDAS);

   // Utilizar useCriptomoneda
   const [Criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);


   //Ejecutar llamado a la api
   useEffect (()=>{
      const consultarApi = async () =>{
         const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
         const resultado = await axios.get(url);
         guardarCriptomonedas(resultado.data.Data);
      }
      consultarApi();
   },[]);

   //cuando el usuario hace submit
   const cotizarMoneda = e => {
      e.preventDefault();

      // valida si ambos campos estan llenos
      if(moneda === '' || Criptomoneda===''){
         guardarError(true);
         return;
      }
      guardarError(false);
      guardarMoneda(moneda);
      guardarCriptomoneda(Criptomoneda);
   }

   return (
      <form
         onSubmit={cotizarMoneda}
      >   

         { error ?  <Error mensaje='Todos los campos son obligatorios' />: null }

         <SelectMoneda />
         <SelectCripto />

         <input 
            type="submit" 
            className="btn"
            value="CALCULAR"
         />
         
      </form>
   );
};

Formulario.propTypes = {
   guardarMoneda: PropTypes.func.isRequired,
   guardarCriptomoneda: PropTypes.func.isRequired,
};

export default Formulario;