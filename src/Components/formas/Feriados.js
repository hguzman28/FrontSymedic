import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 


 const Feriados = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 

  const [feriados, setFeriados] = useState([]); 
 const [selectedFeriados, setSelectedFeriados] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newFeriados, setNewFeriados] = useState({ 
per:'',
fecha:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerFeriados(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/feriados/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 
 

 const obtenerFeriados = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setFeriados(data.data); 
     setTablaFeriados(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarFeriados = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedFeriados.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
per:selectedFeriados.per,
fecha:selectedFeriados.fecha
 }) } ); 
const data = await response.json(); 
   
   if (response.status == 200) {
    setAlert('La Feriados ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerFeriados(); 
     } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }

   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarFeriados = async (id) => { 
  if (window.confirm('¿Está seguro que desea eliminar la Feriados?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Feriados ha sido eliminada exitosamente.'); 
      obtenerFeriados(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedFeriados((prevFeriados) => ({ 
    ...prevFeriados, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewFeriados((prevFeriados) => ({ 
    ...prevFeriados, 
    [name]: value, 
  }));   }; 
 const blanquearModal = () => { setNewFeriados({ 
per:'',
fecha:''

 }); return('ok'); }  
const insertarFeriados = async () => { 
  console.log(newFeriados); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      id:newFeriados.id,
per:newFeriados.per,
fecha:newFeriados.fecha
 })  
    }); 
    const data = await response.json(); 
    if (response.status == 200) {
      setAlert('La Feriados ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerFeriados(); 
      } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }

  
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaFeriados, setTablaFeriados]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaFeriados.filter((elemento)=>{ 
if ( elemento.per.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setFeriados(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 

      <h1>Feriados</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Feriados 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>id</th> 
<th>Año</th> 
<th>fecha</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {feriados.map((feriado) => ( 
        <tr> 
<td>{feriado.id} </td> 
<td>{feriado.per} </td> 
<td>{feriado.fecha} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedFeriados(feriado) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarFeriados(feriado.id)} 
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
      <Modal.Title>Editar Feriados</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
 <Form> 
      <Form.Group controlId='formBasicPer'> 
		<Form.Label>Año</Form.Label> 
      <Form.Control 
      type='text' 
      name='per' 
      value={selectedFeriados.per } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicFecha'> 
		<Form.Label>Fecha</Form.Label> 
      <Form.Control 
      type='text' 
      name='fecha' 
      value={selectedFeriados.fecha } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarFeriados}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Feriados</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicId'> 
		<Form.Label>Id</Form.Label> 
      <Form.Control 
      type='text' 
       name='id' 
       disabled 
      value={newFeriados.id } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicPer'> 
		<Form.Label>Per</Form.Label> 
      <Form.Control 
      type='text' 
       name='per' 
      value={newFeriados.per } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicFecha'> 
		<Form.Label>Fecha</Form.Label> 
      <Form.Control 
      type='text' 
       name='fecha' 
      value={newFeriados.fecha } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarFeriados}> 
    Agregar Feriados 
  </Button> 
</Modal.Footer> 
</Modal> 

</> 
    ): ( <Navigate to="/login" /> )  }
    </>


) } 
export default Feriados