import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 


 const Usuarios = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [usuarios, setUsuarios] = useState([]); 
 const [selectedUsuarios, setSelectedUsuarios] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newUsuarios, setNewUsuarios] = useState({ 
      usuario:'', 
      nombre:'', 
      tipo:'', 
      codemp:'', 
      estado:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerUsuarios(); 
mapear_tipo(); 
mapear_codemp(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/usuarios/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerUsuarios = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setUsuarios(data.data); 
     setTablaUsuarios(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarUsuarios = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedUsuarios.usuario}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
        nombre:selectedUsuarios.nombre, 
        tipo:selectedUsuarios.tipo, 
        codemp:selectedUsuarios.codemp, 
        estado:selectedUsuarios.estado, 
 }) } ); 
const data = await response.json(); 
 if (response.status == 200) { 
setAlert('La Usuarios ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerUsuarios(); 
   obtenerUsuarios(); 
} else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarUsuarios = async (id) => { 
  if (window.confirm('�Esta seguro que desea eliminar la Usuarios?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Usuarios ha sido eliminada exitosamente.'); 
      obtenerUsuarios(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedUsuarios((prevUsuarios) => ({ 
    ...prevUsuarios, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewUsuarios((prevUsuarios) => ({ 
    ...prevUsuarios, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_tipo,setOpcionesTipo] = useState([]);  const[opciones_codemp,setOpcionesCodemp] = useState([]); 
 const mapear_tipo = async () =>{ try { 
  const listado = [{"id": "", "name": "Seleccione opcion"}, {"id": "I", "name": "Interno"}, {"id": "E", "name": "Empresa"}, {"id": "M,name", "Medico": "0"}];  
 const opciones = listado.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesTipo(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_codemp = async () =>{ try { 
  const response = await fetch(baseurlov + 'labempresa'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesCodemp(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewUsuarios({ 
      usuario:'', 
      nombre:'', 
      tipo:'', 
      codemp:'', 
      estado:'', 

 }); return('ok'); }  
const insertarUsuarios = async () => { 
  console.log(newUsuarios); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      usuario:newUsuarios.usuario,
      nombre:newUsuarios.nombre,
      tipo:newUsuarios.tipo,
      codemp:newUsuarios.codemp,
      estado:newUsuarios.estado,
 })  
    }); 
    const data = await response.json(); 
 if (response.status == 200) { 
    setAlert('El(La) Usuarios ha sido agregado(a) exitosamente.'); 
    setShowNewModal(false); 
const x = blanquearModal(); 
    obtenerUsuarios(); 
} else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaUsuarios, setTablaUsuarios]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{ 
if ( elemento.usuario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setUsuarios(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Usuarios</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Usuarios 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por  usuario nombre'  onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Usuario</th> 
<th>Nombre</th> 
<th>Tipo</th> 
<th>Empresa</th> 
<th>Activo</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {usuarios.map((usuario) => ( 
        <tr> 
        <td>{usuario.usuario} </td> 
        <td>{usuario.nombre} </td> 
        <td>{usuario.tipo} </td> 
        <td>{usuario.codemp} </td> 
        <td>{usuario.estado} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedUsuarios(usuario) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarUsuarios(usuario.usuario)} 
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
      <Modal.Title>Editar Usuarios</Modal.Title> 
    </Modal.Header> 
{alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible> 
{alert} 
</Alert>  )} 
     <Modal.Body> 
  <div class='container' > 
<div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Nombre</label> 
      <input 
      type='text' class='form-control' 
      name='nombre' 
      value={selectedUsuarios.nombre } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
<label for='lbl'>Tipo</label> 
 <select onChange={handleChange} class='col form-select form-select-sm' id='tipo'  name='tipo' value={selectedUsuarios.tipo} > {opciones_tipo} 
 </select>   </div> {/* fin campo */} 
 </div> {/* fin row */} 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Empresa</label> 
 <select onChange={handleChange} class='col form-select form-select-sm' id='codemp'  name='codemp' value={selectedUsuarios.codemp} > {opciones_codemp} 
 </select>   </div> {/* fin campo */} 
 <div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Activo</label> 
     <input type='checkbox' name='estado' checked={selectedUsuarios.estado=='S'?true:false} 
 onChange={handleChange} /> 
      </div> {/* fin campo */} 
      </div> {/* fin row ultimo */} 
      </div> {/* fin container mod */} 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarUsuarios}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)} size='xl'> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Usuarios</Modal.Title> 
    </Modal.Header> 
{alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible> 
{alert} 
</Alert>  )} 
     <Modal.Body> 
      <div class='container'> 
<div class='row'> 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Usuario</label> 
      <input 
      type='text'  class='form-control' 
      name='usuario' 
      value={newUsuarios.usuario } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Nombre</label> 
      <input 
      type='text'  class='form-control' 
      name='nombre' 
      value={newUsuarios.nombre } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
<label for='lbl'>Tipo</label> 
 <select onChange={handleNewChange} class='col form-select form-select-sm' id='tipo'  name='tipo' value={newUsuarios.tipo} > {opciones_tipo} 
 </select>   </div>  {/* fin campo */} 
 </div> {/* fin row */} 
<div class='row'> 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Empresa</label> 
 <select onChange={handleNewChange} class='col form-select form-select-sm' id='codemp'  name='codemp' value={newUsuarios.codemp} > {opciones_codemp} 
 </select>   </div>  {/* fin campo */} 
       <div class='col' > {/* 2  */} 
<label for='lbl'>Activo</label> 
 <input type='checkbox' name='estado' checked={newUsuarios.estado=='S'?true:false} 
 onChange={handleNewChange} /> 
      </div> {/* fin campo */}  
      </div> {/* fin row ultimo */} 
  </div> {/* fin container ins */} 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarUsuarios}> 
    Agregar Usuarios 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>


) } 
export default Usuarios