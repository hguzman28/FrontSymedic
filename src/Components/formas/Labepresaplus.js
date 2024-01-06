import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Labepresaplus = () => {
  
 //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


 

 const [labepresaplus, setLabepresaplus] = useState([]); 
 const [selectedLabepresaplus, setSelectedLabepresaplus] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabepresaplus, setNewLabepresaplus] = useState({ 
codemp:'', 
imagen:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabepresaplus(); 
mapear_codemp(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labepresaplus/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerLabepresaplus = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLabepresaplus(data.data); 
     setTablaLabepresaplus(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabepresaplus = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabepresaplus.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
codemp:selectedLabepresaplus.codemp, 
imagen:selectedLabepresaplus.imagen, 
 }) } ); 
const data = await response.json(); 
setAlert('La Labepresaplus ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerLabepresaplus(); 
   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabepresaplus = async (id) => { 
  if (window.confirm('�Esta seguro que desea eliminar la Labepresaplus?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Labepresaplus ha sido eliminada exitosamente.'); 
      obtenerLabepresaplus(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedLabepresaplus((prevLabepresaplus) => ({ 
    ...prevLabepresaplus, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabepresaplus((prevLabepresaplus) => ({ 
    ...prevLabepresaplus, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_codemp,setOpcionesCodemp] = useState([]); 
 const mapear_codemp = async () =>{ try { 
  const response = await fetch(baseurlov + 'labempresa'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesCodemp(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewLabepresaplus({ 
codemp:'', 
imagen:'', 

 }); return('ok'); }  
const insertarLabepresaplus = async () => { 
  console.log(newLabepresaplus); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codemp:newLabepresaplus.codemp,
imagen:newLabepresaplus.imagen
 })  
    }); 
    const data = await response.json(); 
    setAlert('La Labepresaplus ha sido agregada exitosamente.'); 
    setShowNewModal(false); 
const x = blanquearModal(); 
    obtenerLabepresaplus(); 
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaLabepresaplus, setTablaLabepresaplus]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLabepresaplus.filter((elemento)=>{ 
if ( elemento.codemp.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLabepresaplus(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <> 
      <h1>Adicionales Empresas</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Adicionales Empresas 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Empresa</th> 
<th>Membrete</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {labepresaplus.map((labepresaplus) => ( 
        <tr> 
<td>{labepresaplus.codemp} </td> 
<td>{labepresaplus.imagen} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabepresaplus(labepresaplus) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabepresaplus(labepresaplus.id)} 
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
      <Modal.Title>Editar Adicionales Empresas</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
 <Form> 
    <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Empresa</Form.Label> 
 <select onChange={handleChange} className='form-control' id='codemp'  name='codemp' value={selectedLabepresaplus.codemp} > {opciones_codemp} 
 </select>   </Form.Group>  
     <Form.Group controlId='formBasicImagen'> 
		<Form.Label>Membrete</Form.Label> 
      <Form.Control 
      type='text' 
      name='imagen' 
      value={selectedLabepresaplus.imagen } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabepresaplus}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Adicionales Empresas</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Empresa</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='codemp'  name='codemp' value={newLabepresaplus.codemp} > {opciones_codemp} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicImagen'> 
		<Form.Label>Membrete</Form.Label> 
      <Form.Control 
      type='text' 
      name='imagen' 
      value={newLabepresaplus.imagen } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabepresaplus}> 
    Agregar Labepresaplus 
  </Button> 
</Modal.Footer> 
</Modal> 
</> ) } 
export default Labepresaplus