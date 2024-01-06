import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Zreportes = (props) => {

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const [usuario,setUsuario] = useState('');
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


  const [zreportes, setZreportes] = useState([]);
  const [selectedZreportes, setSelectedZreportes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newZreportes, setNewZreportes] = useState({
    cod: "",
    carpeta: "",
    nombre: "",
    usuario: "",
    consulta: "",
    filtros: "",
    columnas: "",
    medidas: "",
  });
  const [alert, setAlert] = useState("");
  useEffect(() => {
    setUsuario(user.username);
    obtenerZreportes();
   
  }, []);

  
const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/zreportes/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 
  const obtenerZreportes = async () => {
    try {
      const response = await fetch(baseurl + "select");
      const data = await response.json();
      setZreportes(data.data);
      setTablaZreportes(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const actualizarZreportes = async () => {
    try {
      const response = await fetch(
        `${baseurl}update/${selectedZreportes.cod}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carpeta: selectedZreportes.carpeta,
            nombre: selectedZreportes.nombre,
            usuario: selectedZreportes.usuario,
            consulta: selectedZreportes.consulta,
            filtros: selectedZreportes.filtros,
            columnas: selectedZreportes.columnas,
            medidas: selectedZreportes.medidas,
          }),
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        setAlert("La Zreportes ha sido actualizada exitosamente.");
        setShowModal(false);
        obtenerZreportes();
        obtenerZreportes();
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert("Error desconocido");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarZreportes = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar el Reporte?")) {
      try {
        const response = await fetch(`${baseurl}delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        setAlert("El Reporte ha sido eliminada exitosamente.");
        obtenerZreportes();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedZreportes((prevZreportes) => ({
      ...prevZreportes,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };
  const handleNewChange = (event) => {
    const { name, value } = event.target;
    setNewZreportes((prevZreportes) => ({
      ...prevZreportes,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };
  const blanquearModal = () => {
    setNewZreportes({
      cod: "",
      carpeta: "",
      nombre: "",
      usuario: "",
      consulta: "",
      filtros: "",
      columnas: "",
      medidas: "",
    });
    return "ok";
  };
  const insertarZreportes = async () => {
    console.log(newZreportes);
    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carpeta: newZreportes.carpeta,
          nombre: newZreportes.nombre,
          usuario: newZreportes.usuario,
          consulta: newZreportes.consulta,
          filtros: newZreportes.filtros,
          columnas: newZreportes.columnas,
          medidas: newZreportes.medidas,
        }),
      });
      const data = await response.json();
      if (response.status == 200) {
        setAlert("El(La) Reportes ha sido agregado(a) exitosamente.");
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerZreportes();
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert("Error desconocido");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // ******************** busquedas ******************************
  const [tablaZreportes, setTablaZreportes] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaZreportes.filter((elemento) => {
      if (
        elemento.usuario
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.carpeta
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setZreportes(resultadosBusqueda);
  };
  // ******************* fin ********************************
  return (
    <>
    { user && user.username ? ( 
    <> 
   
      <h1>Reportes</h1>
      {alert && (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      )}
      <Button onClick={() => setShowNewModal(true)} className="mb-3">
        Agregar Reportes
      </Button>
      <div>
        {" "}
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Busqueda por  usuario nombre carpeta"
          onChange={handleChangeFinder}
        />{" "}
      </div>
      <Table striped bordered hover>
        <thead>
          {" "}
          <tr>
            <th>Carpeta</th>
            <th>Nombre</th>
            <th>Usuario</th>
           
            <th>Filtros</th>
            <th>Columnas</th>
            <th>Medidas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {zreportes.map((reporte) => (
            <tr>
              <td>{reporte.carpeta} </td>
              <td>{reporte.nombre} </td>
              <td>{reporte.usuario} </td>
           
              <td>{reporte.filtros} </td>
              <td>{reporte.columnas} </td>
              <td>{reporte.medidas} </td>

              <td>
                <Button
                  onClick={() => {
                    setSelectedZreportes(reporte);
                    setShowModal(true);
                  }}
                  className="mx-1"
                >
                  {" "}
                  Editar{" "}
                </Button>

                <Button
                  onClick={() => {
                    props.seleccionar(reporte.cod);
                    props.seleccionar2(reporte.nombre);
   					        props.esunagrafica(true);
                  }}
                  className="mx-1"
                >
                  {" "}
                  Ejecutar{" "}
                </Button>  

				
             

                <Button
                  onClick={() => eliminarZreportes(reporte.cod)}
                  className="btn btn-danger"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Editar Reportes</Modal.Title>
        </Modal.Header>
        {alert && (
          <Alert variant="success" onClose={() => setAlert("")} dismissible>
            {alert}
          </Alert>
        )}
        <Modal.Body>
          <div class="container">
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Carpeta</label>
                <input
                  type="text"
                  class="form-control"
                  name="carpeta"
                  value={selectedZreportes.carpeta}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nombre"
                  value={selectedZreportes.nombre}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="row">
                <div class="col">
                  {" "}
                  {/* 2  */}
                  <label for="lbl">Usuario</label>
                  <input
                    type="text"
                    class="form-control"
                    name="usuario"
                    value={selectedZreportes.usuario}
                    onChange={handleChange}
                  />
                </div>{" "}
                {/* fin campo */}
              </div>{" "}
              {/* fin row */}
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Consulta</label>
                {/* <input 
          type='text' class='form-control' 
          name='consulta' 
          value={selectedZreportes.consulta } 
          onChange={handleChange} 
            />  */}
                <textarea
                  id="consulta"
                  name="consulta"
                  rows="4"
                  cols="50"
                  class="form-control"
                  onChange={handleChange}
                >
                  {selectedZreportes.consulta}
                </textarea>
              </div>{" "}
              {/* fin campo */}
              <div class="row">
                <div class="col">
                  {" "}
                  {/* 2  */}
                  <label for="lbl">Filtros</label>
                  <input
                    type="text"
                    class="form-control"
                    name="filtros"
                    value={selectedZreportes.filtros}
                    onChange={handleChange}
                  />
                </div>{" "}
                {/* fin campo */}
              </div>{" "}
              {/* fin row */}
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Columnas</label>
                <input
                  type="text"
                  class="form-control"
                  name="columnas"
                  value={selectedZreportes.columnas}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="row">
                <div class="col">
                  {" "}
                  {/* 2  */}
                  <label for="lbl">Medidas</label>
                  <input
                    type="text"
                    class="form-control"
                    name="medidas"
                    value={selectedZreportes.medidas}
                    onChange={handleChange}
                  />
                </div>{" "}
                {/* fin campo */}
              </div>{" "}
              {/* fin row */}
            </div>{" "}
            {/* fin row ultimo */}
          </div>{" "}
          {/* fin container mod */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizarZreportes}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showNewModal}
        onHide={() => setShowNewModal(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Reportes</Modal.Title>
        </Modal.Header>
        {alert && (
          <Alert variant="success" onClose={() => setAlert("")} dismissible>
            {alert}
          </Alert>
        )}
        <Modal.Body>
          <div class="container">
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Carpeta</label>
                <input
                  type="text"
                  class="form-control"
                  name="carpeta"
                  value={newZreportes.carpeta}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nombre"
                  value={newZreportes.nombre}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Usuario</label>
                <input
                  type="text"
                  class="form-control"
                  name="usuario"
                  value={newZreportes.usuario}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Consulta</label>
                <textarea
                  id="consulta"
                  name="consulta"
                  rows="4"
                  cols="50"
                  class="form-control"
                  onChange={handleNewChange}
                >
                  {newZreportes.consulta}
                </textarea>
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Filtros</label>
                <input
                  type="text"
                  class="form-control"
                  name="filtros"
                  value={newZreportes.filtros}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Columnas</label>
                <input
                  type="text"
                  class="form-control"
                  name="columnas"
                  value={newZreportes.columnas}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Medidas</label>
                <input
                  type="text"
                  class="form-control"
                  name="medidas"
                  value={newZreportes.medidas}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
          </div>{" "}
          {/* fin container ins */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={insertarZreportes}>
            Agregar Zreportes
          </Button>
        </Modal.Footer>
      </Modal>
     
      </> 
    ): ( <Navigate to="/login" /> )  }
    </>
     
  );
};
export default Zreportes;
