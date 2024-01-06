import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Labvalores = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 




  const [labvalores, setLabvalores] = useState([]); 
 const [selectedLabvalores, setSelectedLabvalores] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabvalores, setNewLabvalores] = useState({ 
cdgexamen:'',
cdganalisis:'',
tecla:'',
resultado:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabvalores(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labvalores/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;  
  const obtenerLabvalores = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLabvalores(data.data); 
     setTablaLabvalores(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabvalores = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabvalores.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
cdgexamen:selectedLabvalores.cdgexamen,
cdganalisis:selectedLabvalores.cdganalisis,
tecla:selectedLabvalores.tecla,
resultado:selectedLabvalores.resultado
 }) } ); 
const data = await response.json(); 
   
    
  
   if (response.status == 200) {
    setAlert('El registro ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerLabvalores();
  } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }
  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabvalores = async (id) => { 
  if (window.confirm('¿Esta seguro que desea eliminar la Labvalores?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 


      if (response.status == 200) {
        setAlert('El registro ha sido eliminada exitosamente.'); 
        obtenerLabvalores(); 
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
  setSelectedLabvalores((prevLabvalores) => ({ 
    ...prevLabvalores, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabvalores((prevLabvalores) => ({ 
    ...prevLabvalores, 
    [name]: value, 
  }));   }; 
 const blanquearModal = () => { setNewLabvalores({ 
cdgexamen:'',
cdganalisis:'',
tecla:'',
resultado:''

 }); return('ok'); }  
const insertarLabvalores = async () => { 
  console.log(newLabvalores); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      id:newLabvalores.id,
cdgexamen:newLabvalores.cdgexamen,
cdganalisis:newLabvalores.cdganalisis,
tecla:newLabvalores.tecla,
resultado:newLabvalores.resultado
 })  
    }); 
    const data = await response.json(); 
    
     

    if (response.status == 200) {
      setAlert('El registro sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerLabvalores();
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }

  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaLabvalores, setTablaLabvalores]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLabvalores.filter((elemento)=>{ 
if ( elemento.cdganalisis.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLabvalores(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Valores de ayuda</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Labvalores 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>id</th> 
<th>cdgexamen</th> 
<th>cdganalisis</th> 
<th>tecla</th> 
<th>resultado</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {labvalores.map((labvalor) => ( 
        <tr> 
      <td>{labvalor.id} </td> 
      <td>{labvalor.cdgexamen} </td> 
      <td>{labvalor.cdganalisis} </td> 
      <td>{labvalor.tecla} </td> 
      <td>{labvalor.resultado} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabvalores(labvalor) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabvalores(labvalor.id)} 
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
      <Modal.Title>Editar Labvalores</Modal.Title> 
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
      name='cdgexamen' 
      value={selectedLabvalores.cdgexamen } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicCdganalisis'> 
		<Form.Label>Cdganalisis</Form.Label> 
      <Form.Control 
      type='text' 
      name='cdganalisis' 
      value={selectedLabvalores.cdganalisis } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicTecla'> 
		<Form.Label>Tecla</Form.Label> 
      <Form.Control 
      type='text' 
      name='tecla' 
      value={selectedLabvalores.tecla } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicResultado'> 
		<Form.Label>Resultado</Form.Label> 
      <Form.Control 
      type='text' 
      name='resultado' 
      value={selectedLabvalores.resultado } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabvalores}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Labvalores</Modal.Title> 
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
      value={newLabvalores.id } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Cdgexamen</Form.Label> 
      <Form.Control 
      type='text' 
       name='cdgexamen' 
      value={newLabvalores.cdgexamen } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicCdganalisis'> 
		<Form.Label>Cdganalisis</Form.Label> 
      <Form.Control 
      type='text' 
       name='cdganalisis' 
      value={newLabvalores.cdganalisis } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicTecla'> 
		<Form.Label>Tecla</Form.Label> 
      <Form.Control 
      type='text' 
       name='tecla' 
      value={newLabvalores.tecla } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicResultado'> 
		<Form.Label>Resultado</Form.Label> 
      <Form.Control 
      type='text' 
       name='resultado' 
      value={newLabvalores.resultado } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabvalores}> 
    Agregar Labvalores 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Labvalores