import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Medicos = () => { 

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 



  const [medicos, setMedicos] = useState([]); 
 const [selectedMedicos, setSelectedMedicos] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newMedicos, setNewMedicos] = useState({ 
nommedico:'',
ccmedico:'',
espmedico:'',
perfil:'',
celular:'',
tel:'',
ciudad:'',
codundnegocio:'',
usuario:'',
firma:'',
presentacion:''
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerMedicos(); 
mapear_espmedico(); 
mapear_codundnegocio(); 
mapear_usuario(); 
 }, []); 
 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/medicos/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
  
 const obtenerMedicos = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setMedicos(data.data); 
     setTablaMedicos(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarMedicos = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedMedicos.codmedico}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nommedico:selectedMedicos.nommedico,
ccmedico:selectedMedicos.ccmedico,
espmedico:selectedMedicos.espmedico,
perfil:selectedMedicos.perfil,
celular:selectedMedicos.celular,
tel:selectedMedicos.tel,
ciudad:selectedMedicos.ciudad,
codundnegocio:selectedMedicos.codundnegocio,
usuario:selectedMedicos.usuario,
firma:selectedMedicos.firma,
presentacion:selectedMedicos.presentacion
 }) } ); 
const data = await response.json(); 
   
   
   
   if (response.status == 200) {
    setAlert('La Medicos ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerMedicos(); 
     
  } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }

  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarMedicos = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la Medicos?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 


      if (response.status == 200) {
        setAlert('La Medicos ha sido eliminada exitosamente.'); 
        obtenerMedicos(); 
           
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
  setSelectedMedicos((prevMedicos) => ({ 
    ...prevMedicos, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewMedicos((prevMedicos) => ({ 
    ...prevMedicos, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_espmedico,setOpcionesEspmedico] = useState([]);  const[opciones_codundnegocio,setOpcionesCodundnegocio] = useState([]);  const[opciones_usuario,setOpcionesUsuario] = useState([]); 
 const mapear_espmedico = async () =>{ try { 
  const response = await fetch(baseurlov + 'especialidad'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesEspmedico(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_codundnegocio = async () =>{ try { 
  const response = await fetch(baseurlov + 'unegocio'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesCodundnegocio(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_usuario = async () =>{ try { 
  const response = await fetch(baseurlov + 'usuario'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesUsuario(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewMedicos({ 
nommedico:'',
ccmedico:'',
espmedico:'',
perfil:'',
celular:'',
tel:'',
ciudad:'',
codundnegocio:'',
usuario:'',
firma:'',
presentacion:''

 }); return('ok'); }  
const insertarMedicos = async () => { 
  console.log(newMedicos); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codmedico:newMedicos.codmedico,
nommedico:newMedicos.nommedico,
ccmedico:newMedicos.ccmedico,
espmedico:newMedicos.espmedico,
perfil:newMedicos.perfil,
celular:newMedicos.celular,
tel:newMedicos.tel,
ciudad:newMedicos.ciudad,
codundnegocio:newMedicos.codundnegocio,
usuario:newMedicos.usuario,
firma:newMedicos.firma,
presentacion:newMedicos.presentacion
 })  
    }); 
    const data = await response.json(); 
    
  

    if (response.status == 200) {
      setAlert('La Medicos ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerMedicos(); 
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }

  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaMedicos, setTablaMedicos]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaMedicos.filter((elemento)=>{ 
if ( elemento.nommedico.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setMedicos(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 

      <h1>Medicos</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Medicos 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>codmedico</th> 
<th>nommedico</th> 
<th>ccmedico</th> 
<th>espmedico</th> 
<th>perfil</th> 
<th>celular</th> 
<th>tel</th> 
<th>ciudad</th> 
<th>codundnegocio</th> 
<th>usuario</th> 
<th>firma</th> 
<th>presentacion</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {medicos.map((madico) => ( 
        <tr> 
<td>{madico.codmedico} </td> 
<td>{madico.nommedico} </td> 
<td>{madico.ccmedico} </td> 
<td>{madico.espmedico} </td> 
<td>{madico.perfil} </td> 
<td>{madico.celular} </td> 
<td>{madico.tel} </td> 
<td>{madico.ciudad} </td> 
<td>{madico.codundnegocio} </td> 
<td>{madico.usuario} </td> 
<td>{madico.firma} </td> 
<td>{madico.presentacion} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedMedicos(madico) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarMedicos(madico.codmedico)} 
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
      <Modal.Title>Editar Medicos</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   


    <Modal.Body> 
 <Form> 
      <Form.Group controlId='formBasicNommedico'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nommedico' 
      value={selectedMedicos.nommedico } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCcmedico'> 
		<Form.Label>Identif</Form.Label> 
      <Form.Control 
      type='text' 
      name='ccmedico' 
      value={selectedMedicos.ccmedico } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicEspmedico'> 
		<Form.Label>Especialidad</Form.Label> 
 <select onChange={handleChange} className='form-control' id='espmedico'  name='espmedico' value={selectedMedicos.espmedico} > {opciones_espmedico} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicPerfil'> 
		<Form.Label>Perfil</Form.Label> 
      <Form.Control 
      type='text' 
      name='perfil' 
      value={selectedMedicos.perfil } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCelular'> 
		<Form.Label>Celular</Form.Label> 
      <Form.Control 
      type='text' 
      name='celular' 
      value={selectedMedicos.celular } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicTel'> 
		<Form.Label>Clase</Form.Label> 
      <Form.Control 
      type='text' 
      name='tel' 
      value={selectedMedicos.tel } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCiudad'> 
		<Form.Label>Ciudad</Form.Label> 
      <Form.Control 
      type='text' 
      name='ciudad' 
      value={selectedMedicos.ciudad } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodundnegocio'> 
		<Form.Label>UnidadNeg</Form.Label> 
 <select onChange={handleChange} className='form-control' id='codundnegocio'  name='codundnegocio' value={selectedMedicos.codundnegocio} > {opciones_codundnegocio} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicUsuario'> 
		<Form.Label>Usuario</Form.Label> 
 <select onChange={handleChange} className='form-control' id='usuario'  name='usuario' value={selectedMedicos.usuario} > {opciones_usuario} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicFirma'> 
		<Form.Label>Firma</Form.Label> 
      <Form.Control 
      type='text' 
      name='firma' 
      value={selectedMedicos.firma } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicPresentacion'> 
		<Form.Label>Presentacion</Form.Label> 
      <Form.Control 
      type='text' 
      name='presentacion' 
      value={selectedMedicos.presentacion } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarMedicos}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Medicos</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodmedico'> 
		<Form.Label>Codigo</Form.Label> 
      <Form.Control 
      type='text' 
      name='codmedico' 
      value={newMedicos.codmedico } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNommedico'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nommedico' 
      value={newMedicos.nommedico } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCcmedico'> 
		<Form.Label>Identif</Form.Label> 
      <Form.Control 
      type='text' 
      name='ccmedico' 
      value={newMedicos.ccmedico } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicEspmedico'> 
		<Form.Label>Especialidad</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='espmedico'  name='espmedico' value={newMedicos.espmedico} > {opciones_espmedico} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicPerfil'> 
		<Form.Label>Perfil</Form.Label> 
      <Form.Control 
      type='text' 
      name='perfil' 
      value={newMedicos.perfil } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCelular'> 
		<Form.Label>Celular</Form.Label> 
      <Form.Control 
      type='text' 
      name='celular' 
      value={newMedicos.celular } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicTel'> 
		<Form.Label>Clase</Form.Label> 
      <Form.Control 
      type='text' 
      name='tel' 
      value={newMedicos.tel } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCiudad'> 
		<Form.Label>Ciudad</Form.Label> 
      <Form.Control 
      type='text' 
      name='ciudad' 
      value={newMedicos.ciudad } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodundnegocio'> 
		<Form.Label>UnidadNeg</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='codundnegocio'  name='codundnegocio' value={newMedicos.codundnegocio} > {opciones_codundnegocio} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicUsuario'> 
		<Form.Label>Usuario</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='usuario'  name='usuario' value={newMedicos.usuario} > {opciones_usuario} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicFirma'> 
		<Form.Label>Firma</Form.Label> 
      <Form.Control 
      type='text' 
      name='firma' 
      value={newMedicos.firma } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicPresentacion'> 
		<Form.Label>Presentacion</Form.Label> 
      <Form.Control 
      type='text' 
      name='presentacion' 
      value={newMedicos.presentacion } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarMedicos}> 
    Agregar Medicos 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Medicos