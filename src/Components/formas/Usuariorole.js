import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Usuariorole = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [usuariorole, setUsuariorole] = useState([]); 
 const [selectedUsuariorole, setSelectedUsuariorole] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newUsuariorole, setNewUsuariorole] = useState({ 
id:'', 
usuario:'', 
role:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerUsuariorole(); 
mapear_usuario(); 
mapear_role(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/usuariorole/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 
 const obtenerUsuariorole = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setUsuariorole(data.data); 
     setTablaUsuariorole(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarUsuariorole = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedUsuariorole.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
usuario:selectedUsuariorole.usuario, 
role:selectedUsuariorole.role, 
 }) } ); 
const data = await response.json(); 
 if (response.status == 200) { 
setAlert('La Usuariorole ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerUsuariorole(); 
   obtenerUsuariorole(); 
} else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarUsuariorole = async (id) => { 
  if (window.confirm('�Esta seguro que desea eliminar la Usuariorole?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Usuariorole ha sido eliminada exitosamente.'); 
      obtenerUsuariorole(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedUsuariorole((prevUsuariorole) => ({ 
    ...prevUsuariorole, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewUsuariorole((prevUsuariorole) => ({ 
    ...prevUsuariorole, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_usuario,setOpcionesUsuario] = useState([]);  const[opciones_role,setOpcionesRole] = useState([]); 
 const mapear_usuario = async () =>{ try { 
  const response = await fetch(baseurlov + 'usuario'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesUsuario(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_role = async () =>{ try { 
  const response = await fetch(baseurlov + 'roles'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesRole(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewUsuariorole({ 
id:'', 
usuario:'', 
role:'', 

 }); return('ok'); }  
const insertarUsuariorole = async () => { 
  console.log(newUsuariorole); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      usuario:newUsuariorole.usuario,
role:newUsuariorole.role,
 })  
    }); 
    const data = await response.json(); 
 if (response.status == 200) { 
    setAlert('El(La) Usuario-Roles ha sido agregado(a) exitosamente.'); 
    setShowNewModal(false); 
const x = blanquearModal(); 
    obtenerUsuariorole(); 
} else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaUsuariorole, setTablaUsuariorole]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaUsuariorole.filter((elemento)=>{ 
if ( elemento.usuario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.role.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setUsuariorole(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Usuario-Roles</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Usuario-Roles 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por  usuario role'  onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Usuario</th> 
<th>Role</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {usuariorole.map((usuariorole) => ( 
        <tr> 
<td>{usuariorole.usuario} </td> 
<td>{usuariorole.role} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedUsuariorole(usuariorole) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarUsuariorole(usuariorole.id)} 
              className='btn btn-danger' > 
              Eliminar 
            </Button> 
          </td> 
        </tr> 
      ))} 
    </tbody> 
  </Table> 
  <Modal show={showModal} onHide={() => setShowModal(false)} size='xl' >  
    <Modal.Header closeButton> 
      <Modal.Title>Editar Usuario-Roles</Modal.Title> 
    </Modal.Header> 
{alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible> 
{alert} 
</Alert>  )} 
     <Modal.Body> 
  <div class='container' > 
<div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Usuario</label> 
 <select onChange={handleChange} class='col form-select form-select-sm' id='usuario'  name='usuario' value={selectedUsuariorole.usuario} > {opciones_usuario} 
 </select>   </div> {/* fin campo */} 
 </div> {/* fin row */} 
 <div class='row'>
      <div class='col' > {/* 1  */} 
<label for='lbl'>Role</label> 
 <select onChange={handleChange} class='col form-select form-select-sm' id='role'  name='role' value={selectedUsuariorole.role} > {opciones_role} 
 </select>   </div> {/* fin campo */} 
       </div> {/* fin row ultimo */} 
      </div> {/* fin container mod */} 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarUsuariorole}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)} size='xl'> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Usuario-Roles</Modal.Title> 
    </Modal.Header> 
{alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible> 
{alert} 
</Alert>  )} 
     <Modal.Body> 
      <div class='container'> 
      <div class='row'>
      <div class='col' > {/* 2  */} 
<label for='lbl'>Usuario</label> 
 <select onChange={handleNewChange} class='col form-select form-select-sm' id='usuario'  name='usuario' value={newUsuariorole.usuario} > {opciones_usuario} 
 </select>   </div>  {/* fin campo */} 
 </div> {/* fin row */} 
<div class='row'> 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Role</label> 
 <select onChange={handleNewChange} class='col form-select form-select-sm' id='role'  name='role' value={newUsuariorole.role} > {opciones_role} 
 </select>   </div>  {/* fin campo */} 
       </div> {/* fin row ultimo */} 
  </div> {/* fin container ins */} 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarUsuariorole}> 
    Agregar Usuariorole 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>


) } 
export default Usuariorole