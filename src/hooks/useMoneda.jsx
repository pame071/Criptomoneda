import React, { useState }from 'react';

const useMoneda = (label, stateInicial, opciones) => {

   // State de nuestro custom hook
   const [ state , actualizarState ] = useState (stateInicial);

   const Seleccionar = () => (
      <>
         <label>{label}</label>
         <select
            onChange={ e => actualizarState(e.target.value) }
            value={ state }
         >
            <option value="">-- Seleccione --</option>
            { opciones.map (opcion => (
               <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
            ))}
         </select>
      </>
   );

   // Retornar state, interfaz y fin que modifica el state
   return [state, Seleccionar, actualizarState];

};

export default useMoneda;

