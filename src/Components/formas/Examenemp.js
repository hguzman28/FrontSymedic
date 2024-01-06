import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 


 const Examenemps = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [examenemp, setExamenemps] = useState([]); 
 const [selectedExamenemp, setSelectedExamenemp] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newExamenemp, setNewExamenemp] = useState({ 
codemp:'',
cdgexamen:'',
descc:'',
nivel:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerExamenemps(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/examenemp/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerExamenemps = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setExamenemps(data.data); 
     setTablaExamenemps(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarExamenemp = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedExamenemp.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
codemp:selectedExamenemp.codemp,
cdgexamen:selectedExamenemp.cdgexamen,
descc:selectedExamenemp.descc,
nivel:selectedExamenemp.nivel
 }) } ); 
const data = await response.json(); 
   

   
   if (response.status == 200) {
    setAlert('El registro ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerExamenemps(); 
   } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }  

  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarExamenemp = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la Examenemp?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 

      
      if (response.status == 200) {
        setAlert('El registro ha sido eliminada exitosamente.'); 
        obtenerExamenemps();
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
  setSelectedExamenemp((prevExamenemp) => ({ 
    ...prevExamenemp, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewExamenemp((prevExamenemp) => ({ 
    ...prevExamenemp, 
    [name]: value, 
  }));   }; 
 const blanquearModal = () => { setNewExamenemp({ 
codemp:'',
cdgexamen:'',
descc:'',
nivel:''

 }); return('ok'); }  
const insertarExamenemp = async () => { 
  console.log(newExamenemp); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      id:newExamenemp.id,
codemp:newExamenemp.codemp,
cdgexamen:newExamenemp.cdgexamen,
descc:newExamenemp.descc,
nivel:newExamenemp.nivel
 })  
    }); 
    const data = await response.json(); 
  
    if (response.status == 200) {
      setAlert('El registro ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerExamenemps();
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }  

  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaExamenemps, setTablaExamenemps]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaExamenemps.filter((elemento)=>{ 
if ( elemento.codemp.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
// || elemento.cdgexamen.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setExamenemps(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Examenes por Empresa</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Examenemp 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por empresa,examen' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>id</th> 
<th>Empresa</th> 
<th>Examen</th> 
<th>descuntoc</th> 
<th>nivel</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {examenemp.map((examenemp) => ( 
        <tr> 
<td>{examenemp.id} </td> 
<td>{examenemp.codemp} </td> 
<td>{examenemp.cdgexamen} </td> 
<td>{examenemp.descc} </td> 
<td>{examenemp.nivel} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedExamenemp(examenemp) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarExamenemp(examenemp.id)} 
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
      <Modal.Title>Editar Examenemp</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
 <Form> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Empresa</Form.Label> 
      <Form.Control 
      type='text' 
      name='codemp' 
      value={selectedExamenemp.codemp } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Examen</Form.Label> 
      <Form.Control 
      type='text' 
      name='cdgexamen' 
      value={selectedExamenemp.cdgexamen } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Descuento</Form.Label> 
      <Form.Control 
      type='text' 
      name='descc' 
      value={selectedExamenemp.descc } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nivel</Form.Label> 
      <Form.Control 
      type='text' 
      name='nivel' 
      value={selectedExamenemp.nivel } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarExamenemp}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Examenemp</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Id</Form.Label> 
      <Form.Control 
      type='text' 
       name='id' 
      value={newExamenemp.id } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Empresa</Form.Label> 
      <Form.Control 
      type='text' 
       name='codemp' 
      value={newExamenemp.codemp } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Examen</Form.Label> 
      <Form.Control 
      type='text' 
       name='cdgexamen' 
      value={newExamenemp.cdgexamen } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Descuento</Form.Label> 
      <Form.Control 
      type='text' 
       name='descc' 
      value={newExamenemp.descc } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nivel</Form.Label> 
      <Form.Control 
      type='text' 
       name='nivel' 
      value={newExamenemp.nivel } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarExamenemp}> 
    Agregar Examenemp 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Examenemps