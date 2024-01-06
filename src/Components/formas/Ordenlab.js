import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert} from 'react-bootstrap'; 
import Pacientes from './Pacientes.js';
import Laborden from './Laborden.js';
import Labordendet from './Labordendet.js';

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 


 const Ordenlab = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();
const [usuario,setUsuario] = useState('');

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


 
 const [modo, setModo] = useState('PAC'); // PAC,ENC,DET O PAC,ORD
 const [va_tipide, setVa_tipide] = useState(''); 
 const [va_codpac, setVa_codpac] = useState('');
 const [va_nompac, setVa_nompac] = useState('');


 const [va_miordenlarga, setVa_miordenlarga] = useState(''); 
 
 const [age,setAge]  = useState('');
 const [ord,setOrd]  = useState('');


 const [tipobusqueda, setTipobusqueda] = useState(''); // por que criterio buscare las ordenes 'PACIENTE' 'ORDEN'


 const changePaciente = (event) => { 
  setVa_codpac(event.target.value)
  setTipobusqueda('PACIENTE');
};  


 const changeOrdenl = (event) => { 
   setVa_miordenlarga(event.target.value)
   if (event.target.value!='')
   { setTipobusqueda('ORDEN'); }
 };  

 
 useEffect(() => { 
  setUsuario(user.username);
 }, []); 
  
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
     
    
    { (modo=='PAC' ) && <div>
    
      <div>
        <h3> Busqueda de Ordenes </h3>
        <div>
            <Pacientes tipobusqueda={setTipobusqueda}   regresar={setModo} identi={setVa_tipide} paciente={setVa_codpac} nompac={setVa_nompac} />
        </div>
      
        <h3> Datos de la Orden </h3>
        <label>Codigo largo de la orden:</label>  
           <input name='ordenl' type="text" value={va_miordenlarga} onChange={changeOrdenl} />
           <button onClick={() => {if (va_miordenlarga!=''){setTipobusqueda('ORDEN');setModo('ENC');}} }>Buscar</button>



      </div>  
      </div>
    }
    {
      (modo=='ENC') && <div> 
        <div>
        <h3> Datos de Ordenes de {va_tipide}{va_codpac} - {va_nompac} </h3>

        <div>
            <Laborden mitipobusqueda = {tipobusqueda} miordenlarga= {va_miordenlarga}  mitipide = {va_tipide} micodpac = {va_codpac} regresar={setModo} nompac={va_nompac} setmiage={setAge} setmiord={setOrd} />
        </div>
      </div>  
      </div>
 
    }
    {
      (modo=='DET') && <div> 
        <div>
        <h3> Detalle de la Orden {age}-{ord} / {va_nompac} </h3>
        <div>
            <Labordendet miage = {age} miord = {ord} regresar={setModo} nompac={va_nompac}/>
        </div>
      </div>  
      </div>
 
    }

</>
      ) : (
        <Navigate to="/login" />
      )}
    </>
) } 
export default Ordenlab