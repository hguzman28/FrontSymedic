import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 


//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Combos = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



 const [labcombo, setCombos] = useState([]); 
 const [selectedLabcombos, setSelectedLabcombos] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabcombos, setNewLabcombos] = useState({ 
nombre:'',
cdgexamen:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerCombos(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labcombo/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerCombos = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setCombos(data.data); 
     setTablaCombos(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabcombos = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabcombos.codcombo}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nombre:selectedLabcombos.nombre,
cdgexamen:selectedLabcombos.cdgexamen
 }) } ); 
const data = await response.json(); 
setAlert('La Labcombos ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerCombos(); 
   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabcombos = async (id) => { 
  if (window.confirm('¿Está seguro que desea eliminar la Labcombos?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Labcombos ha sido eliminada exitosamente.'); 
      obtenerCombos(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedLabcombos((prevLabcombos) => ({ 
    ...prevLabcombos, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabcombos((prevLabcombos) => ({ 
    ...prevLabcombos, 
    [name]: value, 
  }));   }; 
 const blanquearModal = () => { setNewLabcombos({ 
nombre:'',
cdgexamen:''

 }); return('ok'); }  
const insertarLabcombos = async () => { 
  console.log(newLabcombos); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ 
      codcombo:newLabcombos.codcombo,
      nombre:newLabcombos.nombre,
      cdgexamen:newLabcombos.cdgexamen
      })  
     }); 
    const data = await response.json(); 
      
    if (response.status == 200) {
      setAlert('El combo ha sido agregado exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerCombos();
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }
  
    } catch (error) { 
    setAlert( "Error invocando al servicio labcombos/insert " );
    console.error(error); }   
}; 
 // ******************** busquedas ****************************** 
const [tablaCombos, setTablaCombos]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaCombos.filter((elemento)=>{ 
if ( elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setCombos(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Combos de Examenes</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Labcombos 
      </Button> 
 <div > <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
 <div style={{overflowY:'scroll',height:'700px'}} >
      <Table striped bordered hover> 
      <thead> <tr> 
<th>codcombo</th> 
<th>nombre</th> 
<th>cdgexamen</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {labcombo.map((combo) => ( 
        <tr> 
<td>{combo.codcombo} </td> 
<td>{combo.nombre} </td> 
<td>{combo.cdgexamen} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabcombos(combo) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabcombos(combo.codcombo)} 
              className='btn btn-danger' > 
              Eliminar 
            </Button> 
          </td> 
        </tr> 
      ))} 
    </tbody> 
  </Table>
  </div> 
  <Modal show={showModal} onHide={() => setShowModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Editar Labcombos</Modal.Title> 
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
      value={selectedLabcombos.nombre } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Cdgexamen</Form.Label> 
      <Form.Control 
      type='text' 
      name='cdgexamen' 
      value={selectedLabcombos.cdgexamen } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabcombos}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Labcombos</Modal.Title> 
    </Modal.Header> 

    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}     


    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodcombo'> 
		<Form.Label>Codcombo</Form.Label> 
      <Form.Control 
      type='text' 
       name='codcombo' 
      value={newLabcombos.codcombo } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
       name='nombre' 
      value={newLabcombos.nombre } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Cdgexamen</Form.Label> 
      <Form.Control 
      type='text' 
       name='cdgexamen' 
      value={newLabcombos.cdgexamen } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabcombos}> 
    Agregar Labcombos 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) 

} 
export default Combos