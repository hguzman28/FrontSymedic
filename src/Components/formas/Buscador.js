import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
const baseurl = ${process.env.REACT_APP_ENDPOINT_DATA};

const Buscador = ({cambios}) => {

  const [miExamen,setMiExamen] = useState('');
  const [resultadosExamenes, setResultadosExamenes] = useState([]);
  const [miExamenDesc,setMiExamenDesc] = useState('');
  const [ocultaresExamenes, setOcultaResExamenes] = useState(true);

  const [miTipIde,setMiTipIde] = useState('');
  const [miPaciente,setMiPaciente] = useState('');
  const [resultadosPacientes, setResultadosPacientes] = useState([]);
  const [miPacienteDesc,setMiPacienteDesc] = useState('');
  const [ocultaresPacientes, setOcultaResPacientes] = useState(true);

    // patron multiproposito
  const handlePacienteChange = (event) => {
      setMiPaciente(event.target.value);
    };

      // patron multiproposito
  const handleExamenChange = (event) => {
    setMiExamen(event.target.value);
     };

const limpiar = () =>{
  setResultadosPacientes([]);
  setResultadosExamenes([]);
  setOcultaResExamenes(true);
  setOcultaResPacientes(true);
}

  // servicio que busca pacientes
  const handleBuscarlovlClickPac = async () => {
    //alert('buscar pac ' + miPaciente);
    if (miPaciente ==''){
     setResultadosPacientes([]);
     setOcultaResPacientes(true); 
    }
    else {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_DATA}/lovl/pacientes/${miPaciente}`);
      setResultadosPacientes(response.data.data);
      setOcultaResPacientes(false);
    } catch (error) {
      console.error(error);
    } 
    }
  };
  // servicio que busca examenes
  const handleBuscarlovlClickExa = async () => {
    //alert('buscar exa ' + miExamen);
    if (miExamen ==''){
     setResultadosExamenes([]); 
     setOcultaResExamenes(true);
    }
    else {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_DATA}/lovl/examenes/${miExamen}`);
      setResultadosExamenes(response.data.data);
      setOcultaResExamenes(false);
    } catch (error) {
      console.error(error);
    } 
    }
  };

  function validar_paciente(tip,cod) {
  //  ${process.env.REACT_APP_ENDPOINT_DATA}/validate/pacientes/CC/32608771
      // alert('validar' + baseurl+"validate/pacientes/" + tip + "/" + cod);
        fetch(baseurl+"validate/pacientes/" + tip + "/" + cod)
        .then(response => response.json())
        .then(data => {
          //console.log("Dentro fetch exitoso paciente");
          const nombres = '';
          console.log(data.data[0].nompac+' '+data.data[0].apepac +' '+data.data[0].apepac2 );
          return(nombres);
        })
        .catch(error => {
          console.error(error);
          return(null);
        });
  }

  function validar_examen(exa) {
          fetch(baseurl+"validate/examenes/" + exa )
          .then(response => response.json())
          .then(data => {
            //console.log("Dentro fetch exitoso paciente");
            const nombres = '';
            nombres = data.data[0].nombre ;
            return(nombres);
          })
          .catch(error => {
            console.error(error);
            return(null);
          });
    }

  useEffect(() => { 
   // const respu =  validar_paciente('CC','32608771'); 
   
  }, []); 

  
  return (
    <>
    <div>
    
    <label>Paciente</label>
      <input name='codpac' type="text" value={miPaciente} onChange={handlePacienteChange} />
      <button onClick={handleBuscarlovlClickPac}>Buscar</button>
      <button onClick={limpiar}>Limpiar</button>
      
      {(!ocultaresPacientes) && 
      <div name= 'marcores_pacientes' style={{overflowY:'scroll',height:'350px'}}>
      <ul>
        {resultadosPacientes.map((resultado) => (
          <li onDoubleClick={() => {setMiPaciente(resultado.id);limpiar();}} key={resultado.id}>{resultado.id}-{resultado.name} </li>
        ))}
      </ul>
      </div> }
    </div>

      <div>
      <label>Examen</label>  
      <input name='cdgexamen' type="text" value={miExamen} onChange={handleExamenChange} />
      <button onClick={handleBuscarlovlClickExa}>Buscar</button>
      <button onClick={limpiar}>Limpiar</button>
        
      {(!ocultaresExamenes) && 
      < div name= 'marcores_examenes' style={{overflowY:'scroll',height:'350px'}}> 
      <ul>
        {resultadosExamenes.map((resultado) => (
          <li onDoubleClick={() => {setMiExamen(resultado.id);limpiar(); }} key={resultado.id}>{resultado.id}-{resultado.name} </li>
        ))}
      </ul>
      </div> }
    </div>
    </>
  );
};

export default Buscador;
