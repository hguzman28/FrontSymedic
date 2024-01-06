import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Labtarifas = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


  const [labtarifas, setLabtarifas] = useState([]); 
 const [selectedLabtarifas, setSelectedLabtarifas] = useState({}); 
 const [showModal, setShowModal] = useState(false); 
 const [showNewModal, setShowNewModal] = useState(false);
 const [showOtras, setShowOtras] = useState(false);
 const [showSimul, setShowSimul] = useState(false);
 
 const [archivo, setArchivo] = useState(false);
 const [factor, setFactor] = useState(false);
 const [lista, setLista] = useState(false);
 
 
 const [newLabtarifas, setNewLabtarifas] = useState({ 
  codlista:'', 
  cdgexamen:'', 
  cup:'', 
  valor:'', 
 }); 
const [alert, setAlert] = useState(''); 
 useEffect(() => { 
   obtenerLabtarifas(); 
 }, []); 

 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labtarifas/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 const obtenerLabtarifas = async () => { 
   try { 
     const response = await fetch(baseurl+'select'); 
     const data = await response.json(); 
     setLabtarifas(data.data); 
     setTablaLabtarifas(data.data); 
   } catch (error) { 
     console.error(error); 
   }  }; 

const borrarLabtarifas = async () => {

}

const cargarLabtarifas = async () => {

}

const exportarLabtarifas = async () => {

}

const handleArchivo = async (event) => {
  const { name, value } = event.target;
  setArchivo(value);
}

const handleFactor = async (event) => {
  const { name, value } = event.target;
  setFactor(value);
}

const handleLista = async (event) => {
  const { name, value } = event.target;
  setLista(value);
}

const handleListaSimul = async (event) => {
  const { name, value } = event.target;
  //setLista(value);
}

const handleFactorSimul = async (event) => {
  const { name, value } = event.target;
  //setLista(value);
}

const simularLabtarifas = () => {
  setShowSimul(true);
 
}

const showFile = async (e) => {
  e.preventDefault()
  const reader = new FileReader()
  reader.onload = async (e) => { 
    const text = (e.target.result)
    console.log(text)
    alert(text)
  };
  reader.readAsText(e.target.files[0])
  
}

const actualizarLabtarifas = async () => { 
   try { 
     const response = await fetch( 
       `${baseurl}update/${selectedLabtarifas.id}`, 
       { method: 'PUT', 
         headers: { 
           'Content-Type': 'application/json', 
         }, 
        body: JSON.stringify({ 
        codlista:selectedLabtarifas.codlista, 
        cdgexamen:selectedLabtarifas.cdgexamen, 
        cup:selectedLabtarifas.cup, 
        valor:selectedLabtarifas.valor, 
 }) } ); 
const data = await response.json(); 
  

   
   if (response.status == 200) {
    setAlert('El registro ha sido actualizada exitosamente.'); 
    setShowModal(false); 
    obtenerLabtarifas(); 
   } else if (response.status == 400) {
    setAlert(data.detail);
  } else {
    setAlert('Error desconocido');
  }

  
  } catch (error) { 
     console.error(error); 
   }   }; 
 const eliminarLabtarifas = async (id) => { 
  if (window.confirm('Esta seguro que desea eliminar el registro ?')) { 
    try { 
      const response = await fetch( 
        `${baseurl}delete/${id}`,  
        { method: 'DELETE', 
        } 
      ); 
      const data = await response.json(); 

    
      
    if (response.status == 200) {
      setAlert('La tarifas ha sido eliminada exitosamente.'); 
      obtenerLabtarifas(); 
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
  setSelectedLabtarifas((prevLabtarifas) => ({ 
    ...prevLabtarifas, 
    [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
const handleNewChange = (event) => { 
  const { name, value } = event.target; 
  setNewLabtarifas((prevLabtarifas) => ({ 
    ...prevLabtarifas, 
   [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
  }));   }; 
 const blanquearModal = () => { setNewLabtarifas({ 
codlista:'', 
cdgexamen:'', 
cup:'', 
valor:'', 

 }); return('ok'); }  
const insertarLabtarifas = async () => { 
  console.log(newLabtarifas); 
  try { 
    const response = await fetch(baseurl + 'insert', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
     body: JSON.stringify({ 
      codlista:newLabtarifas.codlista,
cdgexamen:newLabtarifas.cdgexamen,
cup:newLabtarifas.cup,
valor:newLabtarifas.valor
 })  
    }); 
    const data = await response.json(); 
       

    if (response.status == 200) {
      setAlert('El registro ha sido agregada exitosamente.'); 
      setShowNewModal(false); 
      const x = blanquearModal(); 
      obtenerLabtarifas();
    } else if (response.status == 400) {
      setAlert(data.detail);
    } else {
      setAlert('Error desconocido');
    }

  } catch (error) { 
    console.error(error); 
  }   }; 
 // ******************** busquedas ****************************** 
const [tablaLabtarifas, setTablaLabtarifas]= useState([]); 
const [busqueda, setBusqueda]= useState(); 
const handleChangeFinder=e=>{ 
  setBusqueda(e.target.value); 
  filtrar(e.target.value);   } 
const filtrar=(terminoBusqueda)=>{ 
var resultadosBusqueda=tablaLabtarifas.filter((elemento)=>{ 
if ( elemento.codlista.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
|| elemento.cdgexamen.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
)  { return elemento;} 
}); 
setLabtarifas(resultadosBusqueda);  } 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 
    <> 
      <h1>Precios</h1> 
      {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
      <Button onClick={() => setShowNewModal(true)} className='mb-3'> 
        Agregar Precios 
      </Button> 
      <div>
      <Button 
              onClick={() => setShowOtras(true)} 
              className='btn btn-primary' > 
              Mas Operaciones 
      </Button> 
      </div>
     
 <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por lista,examen ' onChange = {handleChangeFinder}/> </div> 
      <Table striped bordered hover> 
      <thead> <tr> 
<th>Lista</th> 
<th>Examen</th> 
<th>Nombre</th> 

<th>Cup</th> 
<th>Valor</th> 
	<th>Acciones</th> 
      </tr></thead> 
    <tbody> 
      {labtarifas.map((labtarifa) => ( 
        <tr> 
<td>{labtarifa.codlista} </td> 
<td>{labtarifa.cdgexamen} </td> 
<td>{labtarifa.nombre} </td> 

<td>{labtarifa.cup} </td> 
<td>{labtarifa.valor} </td> 

       <td><Button   
              onClick={() => { 
                setSelectedLabtarifas(labtarifa) 
                setShowModal(true) 
              }} 
              className='mx-1' 
            > Editar </Button> 
            
            <Button 
              onClick={() => eliminarLabtarifas(labtarifa.id)} 
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
      <Modal.Title>Editar Precios</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
 <Form> 
    <Form.Group controlId='formBasicCodlista'> 
		<Form.Label>Lista</Form.Label> 
      <Form.Control 
      type='text' 
      name='codlista' 
      value={selectedLabtarifas.codlista } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Examen</Form.Label> 
      <Form.Control 
      type='text' 
      name='cdgexamen' 
      value={selectedLabtarifas.cdgexamen } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicCup'> 
		<Form.Label>Cup</Form.Label> 
      <Form.Control 
      type='text' 
      name='cup' 
      value={selectedLabtarifas.cup } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
    <Form.Group controlId='formBasicValor'> 
		<Form.Label>Valor</Form.Label> 
      <Form.Control 
      type='text' 
      name='valor' 
      value={selectedLabtarifas.valor } 
      onChange={handleChange} 
       /> 
      </Form.Group> 
      </Form> 
    </Modal.Body> 
    <Modal.Footer> 
      <Button variant='secondary' onClick={() => setShowModal(false)}> 
        Cerrar 
      </Button> 
      <Button variant='primary' onClick={actualizarLabtarifas}> 
        Guardar cambios 
      </Button> 
    </Modal.Footer> 
  </Modal> 
  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Agregar Precios</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 
      <Form.Group controlId='formBasicCodlista'> 
		<Form.Label>Lista</Form.Label> 
      <Form.Control 
      type='text' 
      name='codlista' 
      value={newLabtarifas.codlista } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCdgexamen'> 
		<Form.Label>Examen</Form.Label> 
      <Form.Control 
      type='text' 
      name='cdgexamen' 
      value={newLabtarifas.cdgexamen } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCup'> 
		<Form.Label>Cup</Form.Label> 
      <Form.Control 
      type='text' 
      name='cup' 
      value={newLabtarifas.cup } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicValor'> 
		<Form.Label>Valor</Form.Label> 
      <Form.Control 
      type='text' 
      name='valor' 
      value={newLabtarifas.valor } 
      onChange={handleNewChange} 
       /> 
      </Form.Group> 
  </Form> 
 </Modal.Body> 
 <Modal.Footer> 
  <Button variant='secondary' onClick={() => setShowNewModal(false)}> 
    Cerrar 
  </Button> 
  <Button variant='primary' onClick={insertarLabtarifas}> 
    Agregar Labtarifas 
  </Button> 
</Modal.Footer> 
</Modal> 


<Modal show={showOtras} onHide={() => setShowOtras(false)}> 
    <Modal.Header closeButton> 
      <Modal.Title>Operaciones con Precios</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 

      <Form.Group controlId='formBasicCodlista'> 
		  <Form.Label>Archivo</Form.Label> 
      <input type="file" onChange={(e) => showFile(e)} />
      </Form.Group>      

      <Form.Group controlId='formBasicCdgexamen'> 
		  <Form.Label></Form.Label> 
      <Button variant='primary' onClick={cargarLabtarifas}> 
        Importar desde Archivo 
      </Button> 
      </Form.Group> 
       
		  <Form.Label></Form.Label> 
      <Button variant='primary' onClick={exportarLabtarifas}> 
        Exportar Archivo 
      </Button> 
       
      <Form.Group>  
      <Form.Label></Form.Label> 
      <Button variant='danger' onClick={borrarLabtarifas}> 
        Borra Precios 
      </Button> 
      </Form.Group> 

      <br>
      </br>
      <br>
      </br>

      <Form.Group controlId='formBasicCodlista'> 
		  <Form.Label>Lista</Form.Label> 
      <Form.Control 
        type='text' 
        name='listaSimul' 
        onChange={handleListaSimul} 
       /> 
      </Form.Group>         

      <Form.Group controlId='formBasicCodlista'> 
		  <Form.Label>Factor</Form.Label> 
      <Form.Control 
        type='text' 
        name='factorSimul' 
        onChange={handleFactorSimul} 
       /> 
      </Form.Group> 
      <Form.Group controlId='formBasicCdgexamen'> 
		  <Form.Label></Form.Label> 
      <Button variant='primary' onClick={simularLabtarifas}> 
        Simular Tarifas 
      </Button> 
      </Form.Group> 

      <Form.Group controlId='formBasicCdgexamen'> 
		  <Form.Label></Form.Label> 
      <Button variant='primary' onClick={simularLabtarifas}> 
        Actualizar en esta lista la Simulación
      </Button> 
      </Form.Group> 
         


  </Form> 
 </Modal.Body> 
 <Modal.Footer> 

  <Button variant='secondary' onClick={() => setShowOtras(false)}> 
    Cerrar 
  </Button> 

</Modal.Footer> 
</Modal> 


<Modal show={showSimul} onHide={() => setShowSimul(false)} size="xl"> 
    <Modal.Header closeButton> 
      <Modal.Title>Simulacion de Precios</Modal.Title> 
    </Modal.Header> 
    {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

    <Modal.Body> 
      <Form> 

  </Form> 
 </Modal.Body> 
 <Modal.Footer> 

  <Button variant='secondary' onClick={() => setShowSimul(false)}> 
    Cerrar 
  </Button> 

</Modal.Footer> 
</Modal> 


</> 
    ): ( <Navigate to="/login" /> )  }
    </>

) } 
export default Labtarifas