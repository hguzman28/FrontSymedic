import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, } from 'react-bootstrap';


//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Laborden = (props) => {

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



      //const [usuario, setUsuario] = useState('FCHARRIS');

      
      const [mipresOn, setMipresOn]   = useState(true);
      const [polizaOn, setPolizaOn]   = useState(true);
      const [numautoOn, setNumautoOn] = useState(true);


      const [laborden, setLaborden] = useState([]);
      const [selectedLaborden, setSelectedLaborden] = useState({});
      const [showModal, setShowModal] = useState(false);
      const [showNewModal, setShowNewModal] = useState(false);
      const [newLaborden, setNewLaborden] = useState({
            id: '',
            fecorden: '',
            estado: 'A',
            codage: '',
            numorden: '',
            agefaccli: '',
            numfaccli: '',
            tipide: props.mitipide,
            codpac: props.micodpac,
            codemp: '',
            contpac: '',
            interlab: '',
            prio: '',
            codmedico: '',
            nivpac: '',
            copago: '',
            cuotam: '',
            bono: '',
            descpac: '',
            abopac: '',
            coddiagnostico: '',
            totemp: '',
            totpac: '',
            usuario: usuario,
            dur: '',
            descpacp: '',
            factura: '',
            edadf: '',
            facturar: '',
            pendaprob: '',
            embar: '',
            fechasol: '',
            usuvbo: '',
            horvbo: '',
            idbono: '',
            mipres: '',
            poliza: '',
            contrato: '',
            fecent: '',
            horent: '',
            web: '',
      });
      const [alert, setAlert] = useState('');
      useEffect(() => {
            //alert('entra a usefeect')
            setUsuario(user.username);
            obtenerLaborden();
            mapear_estado();
            mapear_codage();
            mapear_agefaccli();
            mapear_tipide();
            mapear_codemp();
      }, []);


      const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/laborden/`; 
      const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
      //const baseurl = 'http://127.0.0.1:8000/laborden/';
      //const baseurlov = 'http://127.0.0.1:8000/lov/';


     

      const obtenerLaborden = async () => {
          if (props.mitipobusqueda =='PACIENTE'){
            try {
                  const response = await fetch(baseurl + 'selectone/' + props.mitipide + '/' + props.micodpac );
                  const data = await response.json();
                  setLaborden(data.data);
                  setTablaLaborden(data.data);
            } catch (error) {
                  console.error(error);
            }}
          else
            {
                  try {
                        const response = await fetch(baseurl + 'selectoneonlyl/' + props.miordenlarga );
                        const data = await response.json();
                        setLaborden(data.data);
                        setTablaLaborden(data.data);
                  } catch (error) {
                        console.error(error);
                  }}
      };
      const actualizarLaborden = async () => {
            try {
                  const response = await fetch(
                        `${baseurl}update/${selectedLaborden.id}`,
                        {
                              method: 'PUT',
                              headers: {
                                    'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                    fecorden: selectedLaborden.fecorden,
                                    estado: selectedLaborden.estado,
                                    codage: selectedLaborden.codage,
                                    numorden: selectedLaborden.numorden,
                                    agefaccli: selectedLaborden.agefaccli,
                                    numfaccli: selectedLaborden.numfaccli,
                                    tipide: selectedLaborden.tipide,
                                    codpac: selectedLaborden.codpac,
                                    codemp: selectedLaborden.codemp,
                                    contpac: selectedLaborden.contpac,
                                    interlab: selectedLaborden.interlab,
                                    prio: selectedLaborden.prio,
                                    codmedico: selectedLaborden.codmedico,
                                    nivpac: selectedLaborden.nivpac,
                                    copago: selectedLaborden.copago,
                                    cuotam: selectedLaborden.cuotam,
                                    bono: selectedLaborden.bono,
                                    descpac: selectedLaborden.descpac,
                                    abopac: selectedLaborden.abopac,
                                    coddiagnostico: selectedLaborden.coddiagnostico,
                                    totemp: selectedLaborden.totemp,
                                    totpac: selectedLaborden.totpac,
                                    usuario: selectedLaborden.usuario,
                                    dur: selectedLaborden.dur,
                                    descpacp: selectedLaborden.descpacp,
                                    factura: selectedLaborden.factura,
                                    edadf: selectedLaborden.edadf,
                                    facturar: selectedLaborden.facturar,
                                    pendaprob: selectedLaborden.pendaprob,
                                    embar: selectedLaborden.embar,
                                    fechasol: selectedLaborden.fechasol,
                                    usuvbo: selectedLaborden.usuvbo,
                                    horvbo: selectedLaborden.horvbo,
                                    idbono: selectedLaborden.idbono,
                                    mipres: selectedLaborden.mipres,
                                    poliza: selectedLaborden.poliza,
                                    contrato: selectedLaborden.contrato,
                                    fecent: selectedLaborden.fecent,
                                    horent: selectedLaborden.horent,
                                    web: selectedLaborden.web,
                              })
                        });
                  const data = await response.json();
                  if (response.status == 200) {
                        setAlert('La Laborden ha sido actualizada exitosamente.');
                        setShowModal(false);
                        obtenerLaborden();
                        obtenerLaborden();
                  } else if (response.status == 400) { setAlert(data.detail); } else { setAlert('Error desconocido'); }
            } catch (error) {
                  console.error(error);
            }
      };
      const eliminarLaborden = async (id) => {
            if (window.confirm('Esta seguro que desea eliminar la Laborden?')) {
                  try {
                        const response = await fetch(
                              `${baseurl}delete/${id}`,
                              {
                                    method: 'DELETE',
                              }
                        );
                        const data = await response.json();
                        setAlert('La Laborden ha sido eliminada exitosamente.');
                        obtenerLaborden();
                  } catch (error) {
                        console.error(error);
                  }
            }
      };
      const handleChange = (event) => {
            const { name, value } = event.target;

            if (selectedLaborden.codemp == '00')
            {
              setMipresOn(true);
              setPolizaOn(true);
              setNumautoOn(true);    
            }
            else
            {
                  setMipresOn(false);
                  setPolizaOn(true);
                  setNumautoOn(false);
            }


            setSelectedLaborden((prevLaborden) => ({
                  ...prevLaborden,
                  [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
            }));
      };
      const handleNewChange = (event) => {
            const { name, value } = event.target;

            if (newLaborden.codemp == '00')
            {
              setMipresOn(true);
              setPolizaOn(true);
              setNumautoOn(true);    
            }
            else
            {
                  setMipresOn(false);
                  setPolizaOn(true);
                  setNumautoOn(false);
            }

            setNewLaborden((prevLaborden) => ({
                  ...prevLaborden,
                  [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
            }));
      };
      const [opciones_estado, setOpcionesEstado] = useState([]); const [opciones_codage, setOpcionesCodage] = useState([]); const [opciones_agefaccli, setOpcionesAgefaccli] = useState([]); const [opciones_tipide, setOpcionesTipide] = useState([]); const [opciones_codemp, setOpcionesCodemp] = useState([]);
      const mapear_estado = async () => {
            try {
                  const listado = [{ "id": "", "name": "Seleccione opcion" }, { "id": "A", "name": "Asentada" }, { "id": "X", "name": "Anulada" }];
                  const opciones = listado.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                              {obj.name}
                        </option>));
                  setOpcionesEstado(opciones);
            } catch (error) {
                  console.error(error);
            }
      }

      const mapear_codage = async () => {
            try {
                  const response = await fetch(baseurlov + 'agencia');
                  const data = await response.json();
                  const opciones = data.data.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                              {obj.name}
                        </option>));
                  setOpcionesCodage(opciones);
            } catch (error) {
                  console.error(error);
            }
      }

      const mapear_agefaccli = async () => {
            try {
                  const response = await fetch(baseurlov + 'agencia');
                  const data = await response.json();
                  const opciones = data.data.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                              {obj.name}
                        </option>));
                  setOpcionesAgefaccli(opciones);
            } catch (error) {
                  console.error(error);
            }
      }

      const mapear_tipide = async () => {
            try {
                  const response = await fetch(baseurlov + 'tipoident');
                  const data = await response.json();
                  const opciones = data.data.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                              {obj.name}
                        </option>));
                  setOpcionesTipide(opciones);
            } catch (error) {
                  console.error(error);
            }
      }

      const mapear_codemp = async () => {
            try {
                  const response = await fetch(baseurlov + 'labempresa');
                  const data = await response.json();
                  const opciones = data.data.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                              {obj.name}
                        </option>));
                  setOpcionesCodemp(opciones);
            } catch (error) {
                  console.error(error);
            }
      }
      const blanquearModal = () => {
            setNewLaborden({
                  id: '',
                  fecorden: '',
                  estado: '',
                  codage: '',
                  numorden: '',
                  agefaccli: '',
                  numfaccli: '',
                  tipide: '',
                  codpac: '',
                  codemp: '',
                  contpac: '',
                  interlab: '',
                  prio: '',
                  codmedico: '',
                  nivpac: '',
                  copago: '',
                  cuotam: '',
                  bono: '',
                  descpac: '',
                  abopac: '',
                  coddiagnostico: '',
                  totemp: '',
                  totpac: '',
                  usuario: '',
                  dur: '',
                  descpacp: '',
                  factura: '',
                  edadf: '',
                  facturar: '',
                  pendaprob: '',
                  embar: '',
                  fechasol: '',
                  usuvbo: '',
                  horvbo: '',
                  idbono: '',
                  mipres: '',
                  poliza: '',
                  contrato: '',
                  fecent: '',
                  horent: '',
                  web: '',

            }); return ('ok');
      }
      const insertarLaborden = async () => {
            console.log(newLaborden);
            try {
                  const response = await fetch(baseurl + 'insert', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              
                              estado: 'A',
                              codage: newLaborden.codage,
                              numorden: newLaborden.numorden,
                              agefaccli: newLaborden.agefaccli,
                              numfaccli: newLaborden.numfaccli?newLaborden.numfaccli:0,
                              tipide: newLaborden.tipide,
                              codpac: newLaborden.codpac,
                              codemp: newLaborden.codemp,
                              contpac: newLaborden.contpac,
                              interlab: newLaborden.interlab,
                              prio: newLaborden.prio,
                              codmedico: newLaborden.codmedico,
                              nivpac: newLaborden.nivpac?newLaborden.nivpac:1,
                              copago: 0,
                              cuotam: 0,
                              bono: 0,
                              descpac: 0,
                              abopac: 0,
                              coddiagnostico: newLaborden.coddiagnostico,
                              totemp: 0,
                              totpac: 0,
                              usuario: newLaborden.usuario,
                              dur: 0,
                              descpacp: 0,
                              factura: newLaborden.factura,
                              facturar: newLaborden.facturar,
                              pendaprob: newLaborden.pendaprob,
                              embar: newLaborden.embar,
                              fechasol: newLaborden.fechasol?newLaborden.fechasol:'1970-01-01',
                              usuvbo: newLaborden.usuvbo,
                              horvbo: newLaborden.horvbo,
                              idbono: 0,
                              mipres: newLaborden.mipres,
                              poliza: newLaborden.poliza,
                              contrato: newLaborden.contrato,
                              fecent: newLaborden.fecent?newLaborden.fecent:'1970-01-01',
                              horent: newLaborden.horent,
                              web: newLaborden.web,
                        })
                  });
                  const data = await response.json();
                  if (response.status == 200) {
                        setAlert("El(La) Orden Lab  " + response.consecutivo + " ha sido agregado(a) exitosamente.");
                        setShowNewModal(false);
                        const x = blanquearModal();
                        obtenerLaborden();
                  } else if (response.status == 400) { setAlert(data.detail); } else { setAlert('Error desconocido'); }
            } catch (error) {
                  console.error(error);
            }
      };
      // ******************** busquedas ****************************** 
      const [tablaLaborden, setTablaLaborden] = useState([]);
      const [busqueda, setBusqueda] = useState();
      const handleChangeFinder = e => {
            setBusqueda(e.target.value);
            filtrar(e.target.value);
      }
      const filtrar = (terminoBusqueda) => {
            var resultadosBusqueda = tablaLaborden.filter((elemento) => {
                  if (elemento.numorden.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                  ) { return elemento; }
            });
            setLaborden(resultadosBusqueda);
      }
      // ******************* fin ******************************** 
      return (
            <>
            { user && user.username ? ( 
            <> 
                  <h1>Orden Lab  </h1>
                  {alert && (
                        <Alert variant='success' onClose={() => setAlert('')} dismissible>
                              {alert}
                        </Alert>
                  )}
                  <Button onClick={() => setShowNewModal(true)} className='btn btn-primary'>
                        Agregar Orden a {props.nompac}
                  </Button>

                  <Button variant='secondary' onClick={() => props.regresar('PAC')} className='btn btn-primary'>
                              Buscar Otro Paciente
                  </Button>      

                  <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por  numorden' onChange={handleChangeFinder} /> </div>
                  <Table striped bordered hover>
                        <thead> <tr>
                              <th>Fecha</th>
                              <th>Estado</th>
                              <th>Agencia</th>
                              <th>Orden</th>
                              <th>AgeFac</th>
                              <th>NumFac</th>
                              <th>TipoIdent</th>
                              <th>NumIdent</th>
                              <th>Empresa</th>
                              <th>Medico</th>
                              <th>Nivel</th>
                              <th>Copago</th>
                              <th>CuotaM</th>
                              <th>Bono</th>
                              <th>DesPac</th>
                              <th>AbonoPac</th>
                              <th>TotalEmp</th>
                              <th>TotalPac</th>
                              <th>Usuario</th>
                              <th>Acciones</th>
                        </tr></thead>
                        <tbody>
                              {laborden.map((orden) => (
                                    <tr>
                                          <td>{orden.fecorden} </td>
                                          <td>{orden.estado} </td>
                                          <td>{orden.codage} </td>
                                          <td>{orden.numorden} </td>
                                          <td>{orden.agefaccli} </td>
                                          <td>{orden.numfaccli} </td>
                                          <td>{orden.tipide} </td>
                                          <td>{orden.codpac} </td>
                                          <td>{orden.codemp} </td>
                                        
                                          <td>{orden.codmedico} </td>
                                          <td>{orden.nivpac} </td>
                                          <td>{orden.copago} </td>
                                          <td>{orden.cuotam} </td>
                                          <td>{orden.bono} </td>
                                          <td>{orden.descpac} </td>
                                          <td>{orden.abopac} </td>
                                          
                                          <td>{orden.totemp} </td>
                                          <td>{orden.totpac} </td>
                                          <td>{orden.usuario} </td>
                                          
                                          <td>
                                          {/*<Button
                                                onClick={() => {
                                                      setSelectedLaborden(orden)
                                                      setShowModal(true)
                                                }}
                                                className='mx-1'
                                          > Editar Encabezado 
                                          </Button> */}
                                                <Button
                                                      onClick={() => {props.setmiage(orden.codage);props.setmiord(orden.numorden); props.regresar('DET');}}
                                                      className='btn btn-primary' >
                                                      Editar
                                                </Button>
                                          </td>
                                    </tr>
                              ))}
                        </tbody>
                  </Table>
                  
                  
                  <Modal show={showNewModal} onHide={() => setShowNewModal(false)} size='xl'>
                        <Modal.Header closeButton>
                              <Modal.Title>Agregar Orden Lab</Modal.Title>
                        </Modal.Header>
                        {alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible>
                              {alert}
                        </Alert>)}
                        <Modal.Body>
                              <div class='container'>
                                   
                            
                              <div class='row'>
                                    <div class='col' > {/* 1  */}
                                          <label for='lbl'>Agencia</label>
                                          <select  onChange={handleNewChange} class='col form-select form-select-sm' id='codage' name='codage' value={newLaborden.codage} > {opciones_codage}
                                          </select>   </div>  {/* fin campo */}
                                    <div class='col' > {/* 2  */}
                                          <label for='lbl'>Orden</label>
                                          <input
                                                type='text' class='form-control'
                                                name='numorden'
                                                value={newLaborden.numorden}
                                                onChange={handleNewChange}
                                                 
                                          />
                                    </div> {/* fin campo */}
                              </div> {/* fin row */}
                              <div class='row' >
                                    <div class='col' > {/* 2  */}
                                          <label for='lbl'>TipoIdent</label>
                                          <select  disabled onChange={handleNewChange} class='col form-select form-select-sm' id='tipide' name='tipide' value={newLaborden.tipide} > {opciones_tipide}
                                          </select>   </div>  {/* fin campo */}
                                    <div class='col' > {/* 3  */}
                                          <label for='lbl'>NumIdent</label>
                                          <input
                                                type='text' class='form-control'
                                                name='codpac'
                                                value={newLaborden.codpac}
                                                onChange={handleNewChange}
                                                disabled
                                          />
                                    </div> {/* fin campo */}
                              </div> {/* fin row */}
                              <div class='row'>
                                    <div class='col' > {/* 1  */}
                                          <label for='lbl'>Empresa</label>
                                          <select onChange={handleNewChange} class='col form-select form-select-sm' id='codemp' name='codemp' value={newLaborden.codemp} > {opciones_codemp}
                                          </select>   </div>  {/* fin campo */}
                                    <div class='col' > {/* 2  */}
                                          <label for='lbl'>Contrato</label>
                                          <input
                                                type='text' class='form-control'
                                                name='contpac'
                                                value={newLaborden.contpac}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                                    <div class='col' > {/* 3  */}
                                          <label for='lbl'>Remitido</label>
                                          <input type='checkbox' name='interlab' checked={newLaborden.interlab == 'S' ? true : false}
                                                onChange={handleNewChange} />
                                    </div> {/* fin campo */}
                              </div> {/* fin row */}
                              <div class='row'>
                                    <div class='col' > {/* 1  */}
                                          <label for='lbl'>Prioridad</label>
                                          <input
                                                type='text' class='form-control'
                                                name='prio'
                                                value={newLaborden.prio}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                                    <div class='col' > {/* 2  */}
                                          <label for='lbl'>Medico</label>
                                          <input
                                                type='text' class='form-control'
                                                name='codmedico'
                                                value={newLaborden.codmedico}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                                    <div class='col' > {/* 3  */}
                                          <label for='lbl'>Nivel</label>
                                          <input
                                                type='text' class='form-control'
                                                name='nivpac'
                                                value={newLaborden.nivpac}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                              </div> {/* fin row */}

                              < div class='row' >
                                    <div class='col' > {/* 1  */}
                                          <label for='lbl'>Duracion</label>
                                          <input
                                                type='text' class='form-control'
                                                name='dur'
                                                value={newLaborden.dur}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                                    <div class='col' > {/* 3  */}
                                          <label for='lbl'>NumFact</label>
                                          <input
                                                type='text' class='form-control'
                                                name='factura'
                                                value={newLaborden.factura}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                              </div > {/* fin row */}
                              < div class='row' >
                                    <div class='col' > {/* 1  */}
                                          <label for='lbl'>Edad</label>
                                          <input
                                                type='text' class='form-control'
                                                name='edadf'
                                                value={newLaborden.edadf}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                                    <div class='col' > {/* 2  */}
                                          <label for='lbl'>Facturar</label>
                                          <input type='checkbox' name='facturar' checked={newLaborden.facturar == 'S' ? true : false}
                                                onChange={handleNewChange} />
                                    </div> {/* fin campo */}
                                    <div class='col' > {/* 3  */}
                                          <label for='lbl'>PendAprob</label>
                                          <input type='checkbox' name='pendaprob' checked={newLaborden.pendaprob == 'S' ? true : false}
                                                onChange={handleNewChange} />
                                    </div> {/* fin campo */}
                              </div > {/* fin row */}
                              < div class='row' >
                                    <div class='col' > {/* 1  */}
                                          <label for='lbl'>Embarazo</label>
                                          <input type='checkbox' name='embar' checked={newLaborden.embar == 'S' ? true : false}
                                                onChange={handleNewChange} />
                                    </div> {/* fin campo */}
                                    <div class='col' > {/* 2  */}
                                          <label for='lbl'>FechaSolIc</label>
                                          <input
                                                type='date' class='form-control'
                                                name='fechasol'
                                                value={newLaborden.fechasol}
                                                onChange={handleNewChange}
                                          />
                                    </div> {/* fin campo */}
                            
                              < div class='col' > {/* 3  */}
                                    < label for='lbl' > Mipres</label >
                                    <input
                                          type='text' class='form-control'
                                          name='mipres'
                                          value={newLaborden.mipres}
                                          onChange={handleNewChange}
                                          disabled={mipresOn}
                                    />
                              </div > {/* fin campo */}
                        </div > {/* fin row */}
                        < div class='row' >
                              <div class='col' > {/* 1  */}
                                    <label for='lbl'>Poliza</label>
                                    <input
                                          type='text' class='form-control'
                                          name='poliza'
                                          value={newLaborden.poliza}
                                          onChange={handleNewChange}
                                          disabled={polizaOn}
                                    />
                              </div> {/* fin campo */}
                              <div class='col' > {/* 2  */}
                                    <label for='lbl'>Autorizacion</label>
                                    <input
                                          type='text' class='form-control'
                                          name='contrato'
                                          value={newLaborden.contrato}
                                          onChange={handleNewChange}
                                          disabled={numautoOn}
                                    />
                              </div> {/* fin campo */}
                              </div>
                              <div class='col' > {/* 3  */}
                                    <label for='lbl'>Fecha Entrega</label>
                                    <input
                                          type='date' class='form-control'
                                          name='fecent'
                                          value={newLaborden.fecent}
                                          onChange={handleNewChange}
                                    />
                                    < div class='col' > {/* 4  */}
                                          < label for='lbl' > Consultar Web</label >
                                          <input type='checkbox' name='web' checked={newLaborden.web == 'S' ? true : false}
                                                onChange={handleNewChange} />
                                    </div > {/* fin campo */}

                              </div > {/* fin row */}

                        </div > {/* fin container ins */}
                  </Modal.Body >
                  <Modal.Footer>
                        <Button variant='secondary' onClick={() => setShowNewModal(false)}>
                              Cerrar
                        </Button>
                        <Button variant='primary' onClick={insertarLaborden}>
                              Agregar Laborden
                        </Button>
                  </Modal.Footer>
            </Modal >




            </>
      ) : (
        <Navigate to="/login" />
      )}
    </> 
 ); };
export default Laborden