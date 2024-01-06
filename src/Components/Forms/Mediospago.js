import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

 const Mediospago = () => { 
 const [mediospago, setMediospago] = useState([]); 
 const [selectedMediospago, setSelectedMediospago] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newMediospago, setNewMediospago] = useState({ 
desmed:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerMediospago(); 
 }, []); 
const baseurl = 'http://127.0.0.1:8000/mediospago/'; 
const baseurlov = 'http://127.0.0.1:8000/lov/'  

 const obtenerMediospago = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setMediospago(data.data); 
     setTablaMediospago(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarMediospago = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedMediospago.codmed}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
desmed:selectedMediospago.desmed, 
 }) } ); 
const data = await response.json(); 
setAlert('La Mediospago ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerMediospago(); 
   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarMediospago = async (id) => { 
  if (window.confirm('�Esta seguro que desea eliminar la Mediospago?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Mediospago ha sido eliminada exitosamente.'); 
      obtenerMediospago(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedMediospago((prevMediospago) => ({ 
    ...prevMediospago, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewMediospago((prevMediospago) => ({ 
    ...prevMediospago, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const blanquearModal = () => { setNewMediospago({ 
desmed:'', 

 }); return('ok'); }  
const insertarMediospago = async () => { 
  console.log(newMediospago); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codmed:newMediospago.codmed,
desmed:newMediospago.desmed
 })  
    }); 
    const data = await response.json(); 
    setAlert('La Mediospago ha sido agregada exitosamente.'); 
    setShowNewModal(false); 
const x = blanquearModal(); 
    obtenerMediospago(); 
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaMediospago, setTablaMediospago]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaMediospago.filter((elemento)=>{ 
if ( elemento.desmed.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.codmed.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setMediospago(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <> 
      <h1>Medios de Pago</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Medios de Pago 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Codigo</th> 
<th>Nombre</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {mediospago.map((mediopago) => ( 
        <tr> 
<td>{mediopago.codmed} </td> 
<td>{mediopago.desmed} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedMediospago(mediopago) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarMediospago(mediopago.codmed)} 
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
      <Modal.Title>Editar Medios de Pago</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
 <Form> 
    <Form.Group controlId='formBasicDesmed'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='desmed' 
      value={selectedMediospago.desmed } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarMediospago}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Medios de Pago</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodmed'> 
		<Form.Label>Codigo</Form.Label> 
      <Form.Control 
      type='text' 
      name='codmed' 
      value={newMediospago.codmed } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDesmed'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='desmed' 
      value={newMediospago.desmed } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarMediospago}> 
    Agregar Mediospago 
  </Button> 
</Modal.Footer> 
</Modal> 
</> ) } 
export default Mediospago