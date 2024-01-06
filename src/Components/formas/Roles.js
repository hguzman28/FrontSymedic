import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Roles = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [roles, setRoles] = useState([]); 
 const [selectedRoles, setSelectedRoles] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newRoles, setNewRoles] = useState({ 
nombre:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerRoles(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/roles/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 


const obtenerRoles = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setRoles(data.data); 
     setTablaRoles(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarRoles = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedRoles.role}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nombre:selectedRoles.nombre, 
 }) } ); 
const data = await response.json(); 
   
   
   if (response.status == 200) {
    setAlert('La Roles ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerRoles(); 
   } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  } 

  
  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarRoles = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la Roles?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 

    
      if (response.status == 200) {
        setAlert('La Roles ha sido eliminada exitosamente.'); 
        obtenerRoles(); 
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
  setSelectedRoles((prevRoles) => ({ 
    ...prevRoles, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewRoles((prevRoles) => ({ 
    ...prevRoles, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const blanquearModal = () => { setNewRoles({ 
nombre:'', 

 }); return('ok'); }  
const insertarRoles = async () => { 
  console.log(newRoles); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      role:newRoles.role,
nombre:newRoles.nombre
 })  
    }); 
    const data = await response.json(); 
    
   
   
    if (response.status == 200) {
      setAlert('La Roles ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerRoles(); 
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    } 


  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaRoles, setTablaRoles]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaRoles.filter((elemento)=>{ 
if ( elemento.role.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setRoles(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Roles</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Roles 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Role</th> 
<th>Nombre</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {roles.map((rol) => ( 
        <tr> 
<td>{rol.role} </td> 
<td>{rol.nombre} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedRoles(rol) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarRoles(rol.role)} 
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
      <Modal.Title>Editar Roles</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
 <Form> 
    <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nombre' 
      value={selectedRoles.nombre } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarRoles}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Roles</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicRole'> 
		<Form.Label>Role</Form.Label> 
      <Form.Control 
      type='text' 
      name='role' 
      value={newRoles.role } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nombre' 
      value={newRoles.nombre } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarRoles}> 
    Agregar Roles 
  </Button> 
</Modal.Footer> 
</Modal> 

</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Roles