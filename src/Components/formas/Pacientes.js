import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
import FinderDiagnostico from "./FinderDiagnostico";

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Pacientes = (props) => {

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

  // buscador
  const [miTipIde,setMiTipIde] = useState('');
  const [miPaciente,setMiPaciente] = useState('');
  const [resultadosPacientes, setResultadosPacientes] = useState([]);
  const [miPacienteDesc,setMiPacienteDesc] = useState('');
  const [ocultaresPacientes, setOcultaResPacientes] = useState(true);


  // diagnosticos
  const[finderDiag,setFinderDiag] = useState(''); // campo dummy para probar finder
  const[showFinderDiag,setShowFinderDiag] = useState(false); // campo dummy para probar finder
  const[finderDescDiag,setFinderDescDiag] = useState(''); // campo dummy para la descripcion del codigo digitado

  //const [usuario, setUsuario] = useState('FCHARRIS');

  const [paciente, setPacientes] = useState([]);
  const [selectedPacientes, setSelectedPacientes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPacientes, setNewPacientes] = useState({
    tipide: "",
    codpac: "",
    nompac: "",
    nompac2: "",
    apepac: "",
    apepac2: "",
    sexo: "",
    vincpac: "",
    fecnac: "",
    fecing: "",
    codocu: "",
    deppac: "",
    ciupac: "",
    gruposang: "",
    codemp: "",
    coddiagnostico: "",
    contpac: "",
    planben: "",
    codundnegocio: "",
    nivpac: "",
    obs: "",
    dir: "",
    tel: "",
    remite: "",
    cedaco: "",
    nomaco: "",
    apeaco: "",
    telaco: "",
    diraco: "",
    celular: "",
    acofam: "",
  });
  const [alert, setAlert] = useState("");
  useEffect(() => {
   // obtenerPacientes();
   setUsuario(user.username);
    mapear_tipide();
    mapear_sexo();
    mapear_vincpac();
    mapear_codocu();
    mapear_deppac();
    mapear_ciupac();
    mapear_codemp();
    mapear_planben();
    mapear_codundnegocio();
  }, []);

  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/paciente/`; 
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

  //const baseurl = "http://127.0.0.1:8000/paciente/";
  //const baseurlov = "http://127.0.0.1:8000/lov/";
 
  const obtenerPacientes = async () => {
    try {
     // alert(busqueda);
      //if ( busqueda.length > 2) // solo cuando haya un patron en la barra
      //{
            const response = await fetch(baseurl + "selectone/" + miPaciente);
            const data = await response.json();
            setPacientes(data.data);
            setFinderDiag(data.data[0].coddiagnostico);
            validar_diagnostico(data.data[0].coddiagnostico);

          //  setTablaPacientes(data.data);
      //}
    } catch (error) {
      console.error(error);
    }
  };
  const actualizarPacientes = async () => {
    try {
      const response = await fetch(`${baseurl}update/${selectedPacientes.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipide: selectedPacientes.tipide,
          codpac: selectedPacientes.codpac,
          nompac: selectedPacientes.nompac,
          nompac2: selectedPacientes.nompac2,
          apepac: selectedPacientes.apepac,
          apepac2: selectedPacientes.apepac2,
          sexo: selectedPacientes.sexo,
          vincpac: selectedPacientes.vincpac,
          fecnac: selectedPacientes.fecnac,
          fecing: selectedPacientes.fecing,
          codocu: selectedPacientes.codocu,
          deppac: selectedPacientes.deppac,
          ciupac: selectedPacientes.ciupac,
          gruposang: selectedPacientes.gruposang,
          codemp: selectedPacientes.codemp,
          coddiagnostico: finderDescDiag?finderDiag:'',
          contpac: selectedPacientes.contpac,
          planben: selectedPacientes.planben,
          codundnegocio: selectedPacientes.codundnegocio,
          nivpac: selectedPacientes.nivpac,
          obs: selectedPacientes.obs,
          dir: selectedPacientes.dir,
          tel: selectedPacientes.tel,
          remite: selectedPacientes.remite,
          cedaco: selectedPacientes.cedaco,
          nomaco: selectedPacientes.nomaco,
          apeaco: selectedPacientes.apeaco,
          telaco: selectedPacientes.telaco,
          diraco: selectedPacientes.diraco,
          celular: selectedPacientes.celular,
          acofam: selectedPacientes.acofam,
        }),
      });
      const data = await response.json();
      
      if (response.status == 200) {
        setAlert("La Pacientes ha sido actualizada exitosamente.");
        setShowModal(false);
        obtenerPacientes();
      
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }
    
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarPacientes = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar la Pacientes?")) {
      try {
        const response = await fetch(`${baseurl}delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();

        setAlert("La Pacientes ha sido eliminada exitosamente.");
        obtenerPacientes();
       
        if (response.status == 200) {
          setAlert("El registro ha sido eliminada exitosamente.");
          obtenerPacientes();
         
        } else if (response.status == 400) {
          setAlert(data.detail);
        } else {
          setAlert('Error desconocido');
        }
      
      
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

       // buscador diagn
       //setFinderDiag(event.target.value);
       //setFinderDescDiag('');

    setSelectedPacientes((prevPacientes) => ({
      ...prevPacientes,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };

 
  const handleDiagnostico = (event) => {
    const { name, value } = event.target;
    setFinderDiag(event.target.value);
     setFinderDescDiag('');

  }

  const handleNewChange = (event) => {
    const { name, value } = event.target;

     // buscador diagn
    // setFinderDiag(event.target.value);
    // setFinderDescDiag('');

    setNewPacientes((prevPacientes) => ({
      ...prevPacientes,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };
  const [opciones_tipide, setOpcionesTipide] = useState([]);
  const [opciones_sexo, setOpcionesSexo] = useState([]);
  const [opciones_vincpac, setOpcionesVincpac] = useState([]);
  const [opciones_codocu, setOpcionesCodocu] = useState([]);
  const [opciones_deppac, setOpcionesDeppac] = useState([]);
  const [opciones_ciupac, setOpcionesCiupac] = useState([]);
  const [opciones_codemp, setOpcionesCodemp] = useState([]);
  const [opciones_planben, setOpcionesPlanben] = useState([]);
  const [opciones_codundnegocio, setOpcionesCodundnegocio] = useState([]);
  const mapear_tipide = async () => {
    try {
      const response = await fetch(baseurlov + "tipoident");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesTipide(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_sexo = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "M", name: "Masculino" },
        { id: "F", name: "Femenino" },
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesSexo(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_vincpac = async () => {
    try {
      const response = await fetch(baseurlov + "vinculacion");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesVincpac(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_codocu = async () => {
    try {
      const response = await fetch(baseurlov + "ocupacion");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCodocu(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_deppac = async () => {
    try {
      const response = await fetch(baseurlov + "departamento");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesDeppac(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_ciupac = async () => {
    try {
      const response = await fetch(baseurlov + "ciudad");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCiupac(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_codemp = async () => {
    try {
      const response = await fetch(baseurlov + "labempresa");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCodemp(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_planben = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "NOPBS", name: "NOPBS" },
        { id: "PBS", name: "PBS" },
        { id: "PART", name: "Particular" },
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesPlanben(opciones);
    } catch (error) {
      console.error(error);
    }
  };

    
  // texto diagnostico
  const handleChangeFinderDiag = (event) => {
    setFinderDiag(event.target.value);
    setFinderDescDiag('');
  };
  // para controlar si se muestra o no el finder
  const handleDclickDiag = (event) => {
    // aqui hay q revisar si la cadena contiene % para usar el buscador o invocar a validar
    // para buscar la descripcion
    let primcar =  finderDiag.substring(0, 1); 
    if (primcar == '%')
    { 
    setShowFinderDiag(true);
    }
    else
    { 
      setShowFinderDiag(false); 
     // alert(' va a buscar ' + finderDiag);
     let descripcion = validar_diagnostico(finderDiag); 
     //alert(' retorno ' + descripcion);
    }
  }
    // para traer la descripcion al digitar el codigo
    function validar_diagnostico(patro) {
      // alert(' se buscara ' + patro);
       fetch(baseurl+"validate/diagnosticos/" + patro )
       .then(response => response.json())
       .then(data => {
         console.log(' respuesta del servicio validate ');
         console.log(data);
         let nombres = '';
         nombres = data.name; 
         setFinderDescDiag(nombres);
         return(nombres);
       })
       .catch(error => {
         console.error(error);
         return(null);
       });
   }
   
  function validar_paciente(tip,cod) {
      //  http://127.0.0.1:8000/validate/pacientes/CC/32608771
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

  const mapear_codundnegocio = async () => {
    try {
      const response = await fetch(baseurlov + "unegocio");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCodundnegocio(opciones);
    } catch (error) {
      console.error(error);
    }
  };
  const blanquearModal = () => {
    setNewPacientes({
      tipide: "",
      codpac: "",
      nompac: "",
      nompac2: "",
      apepac: "",
      apepac2: "",
      sexo: "",
      vincpac: "",
      fecnac: "",
      fecing: "",
      codocu: "",
      deppac: "",
      ciupac: "",
      gruposang: "",
      codemp: "",
      coddiagnostico: "",
      contpac: "",
      planben: "",
      codundnegocio: "",
      nivpac: "",
      obs: "",
      dir: "",
      tel: "",
      remite: "",
      cedaco: "",
      nomaco: "",
      apeaco: "",
      telaco: "",
      diraco: "",
      celular: "",
      acofam: "",
    });
    return "ok";
  };
  const insertarPacientes = async () => {
    console.log(newPacientes);
    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({datos:{
          tipide: newPacientes.tipide,
          codpac: newPacientes.codpac,
          nompac: newPacientes.nompac,
          nompac2: newPacientes.nompac2,
          apepac: newPacientes.apepac,
          apepac2: newPacientes.apepac2,
          sexo: newPacientes.sexo,
          vincpac: newPacientes.vincpac,
          fecnac: newPacientes.fecnac,
          fecing: newPacientes.fecing,
          codocu: newPacientes.codocu,
          deppac: newPacientes.deppac,
          ciupac: newPacientes.ciupac,
          gruposang: newPacientes.gruposang,
          codemp: newPacientes.codemp,
          coddiagnostico: finderDescDiag?finderDiag:'',
          contpac: newPacientes.contpac,
          planben: newPacientes.planben,
          codundnegocio: newPacientes.codundnegocio,
          nivpac: newPacientes.nivpac,
          obs: newPacientes.obs,
          dir: newPacientes.dir,
          tel: newPacientes.tel,
          remite: newPacientes.remite,
          cedaco: newPacientes.cedaco,
          nomaco: newPacientes.nomaco,
          apeaco: newPacientes.apeaco,
          telaco: newPacientes.telaco,
          diraco: newPacientes.diraco,
          celular: newPacientes.celular,
          acofam: newPacientes.acofam,
        },control:{usuario: usuario}}),
      });
      const data = await response.json();
      
      
    
      if (response.status == 200) {
        setAlert("La Pacientes ha sido agregada exitosamente.");
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerPacientes();
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }
    
    
    
    } catch (error) {
      console.error(error);
    }
  };

//***************   buscador de pacientes  */

    // patron multiproposito
    const handlePacienteChange = (event) => {
      setMiPaciente(event.target.value);
      if (event.target.value!='')
      {
      props.tipobusqueda('PACIENTE');}
      };
  
     
  //******************************************
  const limpiar = () =>{
    setResultadosPacientes([]);
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
        const response = await axios.get(`http://127.0.0.1:8000/lovl/pacientes/${miPaciente}`);
        setResultadosPacientes(response.data.data);
        setOcultaResPacientes(false);
      } catch (error) {
        console.error(error);
      } 
      }
    };
    
  
    function validar_paciente(tip,cod) {
    //  http://127.0.0.1:8000/validate/pacientes/CC/32608771
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
  

//********************************************* */
    return (
      <>
      { user && user.username ? ( 
      <> 
      <h1>Pacientes</h1>
      {alert && (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      )}
      <Button onClick={() => setShowNewModal(true)} className="mb-3">
        Agregar Pacientes
      </Button>
     
      <div>

     { /* buscador de pacientes */}

    <label>Encontrar un paciente</label>
      <input name='codpac' type="text" value={miPaciente} onChange={handlePacienteChange} />
      <button onClick={handleBuscarlovlClickPac}>Encontrar</button>
      <button onClick={limpiar}>Limpiar</button>
      
      {(!ocultaresPacientes) && resultadosPacientes.length>0 && 
      <div name= 'marcores_pacientes' style={{overflowY:'scroll',height:'350px'}}>
      <ul>
        {resultadosPacientes.map((resultado) => (
          <li onDoubleClick={() => {setMiPaciente(resultado.id);limpiar();}} key={resultado.id}>{resultado.id}-{resultado.name} </li>
        ))}
      </ul>
      </div> }
    </div>

    { /* fin buscador de pacientes */}

     <br></br>
     <div>
     <Button onClick={() => obtenerPacientes()} className="mb-3">
        Traer Datos de Paciente
      </Button>
     </div>



      <Table striped bordered hover>
        <thead>
          {" "}
          <tr>
            <th>Tipo Ide</th>
            <th>Ident</th>
            <th>1erNombre</th>
            <th>2oNombre</th>
            <th>1erApellido</th>
            <th>2oApellido</th>
            <th>Sexo</th>
            <th>Vinculacion</th>
            <th>FechaNac</th>
            <th>FechaIng</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paciente.map((paciente) => (
            <tr>
              <td>{paciente.tipide} </td>
              <td>{paciente.codpac} </td>
              <td>{paciente.nompac} </td>
              <td>{paciente.nompac2} </td>
              <td>{paciente.apepac} </td>
              <td>{paciente.apepac2} </td>
              <td>{paciente.sexo} </td>
              <td>{paciente.vincpac} </td>
              <td>{paciente.fecnac} </td>
              <td>{paciente.fecing} </td>

              <td>
                <Button
                  onClick={() => {
                    setSelectedPacientes(paciente);
                    setShowModal(true);
                  }}
                  className="mx-1"
                >
                  {" "}
                  Editar{" "}
                </Button>
                {/* <Button
                  onClick={() => eliminarPacientes(paciente.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </Button> */}

                <Button
                  onClick={() => {props.regresar('ENC');props.identi(paciente.tipide);props.paciente(paciente.codpac);props.nompac(paciente.nompac + ' ' + paciente.apepac );}}
                  className="btn btn-primary"
                >
                  Ordenes del paciente
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Editar Pacientes</Modal.Title>
        </Modal.Header>
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

        <Modal.Body>
          <div class="container">
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Tipo Ide</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="tipide"
                  name="tipide"
                  disabled='true'
                  value={selectedPacientes.tipide}
                >
                  {" "}
                  {opciones_tipide}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Ident</label>
                <input
                  type="text"
                  class="form-control"
                  name="codpac"
                  disabled='true'
                  value={selectedPacientes.codpac}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">1erNombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nompac"
                  value={selectedPacientes.nompac}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">2oNombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nompac2"
                  value={selectedPacientes.nompac2}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">1erApellido</label>
                <input
                  type="text"
                  class="form-control"
                  name="apepac"
                  value={selectedPacientes.apepac}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">2oApellido</label>
                <input
                  type="text"
                  class="form-control"
                  name="apepac2"
                  value={selectedPacientes.apepac2}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Sexo</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="sexo"
                  name="sexo"
                  value={selectedPacientes.sexo}
                >
                  {" "}
                  {opciones_sexo}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Vinculacion</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="vincpac"
                  name="vincpac"
                  value={selectedPacientes.vincpac}
                >
                  {" "}
                  {opciones_vincpac}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">FechaNac</label>
                <input
                  type="date"
                  class="form-control"
                  name="fecnac"
                  value={selectedPacientes.fecnac}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Ocupacion</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="codocu"
                  name="codocu"
                  value={selectedPacientes.codocu}
                >
                  {" "}
                  {opciones_codocu}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Departamento</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="deppac"
                  name="deppac"
                  value={selectedPacientes.deppac}
                >
                  {" "}
                  {opciones_deppac}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Ciudad</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="ciupac"
                  name="ciupac"
                  value={selectedPacientes.ciupac}
                >
                  {" "}
                  {opciones_ciupac}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">GrupoSanguineo</label>
                <input
                  type="text"
                  class="form-control"
                  name="gruposang"
                  value={selectedPacientes.gruposang}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Empresa</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="codemp"
                  name="codemp"
                  value={selectedPacientes.codemp}
                >
                  {" "}
                  {opciones_codemp}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Diagnostico</label>
                {/* <input
                  type="text"
                  class="form-control"
                  name="coddiagnostico"
                  value={selectedPacientes.coddiagnostico}
                  onChange={handleChange}
                 /> */}
                   <input name='coddiagnostico' type="text" value={finderDiag} onDoubleClick={handleDclickDiag} onChange={handleDiagnostico} /> {finderDescDiag}
                    { showFinderDiag && <div>
                      <FinderDiagnostico patron={finderDiag} retornar={setFinderDiag} descripcion = {setFinderDescDiag} mostrar={setShowFinderDiag} />
                    </div>
                    }  
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Contrato</label>
                <input
                  type="text"
                  class="form-control"
                  name="contpac"
                  value={selectedPacientes.contpac}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">PlanBenef</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="planben"
                  name="planben"
                  value={selectedPacientes.planben}
                >
                  {" "}
                  {opciones_planben}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Unegocio</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="codundnegocio"
                  name="codundnegocio"
                  value={selectedPacientes.codundnegocio}
                >
                  {" "}
                  {opciones_codundnegocio}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Nivel</label>
                <input
                  type="text"
                  class="form-control"
                  name="nivpac"
                  value={selectedPacientes.nivpac}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Antecedentes</label>
                <input
                  type="text"
                  class="form-control"
                  name="obs"
                  value={selectedPacientes.obs}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Dir</label>
                <input
                  type="text"
                  class="form-control"
                  name="dir"
                  value={selectedPacientes.dir}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Tel</label>
                <input
                  type="text"
                  class="form-control"
                  name="tel"
                  value={selectedPacientes.tel}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Remite</label>
                <input
                  type="text"
                  class="form-control"
                  name="remite"
                  value={selectedPacientes.remite}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">IdentAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="cedaco"
                  value={selectedPacientes.cedaco}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">NombreAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="nomaco"
                  value={selectedPacientes.nomaco}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">ApellidoAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="apeaco"
                  value={selectedPacientes.apeaco}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">TelAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="telaco"
                  value={selectedPacientes.telaco}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">DirAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="diraco"
                  value={selectedPacientes.diraco}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Celular</label>
                <input
                  type="text"
                  class="form-control"
                  name="celular"
                  value={selectedPacientes.celular}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Familiar</label>
                <input
                  type="checkbox"
                  name="acofam"
                  checked={selectedPacientes.acofam == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row ultimo */}
          </div>{" "}
          {/* fin container mod */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizarPacientes}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showNewModal}
        onHide={() => setShowNewModal(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pacientes</Modal.Title>
        </Modal.Header>
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
         )}   

        <Modal.Body>
          <div class="container">
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Tipo Ide</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="tipide"
                  name="tipide"
                  value={newPacientes.tipide}
                >
                  {" "}
                  {opciones_tipide}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Ident</label>
                <input
                  type="text"
                  class="form-control"
                  name="codpac"
                  value={newPacientes.codpac}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">1erNombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nompac"
                  value={newPacientes.nompac}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">2oNombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nompac2"
                  value={newPacientes.nompac2}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">1erApellido</label>
                <input
                  type="text"
                  class="form-control"
                  name="apepac"
                  value={newPacientes.apepac}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">2oApellido</label>
                <input
                  type="text"
                  class="form-control"
                  name="apepac2"
                  value={newPacientes.apepac2}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Sexo</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="sexo"
                  name="sexo"
                  value={newPacientes.sexo}
                >
                  {" "}
                  {opciones_sexo}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Vinculacion</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="vincpac"
                  name="vincpac"
                  value={newPacientes.vincpac}
                >
                  {" "}
                  {opciones_vincpac}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">FechaNac</label>
                <input
                  type="date"
                  class="form-control"
                  name="fecnac"
                  value={newPacientes.fecnac}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Ocupacion</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="codocu"
                  name="codocu"
                  value={newPacientes.codocu}
                >
                  {" "}
                  {opciones_codocu}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Departamento</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="deppac"
                  name="deppac"
                  value={newPacientes.deppac}
                >
                  {" "}
                  {opciones_deppac}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Ciudad</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="ciupac"
                  name="ciupac"
                  value={newPacientes.ciupac}
                >
                  {" "}
                  {opciones_ciupac}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">GrupoSanguineo</label>
                <input
                  type="text"
                  class="form-control"
                  name="gruposang"
                  value={newPacientes.gruposang}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Empresa</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="codemp"
                  name="codemp"
                  value={newPacientes.codemp}
                >
                  {" "}
                  {opciones_codemp}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}{/* 2  */}
                <label for="lbl">Diagnostico</label>
                {/*<input
                  type="text"
                  class="form-control"
                  name="coddiagnostico"
                  value={newPacientes.coddiagnostico}
                  onChange={handleNewChange}
                /> */}

                <input name='coddiagnostico' type="text" value={finderDiag} onDoubleClick={handleDclickDiag} onChange={handleDiagnostico} /> {finderDescDiag}
                { showFinderDiag && <div>
                  <FinderDiagnostico patron={finderDiag} retornar={setFinderDiag} descripcion = {setFinderDescDiag} mostrar={setShowFinderDiag} />
                </div>
                 }  


              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Contrato</label>
                <input
                  type="text"
                  class="form-control"
                  name="contpac"
                  value={newPacientes.contpac}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">PlanBenef</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="planben"
                  name="planben"
                  value={newPacientes.planben}
                >
                  {" "}
                  {opciones_planben}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Unegocio</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="codundnegocio"
                  name="codundnegocio"
                  value={newPacientes.codundnegocio}
                >
                  {" "}
                  {opciones_codundnegocio}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Nivel</label>
                <input
                  type="text"
                  class="form-control"
                  name="nivpac"
                  value={newPacientes.nivpac}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Antecedentes</label>
                <input
                  type="text"
                  class="form-control"
                  name="obs"
                  value={newPacientes.obs}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Dir</label>
                <input
                  type="text"
                  class="form-control"
                  name="dir"
                  value={newPacientes.dir}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Tel</label>
                <input
                  type="text"
                  class="form-control"
                  name="tel"
                  value={newPacientes.tel}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Remite</label>
                <input
                  type="text"
                  class="form-control"
                  name="remite"
                  value={newPacientes.remite}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">IdentAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="cedaco"
                  value={newPacientes.cedaco}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">NombreAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="nomaco"
                  value={newPacientes.nomaco}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">ApellidoAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="apeaco"
                  value={newPacientes.apeaco}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">TelAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="telaco"
                  value={newPacientes.telaco}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">DirAcomp</label>
                <input
                  type="text"
                  class="form-control"
                  name="diraco"
                  value={newPacientes.diraco}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Celular</label>
                <input
                  type="text"
                  class="form-control"
                  name="celular"
                  value={newPacientes.celular}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Familiar</label>
                <input
                  type="checkbox"
                  name="acofam"
                  checked={newPacientes.acofam == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row ultimo */}
          </div>{" "}
          {/* fin container ins */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={insertarPacientes}>
            Agregar Pacientes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default Pacientes;
