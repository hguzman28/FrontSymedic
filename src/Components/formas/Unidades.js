import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Unidades = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [mae_unid, setUnidades] = useState([]); 
 const [selectedUnidad, setSelectedUnidad] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newUnidad, setNewUnidad] = useState({ 
uni_desc:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerUnidades(); 
 }, []); 
 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/mae_unid/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 const obtenerUnidades = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setUnidades(data.data); 
     setTablaUnidades(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarUnidad = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedUnidad.codseccion}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
uni_desc:selectedUnidad.uni_desc
 }) } ); 
const data = await response.json(); 
setAlert('La Unidad ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerUnidades(); 
   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarUnidad = async (id) => { 
  if (window.confirm('¿Está seguro que desea eliminar la Unidad?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 

       
        if (response.status == 200) {
          setAlert('La Unidad ha sido eliminada exitosamente.'); 
          obtenerUnidades(); 
          
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
  setSelectedUnidad((prevUnidad) => ({ 
    ...prevUnidad, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewUnidad((prevUnidad) => ({ 
    ...prevUnidad, 
    [name]: value, 
  }));   }; 
const insertarUnidad = async () => { 
  console.log(newUnidad); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      uni_codi:newUnidad.uni_codi,
uni_desc:newUnidad.uni_desc
 })  
    }); 
    const data = await response.json(); 
     

    if (response.status == 200) {
      setAlert('La Unidad ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      obtenerUnidades(); 
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }



  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaUnidades, setTablaUnidades]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaUnidades.filter((elemento)=>{ 
if ( elemento.uni_desc.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setUnidades(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Unidad</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Unidad 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Unidad</th> 
<th>Descripcion</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {mae_unid.map((unidad) => ( 
        <tr> 
<td>{unidad.uni_codi} </td> 
<td>{unidad.uni_desc} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedUnidad(unidad) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarUnidad(unidad.codseccion)} 
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
      <Modal.Title>Editar Unidad</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
 <Form> 
      <Form.Group controlId='formBasicUni_desc'> 
		<Form.Label>Descripcion</Form.Label> 
      <Form.Control 
      type='text' 
      name='uni_desc' 
      value={selectedUnidad.uni_desc } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarUnidad}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Unidad</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicUni_codi'> 
		<Form.Label>Unidad</Form.Label> 
      <Form.Control 
      type='text' 
       name='uni_codi' 
      value={newUnidad.uni_codi } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicUni_desc'> 
		<Form.Label>Descripcion</Form.Label> 
      <Form.Control 
      type='text' 
       name='uni_desc' 
      value={newUnidad.uni_desc } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarUnidad}> 
    Agregar Unidad 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>


) } 
export default Unidades