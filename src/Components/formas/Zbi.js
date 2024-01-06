import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert} from 'react-bootstrap'; 
import Zreportes from './Zreportes';
 // temporalmente *********************
import Googlechart from './Googlechart';

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Zbi = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const [usuario,setUsuario] = useState('');
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


  
 const [pivot, setPivot] = useState(false); // pivos=true muestra la vista de WDR

 const [mireporte, setMireporte] = useState(''); 
 const [minomreporte, setMinomreporte] = useState(''); 
 const [esgrafica,setEsgrafica] = useState(false);
  const [pform, setPform] = useState(false);
  
 useEffect(() => { 
  setUsuario(user.username);
 }, []); 
  
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
    { (mireporte=='' ) && <div>
      <Zreportes seleccionar={setMireporte} seleccionar2={setMinomreporte}  esunagrafica={setEsgrafica}/>
      </div>
    } 
    
    {
      (mireporte!='' && esgrafica) && 
       <div> 
        <div>
        Visualizar Resultados
        </div>
        <br></br>
        <Button
                  onClick={() => {setMireporte(''); setEsgrafica(true); }}
                  className="mx-1"
                >
                  {" "}
                  Regresar{" "}
                </Button> 
                <Googlechart mireporte={mireporte} nomreporte={minomreporte} retornar={setMireporte} />
      </div>   

    }

</> 
    ): ( <Navigate to="/login" /> )  }
    </>
) } 
export default Zbi
