import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Labnormal = (props) => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


 const [labnormal, setLabnormal] = useState([]); 
 const [selectedLabnormal, setSelectedLabnormal] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabnormal, setNewLabnormal] = useState({ 
id:'', 
cons:'', 
cdgexamen:'', 
cdganalisis:'', 
edadmin:'', 
edadmax:'', 
sexo:'', 
tecnica:'', 
resultado:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabnormal(); 
   mapear_sexo(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labnormal/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 const obtenerLabnormal = async () => { 
   try { 
     const response = await fetch(baseurl+'select/'+props.miexamen+'/'+props.mianalisis); 
     const data = await response.json(); 
     setLabnormal(data.data); 
     setTablaLabnormal(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabnormal = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabnormal.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
        cons:selectedLabnormal.cons, 
        cdgexamen:selectedLabnormal.cdgexamen, 
        cdganalisis:selectedLabnormal.cdganalisis, 
        edadmin:selectedLabnormal.edadmin, 
        edadmax:selectedLabnormal.edadmax, 
        sexo:selectedLabnormal.sexo, 
        tecnica:selectedLabnormal.tecnica, 
        resultado:selectedLabnormal.resultado, 
 }) } ); 
const data = await response.json(); 
 if (response.status == 200) { 
setAlert('La Labnormal ha sido actualizada exitosamente.'); 
   setShowModal(false); 
   obtenerLabnormal(); 
   obtenerLabnormal(); 
} else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}   } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabnormal = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la Labnormal?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La normal ha sido eliminada exitosamente.'); 
      obtenerLabnormal(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedLabnormal((prevLabnormal) => ({ 
    ...prevLabnormal, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabnormal((prevLabnormal) => ({ 
    ...prevLabnormal, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_sexo,setOpcionesSexo] = useState([]); 
 const mapear_sexo = async () =>{ try { 
  const listado = [{"id": "", "name": "Seleccione opcion"}, {"id": "M", "name": "Masculino"}, {"id": "F", "name": "Femenino"}];  
 const opciones = listado.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesSexo(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewLabnormal({ 
        id:'', 
        cons:'', 
        cdgexamen:'', 
        cdganalisis:'', 
        edadmin:'', 
        edadmax:'', 
        sexo:'', 
        tecnica:'', 
        resultado:'', 

 }); return('ok'); }  
const insertarLabnormal = async () => { 
  console.log(newLabnormal); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      cons:newLabnormal.cons,
      cdgexamen:newLabnormal.cdgexamen,
      cdganalisis:newLabnormal.cdganalisis,
      edadmin:newLabnormal.edadmin,
      edadmax:newLabnormal.edadmax,
      sexo:newLabnormal.sexo,
      tecnica:newLabnormal.tecnica,
      resultado:newLabnormal.resultado,
 })  
    }); 
    const data = await response.json(); 
      if (response.status == 200) { 
          setAlert('El(La) Valores_Normales ha sido agregado(a) exitosamente.'); 
          setShowNewModal(false); 
      const x = blanquearModal(); 
          obtenerLabnormal(); 
      } else if (response.status == 400) {setAlert(data.detail);} else {setAlert('Error desconocido');}  } catch (error) { 
          console.error(error); 
        }   }; 
      // ******************** busquedas ****************************** 
      const [tablaLabnormal, setTablaLabnormal]= useState([]); 
      const [busqueda, setBusqueda]= useState(); 
      const handleChangeFinder=e=>{ 
        setBusqueda(e.target.value); 
        filtrar(e.target.value);   } 
      const filtrar=(terminoBusqueda)=>{ 
      var resultadosBusqueda=tablaLabnormal.filter((elemento)=>{ 
      if ( elemento.resultado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
      )  { return elemento;} 
      }); 
setLabnormal(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
        <h3>
        Valores Normales de {props.miexamen}. {props.mititulo} - {props.mianalisis}
      </h3>
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Valores_Normales 
      </Button> 

      <Button onClick={() => props.retornar2('')} className="mb-3">
        Regresar a Analisis
      </Button>

 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por  resultado'  onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
      <th>Consec</th> 
      <th>Examen</th> 
      <th>Analisis</th> 
      <th>Edadmin</th> 
      <th>Edadmax</th> 
      <th>Sexo</th> 
      <th>Tecnica</th> 
      <th>Resultado</th> 
        <th>Acciones</th> 
            </tr></thead> 
          <tbody> 
            {labnormal.map((labnormal) => ( 
              <tr> 
      <td>{labnormal.cons} </td> 
      <td>{labnormal.cdgexamen} </td> 
      <td>{labnormal.cdganalisis} </td> 
      <td>{labnormal.edadmin} </td> 
      <td>{labnormal.edadmax} </td> 
      <td>{labnormal.sexo} </td> 
      <td>{labnormal.tecnica} </td> 
      <td>{labnormal.resultado} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabnormal(labnormal) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabnormal(labnormal.id)} 
              className='btn btn-danger' > 
              Eliminar 
            </Button> 
          </td> 
        </tr> 
      ))} 
    </tbody> 
  </Table> 
  <Modal show={showModal} onHide={() => setShowModal(false)} size='xl' >  
    <Modal.Header closeButton> 
      <Modal.Title>Editar Valores_Normales</Modal.Title> 
    </Modal.Header> 
{alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible> 
{alert} 
</Alert>  )} 
     <Modal.Body> 
  <div class='container' > 
<div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Consec</label> 
      <input 
      type='text' class='form-control' 
      name='cons' 
      value={selectedLabnormal.cons } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
<label for='lbl'>Examen</label> 
      <input 
      type='text' class='form-control' 
      name='cdgexamen'
      disabled 
      value={props.miexamen} 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Analisis</label> 
      <input 
      type='text' class='form-control' 
      name='cdganalisis' 
      disabled 
      value={props.mianalisis} 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
<div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Edadmin</label> 
      <input 
      type='text' class='form-control' 
      name='edadmin' 
      value={selectedLabnormal.edadmin } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
<label for='lbl'>Edadmax</label> 
      <input 
      type='text' class='form-control' 
      name='edadmax' 
      value={selectedLabnormal.edadmax } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Sexo</label> 
 <select onChange={handleChange} class='col form-select form-select-sm' id='sexo'  name='sexo' value={selectedLabnormal.sexo} > {opciones_sexo} 
 </select>   </div> {/* fin campo */} 
 <div class='row'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Tecnica</label> 
      <input 
      type='text' class='form-control' 
      name='tecnica' 
      value={selectedLabnormal.tecnica } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
      <label for='lbl'>Resultado</label> 
      <input 
      type='text' class='form-control' 
      name='resultado' 
      value={selectedLabnormal.resultado } 
      onChange={handleChange} 
       /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
     
      </div> {/* fin container mod */} 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabnormal}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)} size='xl'> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Valores_Normales</Modal.Title> 
    </Modal.Header> 
{alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible> 
{alert} 
</Alert>  )} 
     <Modal.Body> 
      <div class='container'> 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Consec</label> 
      <input 
      type='text'  class='form-control' 
      name='cons' 
      value={newLabnormal.cons } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
<label for='lbl'>Examen</label> 
      <input 
      type='text'  class='form-control' 
      name='cdgexamen' 
      value={props.miexamen} 
      onChange={handleNewChange} 
      disabled 
       /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
<div class='row'> 
      <div class='col' > {/* 1  */} 
<label for='lbl'>Analisis</label> 
      <input 
      type='text'  class='form-control' 
      name='cdganalisis' 
      value={props.mianalisis } 
      onChange={handleNewChange} 
      disabled 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 2  */} 
<label for='lbl'>Edadmin</label> 
      <input 
      type='text'  class='form-control' 
      name='edadmin' 
      value={newLabnormal.edadmin } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
<label for='lbl'>Edadmax</label> 
      <input 
      type='text'  class='form-control' 
      name='edadmax' 
      value={newLabnormal.edadmax } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
</div> {/* fin row */} 
<div class='row'> 
      <div class='col' > {/* 1  */} 
    <label for='lbl'>Sexo</label> 
    <select onChange={handleNewChange} class='col form-select form-select-sm' id='sexo'  name='sexo' value={newLabnormal.sexo} > {opciones_sexo} 
    </select>   
     </div>  {/* fin campo */} 
       <div class='col' > {/* 2  */} 
     <label for='lbl'>Tecnica</label> 
      <input 
      type='text'  class='form-control' 
      name='tecnica' 
      value={newLabnormal.tecnica } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
      <div class='col' > {/* 3  */} 
      <label for='lbl'>Resultado</label> 
      <input 
      type='text'  class='form-control' 
      name='resultado' 
      value={newLabnormal.resultado } 
      onChange={handleNewChange} 
       /> 
      </div> {/* fin campo */} 
     
      </div> {/* fin row ultimo */} 
  
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabnormal}> 
    Agregar Labnormal 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Labnormal