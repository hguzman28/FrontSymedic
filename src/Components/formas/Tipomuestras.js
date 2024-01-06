import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 


 const Tipomuestras = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 
 
 const [tipomuestra, setTipomuestras] = useState([]); 
 const [selectedTipomuestra, setSelectedTipomuestra] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newTipomuestra, setNewTipomuestra] = useState({ 
nombre:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerTipomuestras(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/tipomuestra/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;

 const obtenerTipomuestras = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setTipomuestras(data.data); 
     setTablaTipomuestras(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarTipomuestra = async () => { 

    let valok = 'SI';
    if (selectedTipomuestra.nombre == '')
    { setAlert('Debe diligenciar campo Nombre');
    
      valok = 'NO'; 
       }
    if (valok == 'SI'){

   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedTipomuestra.tipmues}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
         nombre:selectedTipomuestra.nombre  })  }
  ); 
const data = await response.json(); 
   
     
   if (response.status == 200) {
    setAlert('La Tipomuestra ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerTipomuestras(); 
     } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }

  
  
   } catch (error) { 
     console.error(error); 
   }   

   } // validacion  

   }; 
 const eliminarTipomuestra = async (id) => { 
  if (window.confirm('¿Está seguro que desea eliminar la Tipomuestra?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      

      if (response.status == 200) {
        setAlert('La Tipomuestra ha sido eliminada exitosamente.'); 
        obtenerTipomuestras(); 
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
  setSelectedTipomuestra((prevTipomuestra) => ({ 
    ...prevTipomuestra, 
    [name]: value 
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewTipomuestra((prevTipomuestra) => ({ 
    ...prevTipomuestra, 
    [name]: value, 
  }));   }; 

  const blanquearModal = () => {
    setNewTipomuestra({ 
        tipmues:'',
        nombre:''
         }); 
         return('ok');
}

const insertarTipomuestra = async () => { 

  //alert('va a insertar tipomuestra');
  let valok = 'SI';
  if (newTipomuestra.tipmues == '')
  { setAlert('Debe diligenciar campo tipo de muestra');
    valok = 'NO'; 
     }
  if (newTipomuestra.nombre == '')
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
      tipmues:newTipomuestra.tipmues,
       nombre:newTipomuestra.nombre  }) 
    }); 
    const data = await response.json(); 

  
    if (response.status == 200) {
      setAlert('La Tipomuestra ha sido agregada exitosamente.'); 
      const x = blanquearModal();
      setShowNewModal(false); 
      obtenerTipomuestras(); 
      } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }

  
  } catch (error) { 
    console.error(error); 
  }   

   } // validacion 

  }; 



 // ******************** busquedas ****************************** 
const [tablaTipomuestras, setTablaTipomuestras]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaTipomuestras.filter((elemento)=>{ 
if ( elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setTipomuestras(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <>  
      <h1>Tipos de Muestra</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Tipomuestra 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>tipmues</th> 
<th>nombre</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {tipomuestra.map((tipomuestra) => ( 
        <tr> 
<td>{tipomuestra.tipmues} </td> 
<td>{tipomuestra.nombre} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedTipomuestra(tipomuestra) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarTipomuestra(tipomuestra.tipmues)} 
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
      <Modal.Title>Editar Tipomuestra</Modal.Title> 
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
      value={selectedTipomuestra.nombre } 
      onChange={handleChange} 
       /> 
 </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarTipomuestra}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Tipomuestra</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicTipmues'> 
		<Form.Label>Tipmues</Form.Label> 
      <Form.Control 
      type='text' 
       name='tipmues' 
       value = {newTipomuestra.tipmues}
       onChange={handleNewChange} 
       /> 
 </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
       name='nombre' 
       value = {newTipomuestra.nombre}
       onChange={handleNewChange} 
       /> 
 </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarTipomuestra}> 
    Agregar Tipomuestra 
  </Button> 
  <Button variant='primary' onClick={blanquearModal}> 
    Limpiar 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </> ) } 
export default Tipomuestras