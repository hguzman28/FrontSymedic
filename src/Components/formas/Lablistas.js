import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Lablistas = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [lablistas, setLablistas] = useState([]); 
 const [selectedLablistas, setSelectedLablistas] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLablistas, setNewLablistas] = useState({ 
nombre:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLablistas(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/lablistas/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

const obtenerLablistas = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLablistas(data.data); 
     setTablaLablistas(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLablistas = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLablistas.codlista}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nombre:selectedLablistas.nombre
 }) } ); 
const data = await response.json(); 
  
   if (response.status == 200) {
    setAlert('La lista ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerLablistas();
  } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }
   
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLablistas = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la listas?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      

      if (response.status == 200) {
        setAlert('La Lablistas ha sido eliminada exitosamente.'); 
        obtenerLablistas(); 
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
  setSelectedLablistas((prevLablistas) => ({ 
    ...prevLablistas, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLablistas((prevLablistas) => ({ 
    ...prevLablistas, 
    [name]: value, 
  }));   }; 
 const blanquearModal = () => { setNewLablistas({ 
nombre:''

 }); return('ok'); }  
const insertarLablistas = async () => { 
  console.log(newLablistas); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ 
      codlista:newLablistas.codlista,
      nombre:newLablistas.nombre
 })  
    }); 
    const data = await response.json(); 
   

    if (response.status == 200) {
      setAlert('La Lablistas ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerLablistas();
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    } 
   
  
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaLablistas, setTablaLablistas]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLablistas.filter((elemento)=>{ 
if ( elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLablistas(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Listas de precio</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar listas 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>codlista</th> 
<th>nombre</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {lablistas.map((lablista) => ( 
        <tr> 
<td>{lablista.codlista} </td> 
<td>{lablista.nombre} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLablistas(lablista) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLablistas(lablista.codlista)} 
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
      <Modal.Title>Editar Lablistas</Modal.Title> 
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
      value={selectedLablistas.nombre } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLablistas}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Lablistas</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Cdgexamen</Form.Label> 
      <Form.Control 
      type='text' 
       name='codlista' 
      value={newLablistas.codlista } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
       name='nombre' 
      value={newLablistas.nombre } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLablistas}> 
    Agregar Lablistas 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>
 

) } 
export default Lablistas