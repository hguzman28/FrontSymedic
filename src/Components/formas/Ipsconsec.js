import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Ipsconsec = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 




  const [ipsconsec, setIpsconsec] = useState([]); 
 const [selectedIpsconsec, setSelectedIpsconsec] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newIpsconsec, setNewIpsconsec] = useState({ 
docu:'', 
codage:'', 
num:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerIpsconsec(); 
mapear_codage(); 
 }, []);
 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/ipsconsec/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;  

 const obtenerIpsconsec = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setIpsconsec(data.data); 
     setTablaIpsconsec(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarIpsconsec = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedIpsconsec.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
docu:selectedIpsconsec.docu, 
codage:selectedIpsconsec.codage, 
num:selectedIpsconsec.num, 
 }) } ); 
const data = await response.json(); 
setAlert('La Ipsconsec ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerIpsconsec(); 
   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarIpsconsec = async (id) => { 
  if (window.confirm('�Esta seguro que desea eliminar la Ipsconsec?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Ipsconsec ha sido eliminada exitosamente.'); 
      obtenerIpsconsec(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedIpsconsec((prevIpsconsec) => ({ 
    ...prevIpsconsec, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewIpsconsec((prevIpsconsec) => ({ 
    ...prevIpsconsec, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_codage,setOpcionesCodage] = useState([]); 
 const mapear_codage = async () =>{ try { 
  const response = await fetch(baseurlov + 'agencia'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesCodage(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewIpsconsec({ 
docu:'', 
codage:'', 
num:'', 

 }); return('ok'); }  
const insertarIpsconsec = async () => { 
  console.log(newIpsconsec); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      docu:newIpsconsec.docu,
codage:newIpsconsec.codage,
num:newIpsconsec.num
 })  
    }); 
    const data = await response.json(); 
    setAlert('La Ipsconsec ha sido agregada exitosamente.'); 
    setShowNewModal(false); 
const x = blanquearModal(); 
    obtenerIpsconsec(); 
  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaIpsconsec, setTablaIpsconsec]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaIpsconsec.filter((elemento)=>{ 
if ( elemento.docu.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.codage.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setIpsconsec(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Consecutivos</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Consecutivos 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Id</th> 
<th>Documento</th> 
<th>Agencia</th> 
<th>Numero</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {ipsconsec.map((ipscons) => ( 
        <tr> 
<td>{ipscons.id} </td> 
<td>{ipscons.docu} </td> 
<td>{ipscons.codage} </td> 
<td>{ipscons.num} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedIpsconsec(ipscons) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarIpsconsec(ipscons.id)} 
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
      <Modal.Title>Editar Consecutivos</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
 <Form> 
    <Form.Group controlId='formBasicDocu'> 
		<Form.Label>Documento</Form.Label> 
      <Form.Control 
      type='text' 
      name='docu' 
      value={selectedIpsconsec.docu } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicCodage'> 
		<Form.Label>Agencia</Form.Label> 
 <select onChange={handleChange} className='form-control' id='codage'  name='codage' value={selectedIpsconsec.codage} > {opciones_codage} 
 </select>   </Form.Group>  
     <Form.Group controlId='formBasicNum'> 
		<Form.Label>Numero</Form.Label> 
      <Form.Control 
      type='text' 
      name='num' 
      value={selectedIpsconsec.num } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarIpsconsec}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Consecutivos</Modal.Title> 
    </Modal.Header> 
    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicDocu'> 
		<Form.Label>Documento</Form.Label> 
      <Form.Control 
      type='text' 
      name='docu' 
      value={newIpsconsec.docu } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodage'> 
		<Form.Label>Agencia</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='codage'  name='codage' value={newIpsconsec.codage} > {opciones_codage} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicNum'> 
		<Form.Label>Numero</Form.Label> 
      <Form.Control 
      type='text' 
      name='num' 
      value={newIpsconsec.num } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarIpsconsec}> 
    Agregar Ipsconsec 
  </Button> 
</Modal.Footer> 
</Modal> 

</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Ipsconsec