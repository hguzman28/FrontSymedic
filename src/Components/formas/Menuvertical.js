import React, { useState, useEffect } from "react";

import Ordenes from './Ordenes.js';
import Pacientes from './Pacientes.js';
import Resultados from './Resultados.js';

function MenuVertical() {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    async function fetchOpciones() {
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/usuarioopciones/find/FCHARRIS`);
      const data = await response.json();
      setOpciones(data.carpetas);
    }

    fetchOpciones();
  }, []);

  return (
    <div>
      {opciones.map((carpeta, index) => (
        <div key={index}>
          <button>{carpeta.carpeta}</button>
          {carpeta.opciones.map((opcion, index) => (
            <a href={opcion.ruta} key={index}>
              <button className="btn btn-primary">{opcion.opcion}</button>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MenuVertical;