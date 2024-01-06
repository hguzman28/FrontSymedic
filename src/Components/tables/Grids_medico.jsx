
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Usetable } from '../hooks/useTable';
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import {useState} from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { format } from 'date-fns';
// import { es } from 'date-fns/locale';




const Grids_medico = () => {

  const {data,handleDelete,handleUpdate,dataSeleccionado,setDataSeleccionado, setModalEliminar, modalEliminar, setModalEditar, modalEditar} = Usetable({'username':'','apellido':'','fecha':null}) ;


  const enableModal=(elemento, caso)=>{
    setDataSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  
   }

  const handleChange=e=>{
    const {name, value}=e.target;
    setDataSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  } 

  const onDateChange = date => {
  
  const fechaString = date.toISOString().slice(0, 10);

  setDataSeleccionado(dataSeleccionado => ({
      ...dataSeleccionado,
      fecha: fechaString
    }));
  };


  const editar=()=>{
  handleUpdate(dataSeleccionado)

  setModalEditar(false);
}

  const eliminar =()=>{
  // setData(data.filter(pais=>pais.id!==dataSeleccionado.id));
  handleDelete(dataSeleccionado.nombre)
  setModalEliminar(false);
}


  return (

    <>

<table className="table table-bordered">
  <caption>List of users</caption>
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Fecha</th>
      <th> Acciones</th>
   
    </tr>
  </thead>
  <tbody>
 
  {data.map((item) => (
          <tr key={item.nombre}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{ item.fecha}</td>
            <td>
              <button className="btn btn-primary" onClick={() => enableModal(item,'Editar')}> <FontAwesomeIcon icon={faEdit}/> </button>
              {/* <button className="btn btn-danger" onClick={() => handleDelete(item.nombre)}>Eliminar</button> */}
              <button className="btn btn-danger" onClick={() => enableModal(item,'Eliminar')}> <FontAwesomeIcon icon={faTrashAlt}/> </button>

            </td>
          </tr>
        ))}

  </tbody>
</table>


<Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar País</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={dataSeleccionado && dataSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={dataSeleccionado && dataSeleccionado.apellido}
              onChange={handleChange}
            />
            <br />
            
            <DatePicker
            selected={ new Date(Date.parse(dataSeleccionado.fecha + "T05:00:00-05:00"))}
            onChange={onDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleccione una fecha"
          />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
</Modal>

<Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar este dato {dataSeleccionado && dataSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
</Modal>



<ToastContainer />

    
    </>
  )
}

export default Grids_medico;
