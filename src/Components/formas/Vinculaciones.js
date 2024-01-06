import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Vinculaciones = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


  const [vinculacion, setVinculaciones] = useState([]); 
 const [selectedVinculacion, setSelectedVinculacion] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newVinculacion, setNewVinculacion] = useState({ 
nomvic:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerVinculaciones(); 
 }, []); 

 
const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/vinculacion/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 const obtenerVinculaciones = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setVinculaciones(data.data); 
     setTablaVinculaciones(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarVinculacion = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedVinculacion.vincpac}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nomvic:selectedVinculacion.nomvic
 }) } ); 
const data = await response.json(); 
  
   
   if (response.status == 200) {
    setAlert('La Vinculacion ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerVinculaciones(); 
   } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }

  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarVinculacion = async (id) => { 
  if (window.confirm('¿Está seguro que desea eliminar la Vinculacion?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 

      if (response.status == 200) {
        setAlert('La Vinculacion ha sido eliminada exitosamente.'); 
        obtenerVinculaciones(); 
         } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }
     


    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedVinculacion((prevVinculacion) => ({ 
    ...prevVinculacion, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewVinculacion((prevVinculacion) => ({ 
    ...prevVinculacion, 
    [name]: value, 
  }));   }; 
 const blanquearModal = () => { setNewVinculacion({ 
nomvic:''

 }); return('ok'); }  
const insertarVinculacion = async () => { 
  console.log(newVinculacion); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ 
      vincpac:newVinculacion.vincpac,
      nomvic:newVinculacion.nomvic
 })  
    }); 
    const data = await response.json(); 
    
  
    if (response.status == 200) {
      setAlert('La Vinculacion ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerVinculaciones(); 
      } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }


  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaVinculaciones, setTablaVinculaciones]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaVinculaciones.filter((elemento)=>{ 
if ( elemento.nomvic.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setVinculaciones(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Vinculacion</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Vinculacion 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>vinculacion</th> 
<th>nombre</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {vinculacion.map((vinculacion) => ( 
        <tr> 
<td>{vinculacion.vincpac} </td> 
<td>{vinculacion.nomvic} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedVinculacion(vinculacion) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarVinculacion(vinculacion.vincpac)} 
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
      <Modal.Title>Editar Vinculacion</Modal.Title> 
    </Modal.Header> 

    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   
    <Modal.Body> 
 <Form> 
      <Form.Group controlId='formBasicNomvic'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nomvic' 
      value={selectedVinculacion.nomvic } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarVinculacion}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Vinculacion</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicVincpac'> 
		<Form.Label>Vinculacion</Form.Label> 
      <Form.Control 
      type='text' 
       name='vincpac' 
      value={newVinculacion.vincpac } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNomvic'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
       name='nomvic' 
      value={newVinculacion.nomvic } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarVinculacion}> 
    Agregar Vinculacion 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>
) } 
export default Vinculaciones