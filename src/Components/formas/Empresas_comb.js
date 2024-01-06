import React, { Component } from 'react';
import {useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import Fecha from './Fecha.js';  
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//import Combo from './Combo.js';

const url=`${process.env.REACT_APP_ENDPOINT_DATA}/empresas/`;

const urlselect = url+"select";

 // Datos para la lista de paises *******************************************
const listapais = [
  { id: "", nombre: "Seleccione valor" },
  { id: "1", nombre: "Colombia" },
  { id: "2", nombre: "Peru" },
  { id: "3", nombre: "Estados Unidos" }];
const opciones = listapais.map((pais) => (
    <option key={pais.id} value={pais.id}>
      {pais.nombre}
    </option> ));
function buscarpaisporid(idbuscado) {
  const paisencontrado = listapais.find(pais => pais.id === idbuscado);
  if (paisencontrado) {
    return paisencontrado.nombre;
  } else {
    return "País no encontrado";
  }
}


class Empresas extends Component {

state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    nombre: '',
    pais: '',
    capital_bursatil: '',
    fechainicio: ''
  }
}


// select
peticionGet=()=>{
axios.get(urlselect).then(response=>{
  this.setState({data: response.data.data});  // ojo el 2o data, es porq la resp viene asi
}).catch(error=>{
  console.log(error.message);
})
}


// para insertar desde el modal
peticionPost=async()=>{
  //delete this.state.form.id;
  await axios.post(url+"insert",this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

// para modificar registro desde el modal
peticionPut=()=>{
  axios.put(url+"update/"+this.state.form.id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

// para borrar el registro desde el modal
peticionDelete=()=>{
  axios.delete(url+"delete/"+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarEmpresa=(empresa)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: empresa.id,
      nombre: empresa.nombre,
      pais: empresa.pais,
      capital_bursatil: empresa.capital_bursatil,
      fechainicio: empresa.fechainicio
    }
  })
}

handleChange=async e=>{e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
}

  componentDidMount() {
    this.peticionGet();
  }

  
  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Empresa</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>País</th>
          <th>Capital Bursatil (en millones de USD)</th>
          <th>fechainicio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.id}</td>
          <td>{empresa.nombre}</td>
          <td>{buscarpaisporid(empresa.pais)}</td>
          <td>{new Intl.NumberFormat("en-EN").format(empresa.capital_bursatil)}</td>
          <td>{empresa.fechainicio}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(empresa); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(empresa); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
          </td>
          

          </tr>
          )
        })}
      </tbody>
    </table>

    


    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>

                    {this.state.tipoModal==='insertar'?
                      <input className="form-control"  type="text" name="id" id="id"  onChange={this.handleChange} value={form?form.id: ''}/>:
                      <input className="form-control"  type="text" disabled name="id" id="id"  onChange={this.handleChange} value={form?form.id: ''}/>                      
                    }

                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    
                    <div>
                        <label htmlFor="pais">Pais</label>
                        <select className="form-control" id="pais" name="pais" value={form?form.pais: ''} onChange={this.handleChange}>
                          {opciones}
                        </select>
                    </div>
                    <br />
                    <label htmlFor="capital_bursatil">Capital Bursatil</label>
                    <input className="form-control" type="text" name="capital_bursatil" id="capital_bursatil" onChange={this.handleChange} value={form?form.capital_bursatil:''}/>

                    <br />
                    <label htmlFor="fecha_inicio">Fecha Inicio</label>
                    <DatePicker id="fechainicio" name="fechainicio" selected ="" onChange={this.handleChange} value={form?form.fechainicio:''} />

                  </div>
                </ModalBody>
               

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: 
                   <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
                  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la empresa {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

  </div>

  );
}
}
export default Empresas;