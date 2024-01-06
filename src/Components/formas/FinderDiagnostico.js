import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
//import '../estilos/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


//const baseurl = 'http://127.0.0.1:8000/';

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

function FinderDiagnostico(props) {

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

const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
const baseurlovl = `${process.env.REACT_APP_ENDPOINT_DATA}/lovl/`; 


    const [miDiagnostico,setMiDiagnostico] = useState('');
    const [resultadosDiagnosticos, setResultadosDiagnosticos] = useState([]);
    const [ocultaResDiagnosticos, setOcultaResDiagnosticos] = useState(false);


  // patron multiproposito
  const handleDiagnosticoChange = (event) => {
    setMiDiagnostico(event.target.value);
    //setMiDiagnosticoDesc('');  // limpia la descripcion
     };

const limpiar = () =>{
  setResultadosDiagnosticos([]);
//  setOcultaResDiagnosticos(true);
  //setShowFinderDiag(false);
  // setFinderDiag este es para el codigo 
}

  // servicio que busca Diagnosticos
  const handleBuscarlovlClickDia = async () => {
    //alert('buscar Diagnostico ' + miDiagnostico);
    if (miDiagnostico ==''){
     setResultadosDiagnosticos([]); 
     setOcultaResDiagnosticos(true);
    }
    else {
    try {
      const response = await axios.get(`${baseurlovl}diagnosticos/${miDiagnostico}`);
      setResultadosDiagnosticos(response.data.data);
      setOcultaResDiagnosticos(false);
    } catch (error) {
      console.error(error);
    } 
    }
  };

  function validar_diagnostico(exa) {
          fetch(baseurl+"validate/diagnosticos/" + exa )
          .then(response => response.json())
          .then(data => {
            //console.log("Dentro fetch exitoso Diagnostico");
            let nombres = '';
            nombres = data.name ;
            return(nombres);
          })
          .catch(error => {
            console.error(error);
            return(null);
          });
    }


  useEffect(() => { 
    setUsuario(user.username);
   if (miDiagnostico ==""){
    setMiDiagnostico(props.patron.substring(1));
   }
  }, []); 

  return (
    <div>
    <label></label>  
    <input name='coddiagnostico' type="text" value={miDiagnostico} onChange={handleDiagnosticoChange} />
    <button onClick={handleBuscarlovlClickDia}>Buscar</button>
    <button onClick= {() => {props.mostrar(false)}}>Cerrar</button>

      
    {(!ocultaResDiagnosticos) && resultadosDiagnosticos.length > 0   && 
    < div name= 'marcores_diagnosticos' style={{overflowY:'scroll',height:'350px'}}> 
    <ul>
      {resultadosDiagnosticos.map((resultado) => (
        <li onDoubleClick={() => {setMiDiagnostico(resultado.id);props.retornar(resultado.id); props.descripcion(resultado.name);props.mostrar(false); }} key={resultado.id}>{resultado.id}-{resultado.name} </li>
      ))}
    </ul>
    </div> }
  </div>

  );
}

export default FinderDiagnostico;


