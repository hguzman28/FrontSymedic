import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 
 const Listatmp = () => { 
 const [listatmp, setListatmp] = useState([]); 
 const [selectedLista, setSelectedLista] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLista, setNewLista] = useState({ 
codage:'', 
numorden:'', 
cdgexamen:'', 
nomexamen:'', 
proc:'', 
codpac:'', 
codpac:'', 
nompac:'', 
usurecep:'', 
firmado:'', 
codemp:'', 
nomemp:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerListatmp(); 
 }, []); 
const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/listatmp/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;  
 const obtenerListatmp = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setListatmp(data.data); 
     setTablaListatmp(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLista = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLista.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
codage:selectedLista.codage, 
numorden:selectedLista.numorden, 
cdgexamen:selectedLista.cdgexamen, 
nomexamen:selectedLista.nomexamen, 
proc:selectedLista.proc, 
codpac:selectedLista.codpac, 
codpac:selectedLista.codpac, 
nompac:selectedLista.nompac, 
usurecep:selectedLista.usurecep, 
firmado:selectedLista.firmado, 
codemp:selectedLista.codemp, 
nomemp:selectedLista.nomemp, 
 }) } ); 
const data = await response.json(); 
setAlert('La Lista ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerListatmp(); 
   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLista = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la Lista?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Lista ha sido eliminada exitosamente.'); 
      obtenerListatmp(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedLista((prevLista) => ({ 
    ...prevLista, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLista((prevLista) => ({ 
    ...prevLista, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const blanquearModal = () => { setNewLista({ 
codage:'', 
numorden:'', 
cdgexamen:'', 
nomexamen:'', 
proc:'', 
codpac:'', 
codpac:'', 
nompac:'', 
usurecep:'', 
firmado:'', 
codemp:'', 
nomemp:'', 

 }); return('ok'); }  
const insertarLista = async () => { 
  console.log(newLista); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codage:newLista.codage,
numorden:newLista.numorden,
cdgexamen:newLista.cdgexamen,
nomexamen:newLista.nomexamen,
proc:newLista.proc,
codpac:newLista.codpac,
codpac:newLista.codpac,
nompac:newLista.nompac,
usurecep:newLista.usurecep,
firmado:newLista.firmado,
codemp:newLista.codemp,
nomemp:newLista.nomemp
 })  
    }); 
    const data = await response.json(); 
    setAlert('La Lista ha sido agregada exitosamente.'); 
    setShowNewModal(false); 
const x = blanquearModal(); 
    obtenerListatmp(); 
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaListatmp, setTablaListatmp]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaListatmp.filter((elemento)=>{ 
if ( elemento.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setListatmp(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <> 
      <h1>Lista</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Lista 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Agencia</th> 
<th>Orden</th> 
<th>Medio Pago</th> 
<th>Nomexamen</th> 
<th>Procesado</th> 
<th>IdentPaciente</th> 
<th>IdentPaciente</th> 
<th>NombrePaciente</th> 
<th>UsuarioOrden</th> 
<th>FirmadoPor</th> 
<th>Empresa</th> 
<th>NomEmpresa</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {listatmp.map((lista) => ( 
        <tr> 
<td>{lista.codage} </td> 
<td>{lista.numorden} </td> 
<td>{lista.cdgexamen} </td> 
<td>{lista.nomexamen} </td> 
<td>{lista.proc} </td> 
<td>{lista.codpac} </td> 
<td>{lista.codpac} </td> 
<td>{lista.nompac} </td> 
<td>{lista.usurecep} </td> 
<td>{lista.firmado} </td> 
<td>{lista.codemp} </td> 
<td>{lista.nomemp} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLista(lista) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLista(lista.id)} 
              className='btn btn-danger' > 
              Eliminar 
            </Button> 
          </td> 
        </tr> 
      ))} 
    </tbody> 
  </Table> 
  <Modal show={showModal} onHide={() => setShowModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Editar Lista</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
 <Form> 
    <Form.Group controlId='formBasicCodage'> 
		<Form.Label>Agencia</Form.Label> 
      <Form.Control 
      type='text' 
      name='codage' 
      value={selectedLista.codage } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicNumorden'> 
		<Form.Label>Orden</Form.Label> 
      <Form.Control 
      type='text' 
      name='numorden' 
      value={selectedLista.numorden } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Medio Pago</Form.Label> 
      <Form.Control 
      type='text' 
      name='cdgexamen' 
      value={selectedLista.cdgexamen } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicNomexamen'> 
		<Form.Label>Nomexamen</Form.Label> 
      <Form.Control 
      type='text' 
      name='nomexamen' 
      value={selectedLista.nomexamen } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicProc'> 
		<Form.Label>Procesado</Form.Label> 
      <Form.Control 
      type='text' 
      name='proc' 
      value={selectedLista.proc } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicCodpac'> 
		<Form.Label>IdentPaciente</Form.Label> 
      <Form.Control 
      type='text' 
      name='codpac' 
      value={selectedLista.codpac } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicCodpac'> 
		<Form.Label>IdentPaciente</Form.Label> 
      <Form.Control 
      type='text' 
      name='codpac' 
      value={selectedLista.codpac } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicNompac'> 
		<Form.Label>NombrePaciente</Form.Label> 
      <Form.Control 
      type='text' 
      name='nompac' 
      value={selectedLista.nompac } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicUsurecep'> 
		<Form.Label>UsuarioOrden</Form.Label> 
      <Form.Control 
      type='text' 
      name='usurecep' 
      value={selectedLista.usurecep } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicFirmado'> 
		<Form.Label>FirmadoPor</Form.Label> 
      <Form.Control 
      type='text' 
      name='firmado' 
      value={selectedLista.firmado } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Empresa</Form.Label> 
      <Form.Control 
      type='text' 
      name='codemp' 
      value={selectedLista.codemp } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicNomemp'> 
		<Form.Label>NomEmpresa</Form.Label> 
      <Form.Control 
      type='text' 
      name='nomemp' 
      value={selectedLista.nomemp } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLista}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Lista</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodage'> 
		<Form.Label>Agencia</Form.Label> 
      <Form.Control 
      type='text' 
      name='codage' 
      value={newLista.codage } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNumorden'> 
		<Form.Label>Orden</Form.Label> 
      <Form.Control 
      type='text' 
      name='numorden' 
      value={newLista.numorden } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Medio Pago</Form.Label> 
      <Form.Control 
      type='text' 
      name='cdgexamen' 
      value={newLista.cdgexamen } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNomexamen'> 
		<Form.Label>Nomexamen</Form.Label> 
      <Form.Control 
      type='text' 
      name='nomexamen' 
      value={newLista.nomexamen } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicProc'> 
		<Form.Label>Procesado</Form.Label> 
      <Form.Control 
      type='text' 
      name='proc' 
      value={newLista.proc } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodpac'> 
		<Form.Label>IdentPaciente</Form.Label> 
      <Form.Control 
      type='text' 
      name='codpac' 
      value={newLista.codpac } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodpac'> 
		<Form.Label>IdentPaciente</Form.Label> 
      <Form.Control 
      type='text' 
      name='codpac' 
      value={newLista.codpac } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNompac'> 
		<Form.Label>NombrePaciente</Form.Label> 
      <Form.Control 
      type='text' 
      name='nompac' 
      value={newLista.nompac } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicUsurecep'> 
		<Form.Label>UsuarioOrden</Form.Label> 
      <Form.Control 
      type='text' 
      name='usurecep' 
      value={newLista.usurecep } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicFirmado'> 
		<Form.Label>FirmadoPor</Form.Label> 
      <Form.Control 
      type='text' 
      name='firmado' 
      value={newLista.firmado } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Empresa</Form.Label> 
      <Form.Control 
      type='text' 
      name='codemp' 
      value={newLista.codemp } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNomemp'> 
		<Form.Label>NomEmpresa</Form.Label> 
      <Form.Control 
      type='text' 
      name='nomemp' 
      value={newLista.nomemp } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLista}> 
    Agregar Lista 
  </Button> 
</Modal.Footer> 
</Modal> 
</> ) } 
export default Listatmp