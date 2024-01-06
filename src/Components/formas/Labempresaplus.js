import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 
 const Labempresaplus = () => { 
 const [labempresaplus, setLabempresaplus] = useState([]); 
 const [selectedLabempresaplus, setSelectedLabempresaplus] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabempresaplus, setNewLabempresaplus] = useState({ 
codemp:'', 
imagen:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabempresaplus(); 
mapear_codemp(); 
 }, []); 
const baseurl = 'http://127.0.0.1:8000/labempresaplus/'; 
const baseurlov = 'http://127.0.0.1:8000/lov/'  
 const obtenerLabempresaplus = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLabempresaplus(data.data); 
     setTablaLabempresaplus(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabempresaplus = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabempresaplus.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
codemp:selectedLabempresaplus.codemp, 
imagen:selectedLabempresaplus.imagen, 
 }) } ); 
const data = await response.json(); 
   
   if (response.status == 200) {
    setAlert('La Labempresaplus ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerLabempresaplus(); 
    } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }
  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabempresaplus = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar el registro?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Labempresaplus ha sido eliminada exitosamente.'); 
      obtenerLabempresaplus(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedLabempresaplus((prevLabempresaplus) => ({ 
    ...prevLabempresaplus, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabempresaplus((prevLabempresaplus) => ({ 
    ...prevLabempresaplus, 
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
 const blanquearModal = () => { setNewLabempresaplus({ 
codemp:'', 
imagen:'', 

 }); return('ok'); }  
  const insertarLabempresaplus = async () => { 
  console.log(newLabempresaplus); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
     codemp:newLabempresaplus.codemp,
     imagen:newLabempresaplus.imagen
 })  
    }); 
    const data = await response.json(); 
    
  
    if (response.status == 200) {
      setAlert('El registro ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerLabempresaplus(); 
      } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }

  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaLabempresaplus, setTablaLabempresaplus]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLabempresaplus.filter((elemento)=>{ 
if ( elemento.codemp.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLabempresaplus(resultadosBusqueda);  } 
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
      {labempresaplus.map((labempresaplus) => ( 
        <tr> 
<td>{labempresaplus.codemp} </td> 
<td>{labempresaplus.imagen} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabempresaplus(labempresaplus) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabempresaplus(labempresaplus.id)} 
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
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   
    <Modal.Body> 
 <Form> 
    <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Empresa</Form.Label> 
 <select onChange={handleChange} className='form-control' id='codemp'  name='codemp' value={selectedLabempresaplus.codemp} > {opciones_codemp} 
 </select>   </Form.Group>  
     <Form.Group controlId='formBasicImagen'> 
		<Form.Label>Membrete</Form.Label> 
      <Form.Control 
      type='text' 
      name='imagen' 
      value={selectedLabempresaplus.imagen } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabempresaplus}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Adicionales Empresas</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Empresa</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='codemp'  name='codemp' value={newLabempresaplus.codemp} > {opciones_codemp} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicImagen'> 
		<Form.Label>Membrete</Form.Label> 
      <Form.Control 
      type='text' 
      name='imagen' 
      value={newLabempresaplus.imagen } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabempresaplus}> 
    Agregar Labempresaplus 
  </Button> 
</Modal.Footer> 
</Modal> 
</> ) } 
export default Labempresaplus