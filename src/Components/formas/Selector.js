import React from 'react';
import '../estilos/App.css';
import { useState } from 'react';
//import Empresas from './componentes/Empresas.js';
//import Fecha from './componentes/Fecha.js';  <Fecha id='fecing' nombre='fecing' valinit={fec} />
//import Combo from './componentes/Combo.js';  <Combo id='codpac' nombre='codpac' valini = {valores} />
import Buscador from './Buscador.js'; 
import Examenes from './Examenes.js'; 
//import Tipomuestras from './Tipomuestras.js';
//import Labseccion from './Labseccion.js'; 
//import Unidades from './Unidades.js';
//import Ocupaciones from './Ocupaciones.js';
import Analisis from './Analisis.js';
//import Agencias from './Agencias.js';
//import Labvalores from './Labvalores.js';
//import Feriados from './Feriados.js';
//import Undnegocios from './Undnegocios.js';
//import Combos from './Combos.js';
//import Combosdet from './Combosdet.js';
//import Vinculaciones from './Vinculaciones.js';
//import Pivot from './Pivot.js';
import Lista from './Lista.js';
import Medicos from './Medicos.js';
import Usuarios from './Usuarios.js';
import Roles from './Roles.js';
//import Roleopcion from './Roleopcion.js';
//import Usuariorole from './Usuariorole.js';



import Ipsconsec from './Ipsconsec.js';
import Mediospago from './Mediospago.js';
import Labordenpago from './Labordenpago.js';
//import Test from './Test.js';
//import Lablistas from './Lablistas.js';
//import Examenemp from './Examenemp.js';
//import Labdepends from './Labdepends.js';
//import Labempresas from './Labempresas.js';
//import WdrBrowser from './WdrBrowser.js';

//import Resultados from './Resultados.js';
//import Ordenes from './Ordenes.js';
//import Lista from './Lista.js';
//import Pacientes from './Pacientes.js';
import Menuvertical from './Menuvertical.js';
import RepOrden from './RepOrden.js';
import Opciones from './Opciones.js';

import { useEffect } from 'react'; 
import Resultados from './Resultados';
import RepResultado from './RepResultado';

//import Ocupaciones from './Ocupaciones';

function Selector({forma}) {
  const [opciones, setOpciones] = useState({});
  const [vector, setVector] = useState([]);
  const [vectorshow, setVectorshow] = useState([]);


  /*const handleChange = (e) => {
    setCodigo(e.target.value);
  };*/
  

  const [opcionactual, setOpcionActual] = useState('Examen');
  const [selectorvisible, setSelectorVisible] = useState(true);
   

  useEffect(() => {
     setOpcionActual({forma});
     }, []);

    return (
      <div className="">
       
       <div>
        <Lista />
       </div>

      </div>
    );
}

export default Selector; 
