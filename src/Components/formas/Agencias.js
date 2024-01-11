//import { GetStatusLogin } from "../GetStatusLogin"; // 2)
import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";


//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Agencias = () => {

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 

 // const { status_login } = GetStatusLogin(); // 1)

  const [agencias, setAgencias] = useState([]);
  const [selectedAgencias, setSelectedAgencias] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newAgencias, setNewAgencias] = useState({
    codage: "",
    nomage: "",
    ciuage: "",
    depage: "",
    dirage: "",
    telage: "",
    tipocons: "",
    docpac: "",
    resdian: "",
    reqfd: "",
    sinlogo: "",
    predian: "",
    maxfecres: "",
    maxconsres: "",
    tipofirma: "",
    architect_prefijo: "",
    proc: "",
    codager: "",
    domi: "",
  });

  // para las listas
  const [opciones_departamento, setOpcionesDepartamento] = useState([]);
  const [opciones_ciudad, setOpcionesCiudad] = useState([]);
  const [opciones_domi, setOpcionesDomi] = useState([]);
  const [opciones_tipofirma, setOpcionesTipofirma] = useState([]);
  const [opciones_tipocons, setOpcionesTipocons] = useState([]);

  const mapear_tipofirma = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "O", name: "Orden" },
        { id: "E", name: "Examen" },
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesTipofirma(opciones);
    } catch (error) {
      console.error(error);
    }
  };
  const mapear_tipocons = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "M", name: "Manual" },
        { id: "A", name: "Automatica" },
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesTipocons(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_departamento = async () => {
    try {
      const response = await fetch(baseurlov + "departamento");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesDepartamento(opciones);
    } catch (error) {
      console.error(error);
    }
  };
  const mapear_ciudad = async () => {
    try {
      const response = await fetch(baseurlov + "ciudad");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCiudad(opciones);
    } catch (error) {
      console.error(error);
    }
  };
  const mapear_agencia = async () => {
    try {
      const response = await fetch(baseurlov + "agencia");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesDomi(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const [alert, setAlert] = useState("");
  useEffect(() => {
    obtenerAgencias();
    mapear_tipocons();
    mapear_tipofirma();
    mapear_departamento();
    mapear_ciudad();
    mapear_agencia();
  }, []);

  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/agencias/`; 
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
  
  //const baseurl = "http://127.0.0.1:8000/agencias/";
  //const baseurlov = "http://127.0.0.1:8000/lov/";

  const obtenerAgencias = async () => {
    try {
      const response = await fetch(baseurl + "select");
      const data = await response.json();
      setAgencias(data.data);
      setTablaAgencias(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const actualizarAgencias = async () => {
    try {
      const response = await fetch(
        `${baseurl}update/${selectedAgencias.codage}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomage: selectedAgencias.nomage,
            ciuage: selectedAgencias.ciuage,
            depage: selectedAgencias.depage,
            dirage: selectedAgencias.dirage,
            telage: selectedAgencias.telage,
            tipocons: selectedAgencias.tipocons,
            docpac: selectedAgencias.docpac,
            resdian: selectedAgencias.resdian,
            reqfd: selectedAgencias.reqfd,
            sinlogo: selectedAgencias.sinlogo,
            predian: selectedAgencias.predian,
            maxfecres: selectedAgencias.maxfecres,
            maxconsres: selectedAgencias.maxconsres,
            tipofirma: selectedAgencias.tipofirma,
            architect_prefijo: selectedAgencias.architect_prefijo,
            proc: selectedAgencias.proc,
            codager: selectedAgencias.codager,
            domi: selectedAgencias.domi,
          }),
        }
      );

      
        const data = await response.json();
      if (response.status == 200){  
        setAlert("La Agencias ha sido actualizada exitosamente.");
        setShowModal(false);
        obtenerAgencias(); 
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }  


    } catch (error) {
      console.error(error);
    }
  };
  const eliminarAgencias = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar la Agencias?")) {
      try {
        const response = await fetch(`${baseurl}delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        setAlert("La Agencias ha sido eliminada exitosamente.");
        obtenerAgencias();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedAgencias((prevAgencias) => ({
      ...prevAgencias,
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
    setNewAgencias((prevAgencias) => ({
      ...prevAgencias,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };
  const blanquearModal = () => {
    setNewAgencias({
      nomage: "",
      ciuage: "",
      depage: "",
      dirage: "",
      telage: "",
      tipocons: "",
      docpac: "",
      resdian: "",
      reqfd: "",
      sinlogo: "",
      predian: "",
      maxfecres: "",
      maxconsres: "",
      tipofirma: "",
      architect_prefijo: "",
      proc: "",
      codager: "",
      domi: "",
    });
    return "ok";
  };
  const insertarAgencias = async () => {
    console.log(newAgencias);
    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codage: newAgencias.codage,
          nomage: newAgencias.nomage,
          ciuage: newAgencias.ciuage,
          depage: newAgencias.depage,
          dirage: newAgencias.dirage,
          telage: newAgencias.telage,
          tipocons: newAgencias.tipocons,
          docpac: newAgencias.docpac,
          resdian: newAgencias.resdian,
          reqfd: newAgencias.reqfd,
          sinlogo: newAgencias.sinlogo,
          predian: newAgencias.predian,
          maxfecres: newAgencias.maxfecres,
          maxconsres: newAgencias.maxconsres,
          tipofirma: newAgencias.tipofirma,
          architect_prefijo: newAgencias.architect_prefijo,
          proc: newAgencias.proc,
          codager: newAgencias.codager,
          domi: newAgencias.domi,
        }),
      });
     
        const data = await response.json();
      if (response.status == 200){  
        setAlert("La Agencias ha sido agregada exitosamente.");
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerAgencias(); 
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }
    
    } catch (error) {
      console.error(error);
    }
  };
  // ******************** busquedas ******************************
  const [tablaAgencias, setTablaAgencias] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaAgencias.filter((elemento) => {
      if (
        elemento.nomage
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setAgencias(resultadosBusqueda);
  };
  // ******************* fin ********************************
  return (
    
    <>
    { user && user.username ? ( 
    <> 
     
     <h1>  + Agencias + </h1>
      {alert && (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      )}
      <Button onClick={() => setShowNewModal(true)} className="mb-3">
        Agregar Agencias
      </Button>
      <div>
        {" "}
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por "
          onChange={handleChangeFinder}
        />{" "}
      </div>
      <Table striped bordered hover>
        <thead>
          {" "}
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Departamento</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Tipoconsec</th>
            <th>Docpac</th>
            <th>Resdian</th>
            <th>Req.FirmaDig</th>
            <th>Sinlogo</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {agencias.map((agencia) => (
            <tr>
              <td>{agencia.codage} </td>
              <td>{agencia.nomage} </td>
              <td>{agencia.ciuage} </td>
              <td>{agencia.depage} </td>
              <td>{agencia.dirage} </td>
              <td>{agencia.telage} </td>
              <td>{agencia.tipocons} </td>
              <td>{agencia.docpac} </td>
              <td>{agencia.resdian} </td>
              <td>{agencia.reqfd} </td>
              <td>{agencia.sinlogo} </td>

              <td>
                <Button
                  onClick={() => {
                    setSelectedAgencias(agencia);
                    setShowModal(true);
                  }}
                  className="btn btn-primary"
                >
                  {" "}
                  Editar{" "}
                </Button>
                <Button
                  onClick={() => eliminarAgencias(agencia.codage)}
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
          <Modal.Title>Editar Agencias</Modal.Title>
        </Modal.Header>
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicNomage">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nomage"
                value={selectedAgencias.nomage}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicdep">
              <Form.Label>Departamento</Form.Label>
              <select
                onChange={handleChange}
                className="form-control"
                id="depage"
                name="depage"
                value={selectedAgencias.depage}
              >
                {opciones_departamento}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicciud">
              <Form.Label>Ciudad</Form.Label>
              <select
                onChange={handleChange}
                className="form-control"
                id="ciuage"
                name="ciuage"
                value={selectedAgencias.ciuage}
              >
                {opciones_ciudad}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicDirage">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name="dirage"
                value={selectedAgencias.dirage}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicTelage">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="telage"
                value={selectedAgencias.telage}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicunidad">
              <Form.Label>TipoCons</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="tipocons"
                name="tipocons"
                value={selectedAgencias.tipocons}
              >
                {opciones_tipocons}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicDocpac">
              <Form.Label>Docpaciente</Form.Label>
              <Form.Control
                type="text"
                name="docpac"
                value={selectedAgencias.docpac}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicResdian">
              <Form.Label>Resdian</Form.Label>
              <Form.Control
                type="text"
                name="resdian"
                value={selectedAgencias.resdian}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicc">
              <Form.Label>Req. FirmaDig</Form.Label>
              <input
                type="checkbox"
                name="reqfd"
                checked={selectedAgencias.reqfd == "S" ? true : false}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicc">
              <Form.Label>SinLogo</Form.Label>
              <input
                type="checkbox"
                name="sinlogo"
                checked={selectedAgencias.sinlogo == "S" ? true : false}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPredian">
              <Form.Label>Prefijodian</Form.Label>
              <Form.Control
                type="text"
                name="predian"
                value={selectedAgencias.predian}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicMaxfecres">
              <Form.Label>Maxfecres</Form.Label>
              <Form.Control
                type="text"
                name="maxfecres"
                value={selectedAgencias.maxfecres}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicMaxconsres">
              <Form.Label>Maxconsres</Form.Label>
              <Form.Control
                type="text"
                name="maxconsres"
                value={selectedAgencias.maxconsres}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicunidad">
              <Form.Label>TipoFirma</Form.Label>
              <select
                onChange={handleChange}
                className="form-control"
                id="tipofirma"
                name="tipofirma"
                value={selectedAgencias.tipofirma}
              >
                {opciones_tipofirma}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicArchitect_prefijo">
              <Form.Label>Architect_prefijo</Form.Label>
              <Form.Control
                type="text"
                name="architect_prefijo"
                value={selectedAgencias.architect_prefijo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicc">
              <Form.Label>Procesa</Form.Label>
              <input
                type="checkbox"
                name="proc"
                checked={selectedAgencias.proc == "S" ? true : false}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCodager">
              <Form.Label>Codager</Form.Label>
              <Form.Control
                type="text"
                name="codager"
                value={selectedAgencias.codager}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDomi">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control
                type="text"
                name="domi"
                value={selectedAgencias.domi}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizarAgencias}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Agencias</Modal.Title>
        </Modal.Header>
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )} 
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCodage">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="text"
                name="codage"
                value={newAgencias.codage}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicNomage">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nomage"
                value={newAgencias.nomage}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicdep">
              <Form.Label>Departamento</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="depage"
                name="depage"
                value={newAgencias.depage}
              >
                {opciones_departamento}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicciud">
              <Form.Label>Ciudad</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="ciuage"
                name="ciuage"
                value={newAgencias.ciuage}
              >
                {opciones_ciudad}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicDirage">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name="dirage"
                value={newAgencias.dirage}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicTelage">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="telage"
                value={newAgencias.telage}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicunidad">
              <Form.Label>TipoCons</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="tipocons"
                name="tipocons"
                value={newAgencias.tipocons}
              >
                {opciones_tipocons}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicDocpac">
              <Form.Label>Docpaciente</Form.Label>
              <Form.Control
                type="text"
                name="docpac"
                value={newAgencias.docpac}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicResdian">
              <Form.Label>Resdian</Form.Label>
              <Form.Control
                type="text"
                name="resdian"
                value={newAgencias.resdian}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicc">
              <Form.Label>Req. FirmaDig</Form.Label>
              <input
                type="checkbox"
                name="reqfd"
                checked={newAgencias.reqfd == "S" ? true : false}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicc">
              <Form.Label>SinLogo</Form.Label>
              <input
                type="checkbox"
                name="sinlogo"
                checked={newAgencias.sinlogo == "S" ? true : false}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPredian">
              <Form.Label>Predian</Form.Label>
              <Form.Control
                type="text"
                name="predian"
                value={newAgencias.predian}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicMaxfecres">
              <Form.Label>Maxfecres</Form.Label>
              <Form.Control
                type="text"
                name="maxfecres"
                value={newAgencias.maxfecres}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicMaxconsres">
              <Form.Label>Maxconsres</Form.Label>
              <Form.Control
                type="text"
                name="maxconsres"
                value={newAgencias.maxconsres}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicunidad">
              <Form.Label>TipoFirma</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="tipofirma"
                name="tipofirma"
                value={newAgencias.tipofirma}
              >
                {opciones_tipofirma}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicArchitect_prefijo">
              <Form.Label>Architect_prefijo</Form.Label>
              <Form.Control
                type="text"
                name="architect_prefijo"
                value={newAgencias.architect_prefijo}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicc">
              <Form.Label>ProcesaMuestra</Form.Label>
              <input
                type="checkbox"
                name="proc"
                checked={newAgencias.proc == "S" ? true : false}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCodager">
              <Form.Label>Codager</Form.Label>
              <Form.Control
                type="text"
                name="codager"
                value={newAgencias.codager}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDomi">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control
                type="text"
                name="domi"
                value={newAgencias.domi}
                onChange={handleNewChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={insertarAgencias}>
            Agregar Agencias
          </Button>
        </Modal.Footer>
      </Modal>
    
    
     
      </> 
    ): ( <Navigate to="/login" /> )  }
    </>

     
  ); // return
}
export default Agencias;
