import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Labdepends = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [labdepend, setLabdepends] = useState([]); 
 const [selectedLabdepend, setSelectedLabdepend] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabdepend, setNewLabdepend] = useState({ 
codemp:'',
coddep:'',
nombre:'',
desc0:'',
pyp:'',
nofac:'',
domi:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabdepends(); 
 }, []); 

const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labdepend/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerLabdepends = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLabdepends(data.data); 
     setTablaLabdepends(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabdepend = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabdepend.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
codemp:selectedLabdepend.codemp,
coddep:selectedLabdepend.coddep,
nombre:selectedLabdepend.nombre,
desc0:selectedLabdepend.desc0,
pyp:selectedLabdepend.pyp,
nofac:selectedLabdepend.nofac,
domi:selectedLabdepend.domi
 }) } ); 
const data = await response.json(); 
   
   
   if (response.status == 200) {
    setAlert('El registro ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerLabdepends(); 
 
  } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }

  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabdepend = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar el registro ?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 

    
      if (response.status == 200) {
        setAlert('El registro sido eliminado exitosamente.'); 
        obtenerLabdepends(); 
       
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
  setSelectedLabdepend((prevLabdepend) => ({ 
    ...prevLabdepend, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabdepend((prevLabdepend) => ({ 
    ...prevLabdepend, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const blanquearModal = () => { setNewLabdepend({ 
codemp:'',
coddep:'',
nombre:'',
desc0:'',
pyp:'',
nofac:'',
domi:''

 }); return('ok'); }  
const insertarLabdepend = async () => { 
  console.log(newLabdepend); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      id:newLabdepend.id,
codemp:newLabdepend.codemp,
coddep:newLabdepend.coddep,
nombre:newLabdepend.nombre,
desc0:newLabdepend.desc0,
pyp:newLabdepend.pyp,
nofac:newLabdepend.nofac,
domi:newLabdepend.domi
 })  
    }); 
    const data = await response.json(); 
  
  
    if (response.status == 200) {
      setAlert('La Labdepend ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerLabdepends(); 
  
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }
  
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaLabdepends, setTablaLabdepends]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLabdepends.filter((elemento)=>{ 
if ( elemento.codemp.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLabdepends(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Dependencias por Empresa</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Dependencias por Empresa 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>id</th> 
<th>codemp</th> 
<th>coddep</th> 
<th>nombre</th> 
<th>desc0</th> 
<th>pyp</th> 
<th>nofac</th> 
<th>domi</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {labdepend.map((labdepend) => ( 
        <tr> 
<td>{labdepend.id} </td> 
<td>{labdepend.codemp} </td> 
<td>{labdepend.coddep} </td> 
<td>{labdepend.nombre} </td> 
<td>{labdepend.desc0} </td> 
<td>{labdepend.pyp} </td> 
<td>{labdepend.nofac} </td> 
<td>{labdepend.domi} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabdepend(labdepend) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabdepend(labdepend.id)} 
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
      <Modal.Title>Editar Dependencias por Empresa</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   
    <Modal.Body> 
 <Form> 
      <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Codemp</Form.Label> 
      <Form.Control 
      type='text' 
      name='codemp' 
      value={selectedLabdepend.codemp } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCoddep'> 
		<Form.Label>Coddep</Form.Label> 
      <Form.Control 
      type='text' 
      name='coddep' 
      value={selectedLabdepend.coddep } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nombre' 
      value={selectedLabdepend.nombre } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDesc0'> 
		<Form.Label>Desc0</Form.Label> 
      <Form.Control 
      type='text' 
      name='desc0' 
      value={selectedLabdepend.desc0 } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicPyp'> 
		<Form.Label>Promocion y prevencion</Form.Label> 
 <input type='checkbox' name='pyp' checked={selectedLabdepend.pyp=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNofac'> 
		<Form.Label>No facturar</Form.Label> 
 <input type='checkbox' name='nofac' checked={selectedLabdepend.nofac=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDomi'> 
		<Form.Label>Domicilio</Form.Label> 
 <input type='checkbox' name='domi' checked={selectedLabdepend.domi=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabdepend}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Dependencias por Empresa</Modal.Title> 
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
      value={newLabdepend.id } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Codemp</Form.Label> 
      <Form.Control 
      type='text' 
      name='codemp' 
      value={newLabdepend.codemp } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCoddep'> 
		<Form.Label>Coddep</Form.Label> 
      <Form.Control 
      type='text' 
      name='coddep' 
      value={newLabdepend.coddep } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nombre' 
      value={newLabdepend.nombre } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDesc0'> 
		<Form.Label>Desc0</Form.Label> 
      <Form.Control 
      type='text' 
      name='desc0' 
      value={newLabdepend.desc0 } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicPyp'> 
		<Form.Label>Promocion y prevencion</Form.Label> 
 <input type='checkbox' classname='form-check-input' name='pyp' checked={newLabdepend.pyp=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNofac'> 
		<Form.Label>No facturar</Form.Label> 
 <input type='checkbox' name='nofac' checked={newLabdepend.nofac=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDomi'> 
		<Form.Label>Domicilio</Form.Label> 
 <input type='checkbox' name='domi' checked={newLabdepend.domi=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabdepend}> 
    Agregar Labdepend 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Labdepends