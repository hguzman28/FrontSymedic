import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Labempresas = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


   const [labempresa, setLabempresas] = useState([]); 
 const [selectedLabempresa, setSelectedLabempresa] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false); 
 const [newLabempresa, setNewLabempresa] = useState({ 
nombre:'',
n_ide:'',
dir:'',
tel:'',
ciudad:'',
codcla:'',
codlista:'',
desce:'',
codadm:'',
itemsfac:'',
codcob:'',
contacto:'',
fax:'',
coddep:'',
ciclofac:'',
repbono:'',
repcumo:'',
repcopa:'',
repdesc:'',
repmode:'',
inactiva:'',
informacion:'',
nithelisa:'',
codlista2:'',
requisitos:'',
ccosto:'',
codempt:'',
prefijorip:'',
digitosfac:'',
tipcon:'',
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabempresas(); 
mapear_ciudad(); 
mapear_codcla(); 
mapear_codlista(); 
mapear_tipcon(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labempresa/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 


 const obtenerLabempresas = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLabempresas(data.data); 
     setTablaLabempresas(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 
const actualizarLabempresa = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabempresa.codemp}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
       body: JSON.stringify({ 
nombre:selectedLabempresa.nombre,
n_ide:selectedLabempresa.n_ide,
dir:selectedLabempresa.dir,
tel:selectedLabempresa.tel,
ciudad:selectedLabempresa.ciudad,
codcla:selectedLabempresa.codcla,
codlista:selectedLabempresa.codlista,
desce:selectedLabempresa.desce,
codadm:selectedLabempresa.codadm,
itemsfac:selectedLabempresa.itemsfac,
codcob:selectedLabempresa.codcob,
contacto:selectedLabempresa.contacto,
fax:selectedLabempresa.fax,
coddep:selectedLabempresa.coddep,
ciclofac:selectedLabempresa.ciclofac,
repbono:selectedLabempresa.repbono,
repcumo:selectedLabempresa.repcumo,
repcopa:selectedLabempresa.repcopa,
repdesc:selectedLabempresa.repdesc,
repmode:selectedLabempresa.repmode,
inactiva:selectedLabempresa.inactiva,
informacion:selectedLabempresa.informacion,
nithelisa:selectedLabempresa.nithelisa,
codlista2:selectedLabempresa.codlista2,
requisitos:selectedLabempresa.requisitos,
ccosto:selectedLabempresa.ccosto,
codempt:selectedLabempresa.codempt,
prefijorip:selectedLabempresa.prefijorip,
digitosfac:selectedLabempresa.digitosfac,
tipcon:selectedLabempresa.tipcon,
 }) } ); 

   const data = await response.json(); 

   if (response.status == 200) {
      setAlert('La Labempresa ha sido actualizada exitosamente.'); 
      setShowModal(false); 
      obtenerLabempresas(); 
   } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    } 

} catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabempresa = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar la Labempresa?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 
      setAlert('La Labempresa ha sido eliminada exitosamente.'); 
      obtenerLabempresas(); 
    } catch (error) {  
      console.error(error); 
    }   }   }; 
const handleChange = (event) => { 
  const { name, value } = event.target; 
  setSelectedLabempresa((prevLabempresa) => ({ 
    ...prevLabempresa, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabempresa((prevLabempresa) => ({ 
    ...prevLabempresa, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const[opciones_ciudad,setOpcionesCiudad] = useState([]);  const[opciones_codcla,setOpcionesCodcla] = useState([]);  const[opciones_codlista,setOpcionesCodlista] = useState([]);  const[opciones_tipcon,setOpcionesTipcon] = useState([]); 
 const mapear_ciudad = async () =>{ try { 
  const response = await fetch(baseurlov + 'ciudad'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesCiudad(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_codcla = async () =>{ try { 
  const response = await fetch(baseurlov + 'claseemp'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesCodcla(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_codlista = async () =>{ try { 
  const response = await fetch(baseurlov + 'lista'); 
 const data = await response.json(); 
 const opciones = data.data.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesCodlista(opciones); 
 } catch (error) {  
 console.error(error); }  } 

 const mapear_tipcon = async () =>{ try { 
  const listado = [{"id": "", "name": "Seleccione opcion"},{"id": "E", "name": "Evento"}, {"id": "C", "name": "Capitado"}];  
 const opciones = listado.map((obj) => (  
 <option key={obj.id} value={obj.id}> 
   {obj.name}  
 </option> )); 
 setOpcionesTipcon(opciones); 
 } catch (error) {  
 console.error(error); }  } 
 const blanquearModal = () => { setNewLabempresa({ 
nombre:'',
n_ide:'',
dir:'',
tel:'',
ciudad:'',
codcla:'',
codlista:'',
desce:'',
codadm:'',
itemsfac:'',
codcob:'',
contacto:'',
fax:'',
coddep:'',
ciclofac:'',
repbono:'',
repcumo:'',
repcopa:'',
repdesc:'',
repmode:'',
inactiva:'',
informacion:'',
nithelisa:'',
codlista2:'',
requisitos:'',
ccosto:'',
codempt:'',
prefijorip:'',
digitosfac:'',
tipcon:'',

 }); return('ok'); }  
const insertarLabempresa = async () => { 
  console.log(newLabempresa); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codemp:newLabempresa.codemp,
nombre:newLabempresa.nombre,
n_ide:newLabempresa.n_ide,
dir:newLabempresa.dir,
tel:newLabempresa.tel,
ciudad:newLabempresa.ciudad,
codcla:newLabempresa.codcla,
codlista:newLabempresa.codlista,
desce:newLabempresa.desce,
codadm:newLabempresa.codadm,
itemsfac:newLabempresa.itemsfac,
codcob:newLabempresa.codcob,
contacto:newLabempresa.contacto,
fax:newLabempresa.fax,
coddep:newLabempresa.coddep,
ciclofac:newLabempresa.ciclofac,
repbono:newLabempresa.repbono,
repcumo:newLabempresa.repcumo,
repcopa:newLabempresa.repcopa,
repdesc:newLabempresa.repdesc,
repmode:newLabempresa.repmode,
inactiva:newLabempresa.inactiva,
informacion:newLabempresa.informacion,
nithelisa:newLabempresa.nithelisa,
codlista2:newLabempresa.codlista2,
requisitos:newLabempresa.requisitos,
ccosto:newLabempresa.ccosto,
codempt:newLabempresa.codempt,
prefijorip:newLabempresa.prefijorip,
digitosfac:newLabempresa.digitosfac,
tipcon:newLabempresa.tipcon
 })  
    }); 
    const data = await response.json();
  
    if (response.status == 200) {
      setAlert('La Labempresa ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerLabempresas(); 
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }
 

   } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaLabempresas, setTablaLabempresas]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLabempresas.filter((elemento)=>{ 
if ( elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLabempresas(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
   <>
   { user && user.username ? ( 
   <> 
      <h1>Empresas</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Empresas 
      </Button> 
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>codemp</th> 
<th>nombre</th> 
<th>n_ide</th> 
<th>dir</th> 
<th>tel</th> 
<th>ciudad</th> 
<th>codcla</th> 
<th>codlista</th> 
<th>desce</th> 
<th>codadm</th> 
<th>itemsfac</th> 
<th>codcob</th> 
<th>contacto</th> 

	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {labempresa.map((labempresa) => ( 
        <tr> 
<td>{labempresa.codemp} </td> 
<td>{labempresa.nombre} </td> 
<td>{labempresa.n_ide} </td> 
<td>{labempresa.dir} </td> 
<td>{labempresa.tel} </td> 
<td>{labempresa.ciudad} </td> 
<td>{labempresa.codcla} </td> 
<td>{labempresa.codlista} </td> 
<td>{labempresa.desce} </td> 
<td>{labempresa.codadm} </td> 
<td>{labempresa.itemsfac} </td> 
<td>{labempresa.codcob} </td> 
<td>{labempresa.contacto} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabempresa(labempresa) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            <Button 
              onClick={() => eliminarLabempresa(labempresa.codemp)} 
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
      <Modal.Title>Editar Empresas</Modal.Title> 
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
      value={selectedLabempresa.nombre } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicN_ide'> 
		<Form.Label>Nit</Form.Label> 
      <Form.Control 
      type='text' 
      name='n_ide' 
      value={selectedLabempresa.n_ide } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDir'> 
		<Form.Label>Dir</Form.Label> 
      <Form.Control 
      type='text' 
      name='dir' 
      value={selectedLabempresa.dir } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicTel'> 
		<Form.Label>Tel</Form.Label> 
      <Form.Control 
      type='text' 
      name='tel' 
      value={selectedLabempresa.tel } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCiudad'> 
		<Form.Label>Ciudad</Form.Label> 
 <select onChange={handleChange} className='form-control' id='ciudad'  name='ciudad' value={selectedLabempresa.ciudad} > {opciones_ciudad} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicCodcla'> 
		<Form.Label>Clase</Form.Label> 
 <select onChange={handleChange} className='form-control' id='codcla'  name='codcla' value={selectedLabempresa.codcla} > {opciones_codcla} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicCodlista'> 
		<Form.Label>Codlista</Form.Label> 
 <select onChange={handleChange} className='form-control' id='codlista'  name='codlista' value={selectedLabempresa.codlista} > {opciones_codlista} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicDesce'> 
		<Form.Label>Desce</Form.Label> 
      <Form.Control 
      type='text' 
      name='desce' 
      value={selectedLabempresa.desce } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodadm'> 
		<Form.Label>Administradora</Form.Label> 
      <Form.Control 
      type='text' 
      name='codadm' 
      value={selectedLabempresa.codadm } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicItemsfac'> 
		<Form.Label>Itemsfac</Form.Label> 
      <Form.Control 
      type='text' 
      name='itemsfac' 
      value={selectedLabempresa.itemsfac } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodcob'> 
		<Form.Label>Codcob</Form.Label> 
      <Form.Control 
      type='text' 
      name='codcob' 
      value={selectedLabempresa.codcob } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicContacto'> 
		<Form.Label>Contacto</Form.Label> 
      <Form.Control 
      type='text' 
      name='contacto' 
      value={selectedLabempresa.contacto } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicFax'> 
		<Form.Label>Fax</Form.Label> 
      <Form.Control 
      type='text' 
      name='fax' 
      value={selectedLabempresa.fax } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCoddep'> 
		<Form.Label>Coddep</Form.Label> 
      <Form.Control 
      type='text' 
      name='coddep' 
      value={selectedLabempresa.coddep } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCiclofac'> 
		<Form.Label>Ciclofac</Form.Label> 
      <Form.Control 
      type='text' 
      name='ciclofac' 
      value={selectedLabempresa.ciclofac } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepbono' > 
		<Form.Label>Rep Bono</Form.Label> 
 <input type='checkbox' name='repbono' checked={selectedLabempresa.repbono=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepcumo'> 
		<Form.Label>Rep CuotaM</Form.Label> 
 <input type='checkbox' name='repcumo' checked={selectedLabempresa.repcumo=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepcopa'> 
		<Form.Label>Rep Copago</Form.Label> 
 <input type='checkbox' name='repcopa' checked={selectedLabempresa.repcopa=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepdesc'> 
		<Form.Label>Rep desc.</Form.Label> 
 <input type='checkbox' name='repdesc' checked={selectedLabempresa.repdesc=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepmode'> 
		<Form.Label>Rep </Form.Label> 
 <input type='checkbox' name='repmode' checked={selectedLabempresa.repmode=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicInactiva'> 
		<Form.Label>Inactiva</Form.Label> 
 <input type='checkbox' name='inactiva' checked={selectedLabempresa.inactiva=='S'?true:false} 
 onChange={handleChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicInformacion'> 
		<Form.Label>Informacion</Form.Label> 
      <Form.Control 
      type='text' 
      name='informacion' 
      value={selectedLabempresa.informacion } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNithelisa'> 
		<Form.Label>Nit contable</Form.Label> 
      <Form.Control 
      type='text' 
      name='nithelisa' 
      value={selectedLabempresa.nithelisa } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodlista2'> 
		<Form.Label>Lista 2</Form.Label> 
      <Form.Control 
      type='text' 
      name='codlista2' 
      value={selectedLabempresa.codlista2 } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRequisitos'> 
		<Form.Label>Requisitos</Form.Label> 
      <Form.Control 
      type='text' 
      name='requisitos' 
      value={selectedLabempresa.requisitos } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCcosto'> 
		<Form.Label>Ccosto</Form.Label> 
      <Form.Control 
      type='text' 
      name='ccosto' 
      value={selectedLabempresa.ccosto } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodempt'> 
		<Form.Label>Codempt</Form.Label> 
      <Form.Control 
      type='text' 
      name='codempt' 
      value={selectedLabempresa.codempt } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicPrefijorip'> 
		<Form.Label>Prefijorip</Form.Label> 
      <Form.Control 
      type='text' 
      name='prefijorip' 
      value={selectedLabempresa.prefijorip } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDigitosfac'> 
		<Form.Label>Digitosfac</Form.Label> 
      <Form.Control 
      type='text' 
      name='digitosfac' 
      value={selectedLabempresa.digitosfac } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicTipcon'> 
		<Form.Label>Tipo Contrato</Form.Label> 
 <select onChange={handleChange} className='form-control' id='tipcon'  name='tipcon' value={selectedLabempresa.tipcon} > {opciones_tipcon} 
 </select>   </Form.Group>  
       </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabempresa}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Empresas</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodemp'> 
		<Form.Label>Codigo</Form.Label> 
      <Form.Control 
      type='text' 
      name='codemp' 
      value={newLabempresa.codemp } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNombre'> 
		<Form.Label>Nombre</Form.Label> 
      <Form.Control 
      type='text' 
      name='nombre' 
      value={newLabempresa.nombre } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicN_ide'> 
		<Form.Label>Nit</Form.Label> 
      <Form.Control 
      type='text' 
      name='n_ide' 
      value={newLabempresa.n_ide } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDir'> 
		<Form.Label>Dir</Form.Label> 
      <Form.Control 
      type='text' 
      name='dir' 
      value={newLabempresa.dir } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicTel'> 
		<Form.Label>Tel</Form.Label> 
      <Form.Control 
      type='text' 
      name='tel' 
      value={newLabempresa.tel } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCiudad'> 
		<Form.Label>Ciudad</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='ciudad'  name='ciudad' value={newLabempresa.ciudad} > {opciones_ciudad} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicCodcla'> 
		<Form.Label>Clase</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='codcla'  name='codcla' value={newLabempresa.codcla} > {opciones_codcla} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicCodlista'> 
		<Form.Label>Codlista</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='codlista'  name='codlista' value={newLabempresa.codlista} > {opciones_codlista} 
 </select>   </Form.Group>  
       <Form.Group controlId='formBasicDesce'> 
		<Form.Label>Desce</Form.Label> 
      <Form.Control 
      type='text' 
      name='desce' 
      value={newLabempresa.desce } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodadm'> 
		<Form.Label>Administradora</Form.Label> 
      <Form.Control 
      type='text' 
      name='codadm' 
      value={newLabempresa.codadm } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicItemsfac'> 
		<Form.Label>Itemsfac</Form.Label> 
      <Form.Control 
      type='text' 
      name='itemsfac' 
      value={newLabempresa.itemsfac } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodcob'> 
		<Form.Label>Codcob</Form.Label> 
      <Form.Control 
      type='text' 
      name='codcob' 
      value={newLabempresa.codcob } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicContacto'> 
		<Form.Label>Contacto</Form.Label> 
      <Form.Control 
      type='text' 
      name='contacto' 
      value={newLabempresa.contacto } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicFax'> 
		<Form.Label>Fax</Form.Label> 
      <Form.Control 
      type='text' 
      name='fax' 
      value={newLabempresa.fax } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCoddep'> 
		<Form.Label>Coddep</Form.Label> 
      <Form.Control 
      type='text' 
      name='coddep' 
      value={newLabempresa.coddep } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCiclofac'> 
		<Form.Label>Ciclofac</Form.Label> 
      <Form.Control 
      type='text' 
      name='ciclofac' 
      value={newLabempresa.ciclofac } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepbono'> 
		<Form.Label>Rep Bono</Form.Label> 
 <input type='checkbox' name='repbono' checked={newLabempresa.repbono=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepcumo'> 
		<Form.Label>Rep CuotaM</Form.Label> 
 <input type='checkbox' name='repcumo' checked={newLabempresa.repcumo=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepcopa'> 
		<Form.Label>Rep Copago</Form.Label> 
 <input type='checkbox' name='repcopa' checked={newLabempresa.repcopa=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepdesc'> 
		<Form.Label>Rep desc.</Form.Label> 
 <input type='checkbox' name='repdesc' checked={newLabempresa.repdesc=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRepmode'> 
		<Form.Label>Rep </Form.Label> 
 <input type='checkbox' name='repmode' checked={newLabempresa.repmode=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicInactiva'> 
		<Form.Label>Inactiva</Form.Label> 
 <input type='checkbox' name='inactiva' checked={newLabempresa.inactiva=='S'?true:false} 
 onChange={handleNewChange} /> 
      </Form.Group> 
      <Form.Group controlId='formBasicInformacion'> 
		<Form.Label>Informacion</Form.Label> 
      <Form.Control 
      type='text' 
      name='informacion' 
      value={newLabempresa.informacion } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicNithelisa'> 
		<Form.Label>Nit contable</Form.Label> 
      <Form.Control 
      type='text' 
      name='nithelisa' 
      value={newLabempresa.nithelisa } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodlista2'> 
		<Form.Label>Lista 2</Form.Label> 
      <Form.Control 
      type='text' 
      name='codlista2' 
      value={newLabempresa.codlista2 } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicRequisitos'> 
		<Form.Label>Requisitos</Form.Label> 
      <Form.Control 
      type='text' 
      name='requisitos' 
      value={newLabempresa.requisitos } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCcosto'> 
		<Form.Label>Ccosto</Form.Label> 
      <Form.Control 
      type='text' 
      name='ccosto' 
      value={newLabempresa.ccosto } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCodempt'> 
		<Form.Label>Codempt</Form.Label> 
      <Form.Control 
      type='text' 
      name='codempt' 
      value={newLabempresa.codempt } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicPrefijorip'> 
		<Form.Label>Prefijorip</Form.Label> 
      <Form.Control 
      type='text' 
      name='prefijorip' 
      value={newLabempresa.prefijorip } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicDigitosfac'> 
		<Form.Label>Digitosfac</Form.Label> 
      <Form.Control 
      type='text' 
      name='digitosfac' 
      value={newLabempresa.digitosfac } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicTipcon'> 
		<Form.Label>Tipo Contrato</Form.Label> 
 <select onChange={handleNewChange} className='form-control' id='tipcon'  name='tipcon' value={newLabempresa.tipcon} > {opciones_tipcon} 
 </select>   </Form.Group>  
   </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabempresa}> 
    Agregar Labempresa 
  </Button> 
</Modal.Footer> 
</Modal> 
</> 
    ): ( <Navigate to="/login" /> )  }
    </>


) } 
export default Labempresas