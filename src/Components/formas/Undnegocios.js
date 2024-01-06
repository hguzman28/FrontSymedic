import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 


//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 


 const Undnegocios = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 




  const [undnegocio, setUndnegocios] = useState([]); 
 const [selectedUndnegocios, setSelectedUndnegocios] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newUndnegocios, setNewUndnegocios] = useState({ 
nomundnegocio:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerUndnegocios(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/undnegocio/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;  

 const obtenerUndnegocios = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setUndnegocios(data.data); 
     setTablaUndnegocios(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarUndnegocios = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedUndnegocios.codundnegocio}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nomundnegocio:selectedUndnegocios.nomundnegocio
 }) } ); 
const data = await response.json(); 
setAlert('La Undnegocios ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerUndnegocios(); 
   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarUndnegocios = async (id) => { 
  if (window.confirm('¿Está seguro que desea eliminar la Undnegocios?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 

    
      
    if (response.status == 200) {
      setAlert('La Undnegocios ha sido eliminada exitosamente.'); 
      obtenerUndnegocios(); 
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
  setSelectedUndnegocios((prevUndnegocios) => ({ 
    ...prevUndnegocios, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewUndnegocios((prevUndnegocios) => ({ 
    ...prevUndnegocios, 
    [name]: value, 
  }));   }; 
 const blanquearModal = () => { setNewUndnegocios({ 
nomundnegocio:''

 }); return('ok'); }  
const insertarUndnegocios = async () => { 
  console.log(newUndnegocios); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codundnegocio:newUndnegocios.codundnegocio,
nomundnegocio:newUndnegocios.nomundnegocio
 })  
    }); 
    const data = await response.json(); 
    

    if (response.status == 200) {
      setAlert('La Undnegocios ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerUndnegocios();    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }

  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaUndnegocios, setTablaUndnegocios]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaUndnegocios.filter((elemento)=>{ 
if ( elemento.nomundnegocio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setUndnegocios(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Unidades de Negocio</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Undnegocios 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>codundnegocio</th> 
<th>nomundnegocio</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {undnegocio.map((unegocio) => ( 
        <tr> 
<td>{unegocio.codundnegocio} </td> 
<td>{unegocio.nomundnegocio} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedUndnegocios(unegocio) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarUndnegocios(unegocio.codundnegocio)} 
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
      <Modal.Title>Editar Undnegocios</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
    <Modal.Body> 
 <Form> 
      <Form.Group controlId='formBasicNomundnegocio'> 
		<Form.Label>Nomundnegocio</Form.Label> 
      <Form.Control 
      type='text' 
      name='nomundnegocio' 
      value={selectedUndnegocios.nomundnegocio } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarUndnegocios}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Undnegocios</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodundnegocio'> 
		<Form.Label>Codundnegocio</Form.Label> 
      <Form.Control 
      type='text' 
       name='codundnegocio' 
      value={newUndnegocios.codundnegocio } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNomundnegocio'> 
		<Form.Label>Nomundnegocio</Form.Label> 
      <Form.Control 
      type='text' 
       name='nomundnegocio' 
      value={newUndnegocios.nomundnegocio } 
      onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarUndnegocios}> 
    Agregar Undnegocios 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Undnegocios