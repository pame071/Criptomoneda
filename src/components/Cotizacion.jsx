import React from 'react';
import PropTypes from 'prop-types';

const Cotizacion = ({resultado}) => {
   if(Object.keys(resultado).length === 0) return null;

   console.log(resultado)

   return (
      <div className="resultado">
         <p className="precio">El precio es: <span>{resultado.PRICE}</span> </p>
         <p className="parrafo">El precio mas alto del día: <span>{resultado.HIGHDAY}</span> </p>
         <p className="parrafo">El precio mas bajo del día: <span>{resultado.LOWDAY}</span> </p>
         <p className="parrafo">Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span> </p>
         <p className="parrafo">Última Actualización: <span>{resultado.LASTUPDATE}</span> </p>
      </div>
   );
};

Cotizacion.propTypes = {
   resultado: PropTypes.object.isRequired,
};

export default Cotizacion;