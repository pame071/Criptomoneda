import React, { useState }from 'react';

const useCriptomoneda = (label, stateInicial, opciones) => {

   // State de nuestro custom hook
   const [ state , actualizarState ] = useState (stateInicial);

   const SelectCripto = () => (
      <>
         <label>{label}</label>
         <select
            onChange={ e => actualizarState(e.target.value) }
            value={ state }
         >
            <option value="">-- Seleccione --</option>
            { opciones.map (opcion => (
               <option 
                  key={opcion.CoinInfo.Id} 
                  value={opcion.CoinInfo.Name}
               >
               {opcion.CoinInfo.FullName}
               </option>
            ))}
         </select>
      </>
   );

   // Retornar state, interfaz y fin que modifica el state
   return [state, SelectCripto, actualizarState];

};

export default useCriptomoneda;
