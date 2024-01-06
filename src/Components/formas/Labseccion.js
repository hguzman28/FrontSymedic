import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Labseccion = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [labseccion, setLabseccion] = useState([]); 
 const [selectedLabseccion, setSelectedLabseccion] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabseccion, setNewLabseccion] = useState({ 
nombre:'',
gruposeccion:'',
peso:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabseccion(); 
 }, []); 

const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labseccion/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerLabseccion = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLabseccion(data.data); 
     setTablaLabseccion(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabseccion = async () => { 

   let valok = 'SI';

    if (selectedLabseccion.nombre == '')
    { setAlert('Debe diligenciar campo Nombre');
      valok = 'NO'; 
       }
    if (valok == 'SI'){

   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabseccion.codseccion}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
        nombre:selectedLabseccion.nombre,
        gruposeccion:selectedLabseccion.gruposeccion,
        peso:selectedLabseccion.peso
        }) } ); 
      const data = await response.json(); 


      if (response.status == 200) {
        setAlert('La Seccion ha sido actualizada exitosamente.'); 
        setShowModal(false); 
        obtenerLabseccion(); 
          } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }
    

    } catch (error) { 
     console.error(error); 
   } }  }; 



   const eliminarLabseccion = async (id) => { 
  if (window.confirm('¿Está seguro que desea eliminar la Labseccion?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 


      if (response.status == 200) {
        setAlert('La Labseccion ha sido eliminada exitosamente.'); 
        obtenerLabseccion(); 
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
  setSelectedLabseccion((prevLabseccion) => ({ 
    ...prevLabseccion, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabseccion((prevLabseccion) => ({ 
    ...prevLabseccion, 
    [name]: value, 
  }));   }; 
const insertarLabseccion = async () => { 
  console.log(newLabseccion); 

  const valok = 'SI';
  if (newLabseccion.codseccion == '')
  { setAlert('Debe diligenciar campo codigo');
    valok = 'NO'; 
     }
  if (newLabseccion.nombre == '')
  { setAlert('Debe diligenciar campo Nombre');
    valok = 'NO'; 
     }
  if (valok == 'SI'){

  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codseccion:newLabseccion.codseccion,
nombre:newLabseccion.nombre,
gruposeccion:newLabseccion.gruposeccion,
peso:newLabseccion.peso
 })  
    }); 
    const data = await response.json(); 

  
    if (response.status == 200) {
      setAlert('La Seccion ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      obtenerLabseccion(); 
      } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }
  
  } catch (error) { 
    console.error(error); 
  }  } }; 
 // ******************** busquedas ****************************** 
const [tablaLabseccion, setTablaLabseccion]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLabseccion.filter((elemento)=>{ 
if ( elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLabseccion(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <>
      <h1>Secciones</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Labseccion 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>codigo</th> 
<th>nombre</th> 
<th>gruposeccion</th> 
<th>peso</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {labseccion.map((labseccion) => ( 
        <tr> 
<td>{labseccion.codseccion} </td> 
<td>{labseccion.nombre} </td> 
<td>{labseccion.gruposeccion} </td> 
<td>{labseccion.peso} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabseccion(labseccion) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabseccion(labseccion.codseccion)} 
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
      <Modal.Title>Editar Labseccion</Modal.Title> 
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
      value={selectedLabseccion.nombre } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicGruposeccion'> 
		<Form.Label>Gruposeccion</Form.Label> 
      <Form.Control 
      type='text' 
      name='gruposeccion' 
      value={selectedLabseccion.gruposeccion } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicPeso'> 
		<Form.Label>Peso</Form.Label> 
      <Form.Control 
      type='text' 
      name='peso' 
      value={selectedLabseccion.peso } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabseccion}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Labseccion</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodseccion'> 
		<Form.Label>Codigo</Form.Label> 
      <Form.Control 
      type='text' 
       name='codseccion' 
      value={newLabseccion.codseccion } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
       name='nombre' 
      value={newLabseccion.nombre } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicGruposeccion'> 
		<Form.Label>Gruposeccion</Form.Label> 
      <Form.Control 
      type='text' 
       name='gruposeccion' 
      value={newLabseccion.gruposeccion } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicPeso'> 
		<Form.Label>Peso</Form.Label> 
      <Form.Control 
      type='text' 
       name='peso' 
      value={newLabseccion.peso } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabseccion}> 
    Agregar Labseccion 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>


) } 
export default Labseccion