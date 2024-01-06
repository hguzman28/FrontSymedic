// esta version tiene incorporada la funcionalidad de busqueda en tiempo real 


/*
import React, { Component } from 'react';
import {useState} from 'react';
import { useEffect } from 'react'; //para inicializar el componente al ser una function y no clase
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import Fecha from './Fecha.js';  
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
*/
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

  const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newEmpresa, setNewEmpresa] = useState({
    nombre: "",
    pais: "",
  });

  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/empresas/`;
  const [alert, setAlert] = useState("");

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  const obtenerEmpresas = async () => {
    try {
      const response = await fetch(baseurl+"select");
      const data = await response.json();
      setEmpresas(data.data);
      //*********** para busquedas ********* */
      setTablaEmpresas(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarEmpresa = async () => {
    try {
     
      //alert(`pais modif " + ${selectedEmpresa.pais}`);
     // console.log(selectedEmpresa.id + " " +selectedEmpresa.nombre + " " + selectedEmpresa.pais );

      const response = await fetch(
        `${baseurl}update/${selectedEmpresa.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
         // body: JSON.stringify(selectedEmpresa)
        body: JSON.stringify({
          nombre: selectedEmpresa.nombre,
          pais: selectedEmpresa.pais })
        }
      );
      const data = await response.json();
      setAlert("La empresa ha sido actualizada exitosamente.");
      setShowModal(false);
      obtenerEmpresas();
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarEmpresa = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar la empresa?")) {
      try {
        const response = await fetch(
          `${baseurl}delete/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        setAlert("La empresa ha sido eliminada exitosamente.");
        obtenerEmpresas();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (event) => {
    
    const { name, value } = event.target;
    //console.log("modificado "+ event.target  + event.target.value);
    setSelectedEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [name]: value
    }));
  };

  const handleNewChange = (event) => {
    const { name, value } = event.target;
    setNewEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [name]: value,
    }));
  };

  const insertarEmpresa = async () => {
    console.log(newEmpresa);
    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       // body: JSON.stringify(newEmpresa),
       body: JSON.stringify({
        id: newEmpresa.id,
        nombre: newEmpresa.nombre,
        pais: newEmpresa.pais })
      });
      const data = await response.json();
      setAlert("La empresa ha sido agregada exitosamente.");
      setShowNewModal(false);
      obtenerEmpresas();
    } catch (error) {
      console.error(error);
    }
  };

  
  // ******************** busquedas ******************************
  const [tablaEmpresas, setTablaEmpresas]= useState([]);
  const [busqueda, setBusqueda]= useState("");

  const handleChangeFinder=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaEmpresas.filter((elemento)=>{
    if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
    { return elemento;}
  });
  setEmpresas(resultadosBusqueda);
  }
   // ******************* fin ********************************

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
    // **************** fin lista paises *****************


  return (
    <>
      <h1>Empresas</h1>

      {alert && (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      )}

      <Button onClick={() => setShowNewModal(true)} className="mb-3">
        Agregar Empresa
      </Button>

       <div>
       <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por Nombre o Empresa"
            onChange={handleChangeFinder}/>
       </div>

      <Table striped bordered hover>
       
      <thead>
      
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>País</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {empresas.map((empresa) => (
        <tr>
          <td>{empresa.id}</td>
          <td>{empresa.nombre}</td>
          <td>{buscarpaisporid(empresa.pais)}</td>
          <td>
            <Button
              onClick={() => {
                setSelectedEmpresa(empresa);
                setShowModal(true);
              }}
              className="mx-1"
            >
              Editar
            </Button>
            <Button
              onClick={() => eliminarEmpresa(empresa.id)}
              className="btn btn-danger"
            >
              Eliminar
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Editar Empresa</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={selectedEmpresa.nombre}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPais">
          <Form.Label>País</Form.Label>
          <select className="form-control" id="pais" name="pais" value={selectedEmpresa.pais} onChange={handleChange}>
            {opciones}
          </select>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cerrar
      </Button>
      <Button variant="primary" onClick={actualizarEmpresa}>
        Guardar cambios
      </Button>
    </Modal.Footer>
  </Modal>

  <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Agregar Empresa</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicNombre">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={newEmpresa.id}
            onChange={handleNewChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={newEmpresa.nombre}
            onChange={handleNewChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPais">
          <Form.Label>País</Form.Label>
          <select className="form-control" id="pais" name="pais" value={newEmpresa.pais} onChange={handleNewChange}>
            {opciones}
          </select>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowNewModal(false)}>
        Cerrar
      </Button>
      <Button variant="primary" onClick={insertarEmpresa}>
        Agregar Empresa
      </Button>
    </Modal.Footer>
  </Modal>
</>
);
};

export default Empresas;