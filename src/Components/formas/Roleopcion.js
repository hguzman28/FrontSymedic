import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Roleopcion = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [roleopcion, setRoleopcion] = useState([]); 
 const [selectedRoleopcion, setSelectedRoleopcion] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newRoleopcion, setNewRoleopcion] = useState({ 
    role:'', 
    opcion:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerRoleopcion(); 
mapear_role(); 
mapear_opcion(); 
 }, []); 


 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/roleopcion/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerRoleopcion = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setRoleopcion(data.data); 
     setTablaRoleopcion(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarRoleopcion = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedRoleopcion.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
       role:selectedRoleopcion.role, 
       opcion:selectedRoleopcion.opcion, 
 }) } ); 
const data = await response.json(); 
   
   
   if (response.status == 200) {
    setAlert('La Roleopcion ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerRoleopcion(); 
    
  } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }
  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarRoleopcion = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la Roleopcion?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      
      const data = await response.json(); 
       

      if (response.status == 200) {
        const data = await response.json(); 
        setAlert('La Roleopcion ha sido eliminada exitosamente.'); 
        obtenerRoleopcion(); 
          
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
  setSelectedRoleopcion((prevRoleopcion) => ({ 
    ...prevRoleopcion, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewRoleopcion((prevRoleopcion) => ({ 
    ...prevRoleopcion, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_role,setOpcionesRole] = useState([]);  const[opciones_opcion,setOpcionesOpcion] = useState([]); 
 const mapear_role = async () =>{ try { 
  const response = await fetch(baseurlov + 'role'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesRole(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_opcion = async () =>{ try { 
  const response = await fetch(baseurlov + 'opcion'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesOpcion(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewRoleopcion({ 
role:'', 
opcion:'', 

 }); return('ok'); }  
const insertarRoleopcion = async () => { 
  console.log(newRoleopcion); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      role:newRoleopcion.role,
opcion:newRoleopcion.opcion
 })  
    }); 
    const data = await response.json(); 
    
   
    if (response.status == 200) {
      setAlert('La Roleopcion ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerRoleopcion(); 
    
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }
  
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaRoleopcion, setTablaRoleopcion]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaRoleopcion.filter((elemento)=>{ 
if ( elemento.role.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.opcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setRoleopcion(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Opciones de Un Role</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Roleopcion 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Role</th> 
<th>Opcion</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {roleopcion.map((roleopcion) => ( 
        <tr> 
<td>{roleopcion.role} </td> 
<td>{roleopcion.opcion} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedRoleopcion(roleopcion) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarRoleopcion(roleopcion.id)} 
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
      <Modal.Title>Editar Roleopcion</Modal.Title> 
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
 <select onChange={handleChange} className='form-control' id='role'  name='role' value={selectedRoleopcion.role} > {opciones_role} 
 </select>   </Form.Group>  
     <Form.Group controlId='formBasicOpcion'> 
		<Form.Label>Opcion</Form.Label> 
 <select onChange={handleChange} className='form-control' id='opcion'  name='opcion' value={selectedRoleopcion.opcion} > {opciones_opcion} 
 </select>   </Form.Group>  
       </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarRoleopcion}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Roleopcion</Modal.Title> 
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
 <select onChange={handleNewChange} className='form-control' id='role'  name='role' value={newRoleopcion.role} > {opciones_role} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicOpcion'> 
		<Form.Label>Opcion</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='opcion'  name='opcion' value={newRoleopcion.opcion} > {opciones_opcion} 
 </select>   </Form.Group>  
   </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarRoleopcion}> 
    Agregar  
  </Button> 
</Modal.Footer> 
</Modal> 

</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Roleopcion