import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 
//  START INLCUIR              
 import { Navigate  } from 'react-router-dom';       
  import { GetStatusLogin } from '../GetStatusLogin';  
 import { useContext } from 'react';                    
 import { AccountContext } from '../useContext/Account'; //  END INLCUIR  
  const Opciones = () => { 
//  START INLCUIR    
 const { status } = GetStatusLogin(); //Inlcuir  
 const { getUser,logout } = useContext(AccountContext); 
const user =  getUser();   
 const [opciones, setOpciones] = useState([]); 
 const [selectedOpciones, setSelectedOpciones] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newOpciones, setNewOpciones] = useState({ 
opcion:'', 
nombre:'', 
ruta:'', 
mostrar:'', 
orden:'', 
carpeta:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerOpciones(); 
 }, []); 
const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/opciones/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
//const baseurl = 'http://127.0.0.1:8000/opciones/'; 
//const baseurlov = 'http://127.0.0.1:8000/lov/'  
 const obtenerOpciones = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setOpciones(data.data); 
     setTablaOpciones(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarOpciones = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedOpciones.opcion}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nombre:selectedOpciones.nombre, 
ruta:selectedOpciones.ruta, 
mostrar:selectedOpciones.mostrar, 
orden:selectedOpciones.orden, 
carpeta:selectedOpciones.carpeta, 
 }) } ); 
const data = await response.json(); 
 if (response.status == 200) { 
setAlert('La Opciones ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerOpciones(); 
   obtenerOpciones(); 
} else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarOpciones = async (id) => { 
  if (window.confirm('�Esta seguro que desea eliminar la Opciones?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Opciones ha sido eliminada exitosamente.'); 
      obtenerOpciones(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedOpciones((prevOpciones) => ({ 
    ...prevOpciones, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewOpciones((prevOpciones) => ({ 
    ...prevOpciones, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const blanquearModal = () => { setNewOpciones({ 
opcion:'', 
nombre:'', 
ruta:'', 
mostrar:'', 
orden:'', 
carpeta:'', 

 }); return('ok'); }  
const insertarOpciones = async () => { 
  console.log(newOpciones); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      opcion:newOpciones.opcion,
nombre:newOpciones.nombre,
ruta:newOpciones.ruta,
mostrar:newOpciones.mostrar,
orden:newOpciones.orden,
carpeta:newOpciones.carpeta,
 })  
    }); 
    const data = await response.json(); 
 if (response.status == 200) { 
    setAlert('El(La) Opciones ha sido agregado(a) exitosamente.'); 
    setShowNewModal(false); 
const x = blanquearModal(); 
    obtenerOpciones(); 
} else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaOpciones, setTablaOpciones]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaOpciones.filter((elemento)=>{ 
if ( elemento.opcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.carpeta.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setOpciones(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
 <> { user && user.username ? ( <>  
      <h1>Opciones</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Opciones 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por  opcion nombre carpeta'  onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Opcion</th> 
<th>Nombre</th> 
<th>Ruta</th> 
<th>Mostrar</th> 
<th>Orden</th> 
<th>Carpeta</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {opciones.map((opcion) => ( 
        <tr> 
<td>{opcion.opcion} </td> 
<td>{opcion.nombre} </td> 
<td>{opcion.ruta} </td> 
<td>{opcion.mostrar} </td> 
<td>{opcion.orden} </td> 
<td>{opcion.carpeta} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedOpciones(opcion) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarOpciones(opcion.opcion)} 
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
      <Modal.Title>Editar Opciones</Modal.Title> 
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
      value={selectedOpciones.nombre } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Ruta</label> 
      <input 
      type='text' class='form-control' 
      name='ruta' 
      value={selectedOpciones.ruta } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
<div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Mostrar</label> 
     <input type='checkbox' name='mostrar' checked={selectedOpciones.mostrar=='S'?true:false} 
 onChange={handleChange} /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Orden</label> 
      <input 
      type='text' class='form-control' 
      name='orden' 
      value={selectedOpciones.orden } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
<div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Carpeta</label> 
      <input 
      type='text' class='form-control' 
      name='carpeta' 
      value={selectedOpciones.carpeta } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 

      </div> {/* fin row ultimo */} 
      </div> {/* fin container mod */} 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarOpciones}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)} size='xl'> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Opciones</Modal.Title> 
    </Modal.Header> 
{alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible> 
{alert} 
</Alert>  )} 
     <Modal.Body> 
      <div class='container'> 
<div class='row'> 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Opcion</label> 
      <input 
      type='text'  class='form-control' 
      name='opcion' 
      value={newOpciones.opcion } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Nombre</label> 
      <input 
      type='text'  class='form-control' 
      name='nombre' 
      value={newOpciones.nombre } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
<div class='row'> 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Ruta</label> 
      <input 
      type='text'  class='form-control' 
      name='ruta' 
      value={newOpciones.ruta } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Mostrar</label> 
 <input type='checkbox' name='mostrar' checked={newOpciones.mostrar=='S'?true:false} 
 onChange={handleNewChange} /> 
      </div> {/* fin campo */}  
</div> {/* fin row */} 
<div class='row'> 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Orden</label> 
      <input 
      type='text'  class='form-control' 
      name='orden' 
      value={newOpciones.orden } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Carpeta</label> 
      <input 
      type='text'  class='form-control' 
      name='carpeta' 
      value={newOpciones.carpeta } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 

      </div> {/* fin row ultimo */} 
  </div> {/* fin container ins */} 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarOpciones}> 
    Agregar Opciones 
  </Button> 
</Modal.Footer> 
</Modal> 
 </> ): ( <Navigate to='/login' /> )  }   
</> ); }; 
export default Opciones