import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert} from 'react-bootstrap'; 
import Examenes from './Examenes';
import Analisis from './Analisis';
import Labnormal from './Labnormal';


//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Examenana = () => { 


 //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 
const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/agencias/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 
 
 const [examen, setExamen] = useState(''); 
 const [nomexamen, setNomExamen] = useState(''); 

 const [analisis, setAnalisis] = useState(''); 
 const [nomanalisis, setNomAnalisis] = useState(''); 
 
  
 useEffect(() => { 
 
 }, []); 
  
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
    { (examen=='' && analisis=='') && <div>
      <Examenes retornar={setExamen} retornar2={setNomExamen}/>
      </div>
    } 
    { (examen!='' && analisis=='') && <div>
      <Analisis miexamen={examen} mititulo={nomexamen} retornar={setExamen} retornar2={setAnalisis}/>
      </div>
    }
    { (examen!='' && analisis!='') && <div>
      <Labnormal miexamen={examen} mititulo={nomexamen} mianalisis={analisis} retornar={setExamen}  retornar2={setAnalisis} />
      </div>
    }


</> 
    ): ( <Navigate to="/login" /> )  }
    </>
 
) } 
export default Examenana