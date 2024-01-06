import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";

import * as XLSX from 'xlsx';

// npm install xlsx --force
//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Examenes = (props) => {

  //  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


  const [examen, setExamenes] = useState([]);
  const [selectedExamen, setSelectedExamen] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newExamen, setNewExamen] = useState({
    cdgexamen: "",
    nombre: "",
    codseccion: "",
    cut: "",
    soat: "",
    nivexa: "",
    nomcorto: "",
    duracion: "",
    tecnicas: "",
    condiciones: "",
    tipmues: "",
    duraciont: "",
    tiposerv: "",
    inactiva: "",
    entlun: "",
    entmar: "",
    entmie: "",
    entjue: "",
    entvie: "",
    entsab: "",
    entdom: "",
    noproclun: "",
    noprocmar: "",
    noprocmie: "",
    noprocjue: "",
    noprocvie: "",
    noprocsab: "",
    noprocdom: "",
    numfirmas: "",
  });
  const [alert, setAlert] = useState("");
  useEffect(() => {
    obtenerExamenes();
    mapear_codseccion();
    mapear_tipmues();
    mapear_tiposerv();
  }, []);
  
  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/examen/`; 
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 



  const obtenerExamenes = async () => {
    try {
      const response = await fetch(baseurl + "select");
      const data = await response.json();
      setExamenes(data.data);
      setTablaExamenes(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const actualizarExamen = async () => {
    try {
      const response = await fetch(
        `${baseurl}update/${selectedExamen.cdgexamen}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: selectedExamen.nombre,
            codseccion: selectedExamen.codseccion,
            cut: selectedExamen.cut,
            soat: selectedExamen.soat,
            nivexa: selectedExamen.nivexa,
            nomcorto: selectedExamen.nomcorto,
            duracion: selectedExamen.duracion,
            tecnicas: selectedExamen.tecnicas,
            condiciones: selectedExamen.condiciones,
            tipmues: selectedExamen.tipmues,
            duraciont: selectedExamen.duraciont,
            tiposerv: selectedExamen.tiposerv,
            inactiva: selectedExamen.inactiva,
            entlun: selectedExamen.entlun,
            entmar: selectedExamen.entmar,
            entmie: selectedExamen.entmie,
            entjue: selectedExamen.entjue,
            entvie: selectedExamen.entvie,
            entsab: selectedExamen.entsab,
            entdom: selectedExamen.entdom,
            noproclun: selectedExamen.noproclun,
            noprocmar: selectedExamen.noprocmar,
            noprocmie: selectedExamen.noprocmie,
            noprocjue: selectedExamen.noprocjue,
            noprocvie: selectedExamen.noprocvie,
            noprocsab: selectedExamen.noprocsab,
            noprocdom: selectedExamen.noprocdom,
            numfirmas: selectedExamen.numfirmas,
          }),
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        setAlert("La Examen ha sido actualizada exitosamente.");
        setShowModal(false);
        obtenerExamenes();
        obtenerExamenes();
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert("Error desconocido");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarExamen = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar la Examen?")) {
      try {
        const response = await fetch(`${baseurl}delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        setAlert("La Examen ha sido eliminada exitosamente.");
        obtenerExamenes();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedExamen((prevExamen) => ({
      ...prevExamen,
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
    setNewExamen((prevExamen) => ({
      ...prevExamen,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };
  const [opciones_codseccion, setOpcionesCodseccion] = useState([]);
  const [opciones_tipmues, setOpcionesTipmues] = useState([]);
  const [opciones_tiposerv, setOpcionesTiposerv] = useState([]);
  const mapear_codseccion = async () => {
    try {
      const response = await fetch(baseurlov + "labseccion");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCodseccion(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_tipmues = async () => {
    try {
      const response = await fetch(baseurlov + "tipomuestra");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesTipmues(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_tiposerv = async () => {
    try {
      const response = await fetch(baseurlov + "tiposerv");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesTiposerv(opciones);
    } catch (error) {
      console.error(error);
    }
  };
  const blanquearModal = () => {
    setNewExamen({
      cdgexamen: "",
      nombre: "",
      codseccion: "",
      cut: "",
      soat: "",
      nivexa: "",
      nomcorto: "",
      duracion: "",
      tecnicas: "",
      condiciones: "",
      tipmues: "",
      duraciont: "",
      tiposerv: "",
      inactiva: "",
      entlun: "",
      entmar: "",
      entmie: "",
      entjue: "",
      entvie: "",
      entsab: "",
      entdom: "",
      noproclun: "",
      noprocmar: "",
      noprocmie: "",
      noprocjue: "",
      noprocvie: "",
      noprocsab: "",
      noprocdom: "",
      numfirmas: "",
    });
    return "ok";
  };
  const insertarExamen = async () => {
    console.log(newExamen);
    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cdgexamen: newExamen.cdgexamen,
          nombre: newExamen.nombre,
          codseccion: newExamen.codseccion,
          cut: newExamen.cut,
          soat: newExamen.soat,
          nivexa: newExamen.nivexa,
          nomcorto: newExamen.nomcorto,
          duracion: newExamen.duracion,
          tecnicas: newExamen.tecnicas,
          condiciones: newExamen.condiciones,
          tipmues: newExamen.tipmues,
          duraciont: newExamen.duraciont,
          tiposerv: newExamen.tiposerv,
          inactiva: newExamen.inactiva,
          entlun: newExamen.entlun,
          entmar: newExamen.entmar,
          entmie: newExamen.entmie,
          entjue: newExamen.entjue,
          entvie: newExamen.entvie,
          entsab: newExamen.entsab,
          entdom: newExamen.entdom,
          noproclun: newExamen.noproclun,
          noprocmar: newExamen.noprocmar,
          noprocmie: newExamen.noprocmie,
          noprocjue: newExamen.noprocjue,
          noprocvie: newExamen.noprocvie,
          noprocsab: newExamen.noprocsab,
          noprocdom: newExamen.noprocdom,
          numfirmas: newExamen.numfirmas,
        }),
      });
      const data = await response.json();
      if (response.status == 200) {
        setAlert("El(La) Examenes ha sido agregado(a) exitosamente.");
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerExamenes();
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
  const [tablaExamenes, setTablaExamenes] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaExamenes.filter((elemento) => {
      if (
        elemento.cdgexamen
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setExamenes(resultadosBusqueda);
  };

  const exportToExcel = (datos) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    // props.data.data
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported_data.xlsx');
  };



  // ******************* fin ********************************
  return (
    <>
    { user && user.username ? ( 
    <> 
      <h1>Examenes</h1>
      {alert && (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      )}
      <Button onClick={() => setShowNewModal(true)} className="mb-3">
        Agregar Examenes
      </Button>

      <Button onClick={() => exportToExcel(examen)} className="mb-3">
        Exportar
      </Button>

      <div>
        {" "}
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Busqueda por  cdgexamen nombre"
          onChange={handleChangeFinder}
        />{" "}
      </div>
      <Table striped bordered hover>
        <thead>
          {" "}
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Seccion</th>
            <th>Cup</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {examen.map((examen) => (
            <tr>
              <td>{examen.cdgexamen} </td>
              <td>{examen.nombre} </td>
              <td>{examen.codseccion} </td>
              <td>{examen.cut} </td>

              <td>
                <Button
                  onClick={() => {
                    setSelectedExamen(examen);
                    setShowModal(true);
                  }}
                  className="mx-1"
                >
                  {" "}
                  Editar{" "}
                </Button>
                <Button
                  onClick={() => {
                    props.retornar(examen.cdgexamen);
                    props.retornar2(examen.nombre);
                  }}
                  className="mx-1"
                >
                  {" "}
                  Analisis{" "}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Editar Examenes</Modal.Title>
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
                <label for="lbl">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nombre"
                  value={selectedExamen.nombre}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Seccion</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="codseccion"
                  name="codseccion"
                  value={selectedExamen.codseccion}
                >
                  {" "}
                  {opciones_codseccion}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">Cup</label>
              <input
                type="text"
                class="form-control"
                name="cut"
                value={selectedExamen.cut}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Soat</label>
                <input
                  type="text"
                  class="form-control"
                  name="soat"
                  value={selectedExamen.soat}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Nivel</label>
                <input
                  type="text"
                  class="form-control"
                  name="nivexa"
                  value={selectedExamen.nivexa}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">NombreCorto</label>
              <input
                type="text"
                class="form-control"
                name="nomcorto"
                value={selectedExamen.nomcorto}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Duracion</label>
                <input
                  type="text"
                  class="form-control"
                  name="duracion"
                  value={selectedExamen.duracion}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Tecnicas</label>
                <input
                  type="text"
                  class="form-control"
                  name="tecnicas"
                  value={selectedExamen.tecnicas}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">Condiciones</label>
              <input
                type="text"
                class="form-control"
                name="condiciones"
                value={selectedExamen.condiciones}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Tipomuestra</label>
                <select
                  onChange={handleChange}
                  class="col form-select form-select-sm"
                  id="tipmues"
                  name="tipmues"
                  value={selectedExamen.tipmues}
                >
                  {" "}
                  {opciones_tipmues}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Duracion</label>
                <input
                  type="text"
                  class="form-control"
                  name="duraciont"
                  value={selectedExamen.duraciont}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">Tiposervicio</label>
              <select
                onChange={handleChange}
                class="col form-select form-select-sm"
                id="tiposerv"
                name="tiposerv"
                value={selectedExamen.tiposerv}
              >
                {" "}
                {opciones_tiposerv}
              </select>{" "}
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Inactiva</label>
                <input
                  type="checkbox"
                  name="inactiva"
                  checked={selectedExamen.inactiva == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">EntregaLun</label>
                <input
                  type="checkbox"
                  name="entlun"
                  checked={selectedExamen.entlun == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">EntregaMar</label>
              <input
                type="checkbox"
                name="entmar"
                checked={selectedExamen.entmar == "S" ? true : false}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">EntregaMie</label>
                <input
                  type="checkbox"
                  name="entmie"
                  checked={selectedExamen.entmie == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">EntregaJue</label>
                <input
                  type="checkbox"
                  name="entjue"
                  checked={selectedExamen.entjue == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">EntregaVie</label>
              <input
                type="checkbox"
                name="entvie"
                checked={selectedExamen.entvie == "S" ? true : false}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">EntregaSab</label>
                <input
                  type="checkbox"
                  name="entsab"
                  checked={selectedExamen.entsab == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Diagnostico</label>
                <input
                  type="checkbox"
                  name="entdom"
                  checked={selectedExamen.entdom == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">NoProcLunes</label>
              <input
                type="checkbox"
                name="noproclun"
                checked={selectedExamen.noproclun == "S" ? true : false}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">NoProcMartes</label>
                <input
                  type="checkbox"
                  name="noprocmar"
                  checked={selectedExamen.noprocmar == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">NoProcMierc</label>
                <input
                  type="checkbox"
                  name="noprocmie"
                  checked={selectedExamen.noprocmie == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">NoProcJueves</label>
              <input
                type="checkbox"
                name="noprocjue"
                checked={selectedExamen.noprocjue == "S" ? true : false}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">NoProcViernes</label>
                <input
                  type="checkbox"
                  name="noprocvie"
                  checked={selectedExamen.noprocvie == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">NoProcSab</label>
                <input
                  type="checkbox"
                  name="noprocsab"
                  checked={selectedExamen.noprocsab == "S" ? true : false}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="col">
              {" "}
              {/* 1  */}
              <label for="lbl">NoProcDom</label>
              <input
                type="checkbox"
                name="noprocdom"
                checked={selectedExamen.noprocdom == "S" ? true : false}
                onChange={handleChange}
              />
            </div>{" "}
            {/* fin campo */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Numero de Firmas</label>
                <input
                  type="text"
                  class="form-control"
                  name="numfirmas"
                  value={selectedExamen.numfirmas}
                  onChange={handleChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row ultimo */}
          </div>{" "}
          {/* fin container mod */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizarExamen}>
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
          <Modal.Title>Agregar Examenes</Modal.Title>
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
                {/* 1  */}
                <label for="lbl">Codigo</label>
                <input
                  type="text"
                  class="form-control"
                  name="cdgexamen"
                  value={newExamen.cdgexamen}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  name="nombre"
                  value={newExamen.nombre}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Seccion</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="codseccion"
                  name="codseccion"
                  value={newExamen.codseccion}
                >
                  {" "}
                  {opciones_codseccion}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row */}
            <div class="row">
              <div class="col">
                {" "}
                {/* 1  */}
                <label for="lbl">Cup</label>
                <input
                  type="text"
                  class="form-control"
                  name="cut"
                  value={newExamen.cut}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Soat</label>
                <input
                  type="text"
                  class="form-control"
                  name="soat"
                  value={newExamen.soat}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Nivel</label>
                <input
                  type="text"
                  class="form-control"
                  name="nivexa"
                  value={newExamen.nivexa}
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
                <label for="lbl">NombreCorto</label>
                <input
                  type="text"
                  class="form-control"
                  name="nomcorto"
                  value={newExamen.nomcorto}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Duracion</label>
                <input
                  type="text"
                  class="form-control"
                  name="duracion"
                  value={newExamen.duracion}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Tecnicas</label>
                <input
                  type="text"
                  class="form-control"
                  name="tecnicas"
                  value={newExamen.tecnicas}
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
                <label for="lbl">Condiciones</label>
                <input
                  type="text"
                  class="form-control"
                  name="condiciones"
                  value={newExamen.condiciones}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Tipomuestra</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="tipmues"
                  name="tipmues"
                  value={newExamen.tipmues}
                >
                  {" "}
                  {opciones_tipmues}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Duracion</label>
                <input
                  type="text"
                  class="form-control"
                  name="duraciont"
                  value={newExamen.duraciont}
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
                <label for="lbl">Tiposervicio</label>
                <select
                  onChange={handleNewChange}
                  class="col form-select form-select-sm"
                  id="tiposerv"
                  name="tiposerv"
                  value={newExamen.tiposerv}
                >
                  {" "}
                  {opciones_tiposerv}
                </select>{" "}
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Inactiva</label>
                <input
                  type="checkbox"
                  name="inactiva"
                  checked={newExamen.inactiva == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">EntregaLun</label>
                <input
                  type="checkbox"
                  name="entlun"
                  checked={newExamen.entlun == "S" ? true : false}
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
                <label for="lbl">EntregaMar</label>
                <input
                  type="checkbox"
                  name="entmar"
                  checked={newExamen.entmar == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">EntregaMie</label>
                <input
                  type="checkbox"
                  name="entmie"
                  checked={newExamen.entmie == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">EntregaJue</label>
                <input
                  type="checkbox"
                  name="entjue"
                  checked={newExamen.entjue == "S" ? true : false}
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
                <label for="lbl">EntregaVie</label>
                <input
                  type="checkbox"
                  name="entvie"
                  checked={newExamen.entvie == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">EntregaSab</label>
                <input
                  type="checkbox"
                  name="entsab"
                  checked={newExamen.entsab == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">Diagnostico</label>
                <input
                  type="checkbox"
                  name="entdom"
                  checked={newExamen.entdom == "S" ? true : false}
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
                <label for="lbl">NoProcLunes</label>
                <input
                  type="checkbox"
                  name="noproclun"
                  checked={newExamen.noproclun == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">NoProcMartes</label>
                <input
                  type="checkbox"
                  name="noprocmar"
                  checked={newExamen.noprocmar == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">NoProcMierc</label>
                <input
                  type="checkbox"
                  name="noprocmie"
                  checked={newExamen.noprocmie == "S" ? true : false}
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
                <label for="lbl">NoProcJueves</label>
                <input
                  type="checkbox"
                  name="noprocjue"
                  checked={newExamen.noprocjue == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">NoProcViernes</label>
                <input
                  type="checkbox"
                  name="noprocvie"
                  checked={newExamen.noprocvie == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 3  */}
                <label for="lbl">NoProcSab</label>
                <input
                  type="checkbox"
                  name="noprocsab"
                  checked={newExamen.noprocsab == "S" ? true : false}
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
                <label for="lbl">NoProcDom</label>
                <input
                  type="checkbox"
                  name="noprocdom"
                  checked={newExamen.noprocdom == "S" ? true : false}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
              <div class="col">
                {" "}
                {/* 2  */}
                <label for="lbl">Numero de Firmas</label>
                <input
                  type="text"
                  class="form-control"
                  name="numfirmas"
                  value={newExamen.numfirmas}
                  onChange={handleNewChange}
                />
              </div>{" "}
              {/* fin campo */}
            </div>{" "}
            {/* fin row ultimo */}
          </div>{" "}
          {/* fin container ins */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={insertarExamen}>
            Agregar Examen
          </Button>
        </Modal.Footer>
      </Modal>
      </> 
    ): ( <Navigate to="/login" /> )  }
    </>
  );
};
export default Examenes;
