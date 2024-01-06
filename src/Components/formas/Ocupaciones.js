import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
//  START INLCUIR
import { Navigate } from "react-router-dom";
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from "react";
import { AccountContext } from "../useContext/Account"; //  END INLCUIR
const Ocupaciones = () => {
  //  START INLCUIR
  const { status } = GetStatusLogin(); //Inlcuir
  const { getUser, logout } = useContext(AccountContext);
  const user = getUser();
  const [ocupacion, setOcupaciones] = useState([]);
  const [selectedOcupaciones, setSelectedOcupaciones] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newOcupaciones, setNewOcupaciones] = useState({
    codocu: "",
    nomocu: "",
  });
  const [alert, setAlert] = useState("");
  useEffect(() => {
    obtenerOcupaciones();
  }, []);
  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/ocupacion/`;
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;
  //const baseurl = 'http://127.0.0.1:8000/ocupacion/';
  //const baseurlov = 'http://127.0.0.1:8000/lov/'
  const obtenerOcupaciones = async () => {
    try {
      const response = await fetch(baseurl + "select");
      const data = await response.json();
      setOcupaciones(data.data);
      setTablaOcupaciones(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const actualizarOcupaciones = async () => {
    try {
      const response = await fetch(
        `${baseurl}update/${selectedOcupaciones.codocu}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomocu: selectedOcupaciones.nomocu,
          }),
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        setAlert("La Ocupaciones ha sido actualizada exitosamente.");
        setShowModal(false);
        obtenerOcupaciones();
        obtenerOcupaciones();
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert("Error desconocido");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarOcupaciones = async (id) => {
    if (window.confirm("�Esta seguro que desea eliminar la Ocupaciones?")) {
      try {
        const response = await fetch(`${baseurl}delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        setAlert("La Ocupaciones ha sido eliminada exitosamente.");
        obtenerOcupaciones();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedOcupaciones((prevOcupaciones) => ({
      ...prevOcupaciones,
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
    setNewOcupaciones((prevOcupaciones) => ({
      ...prevOcupaciones,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };
  const blanquearModal = () => {
    setNewOcupaciones({
      codocu: "",
      nomocu: "",
    });
    return "ok";
  };
  const insertarOcupaciones = async () => {
    console.log(newOcupaciones);
    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codocu: newOcupaciones.codocu,
          nomocu: newOcupaciones.nomocu,
        }),
      });
      const data = await response.json();
      if (response.status == 200) {
        setAlert("El(La) Ocupaciones ha sido agregado(a) exitosamente.");
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerOcupaciones();
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
  const [tablaOcupaciones, setTablaOcupaciones] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaOcupaciones.filter((elemento) => {
      if (
        elemento.codocu
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nomocu
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setOcupaciones(resultadosBusqueda);
  };
  // ******************* fin ********************************
  return (
    <>
      {user && user.username ? (
        <>
          <h1>Ocupaciones</h1>
          {alert && (
            <Alert variant="success" onClose={() => setAlert("")} dismissible>
              {alert}
            </Alert>
          )}
          <Button onClick={() => setShowNewModal(true)} className="mb-3">
            Agregar Ocupaciones
          </Button>
          <div>
            {" "}
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Busqueda por  codocu nomocu"
              onChange={handleChangeFinder}
            />{" "}
          </div>
          <Table striped bordered hover>
            <thead>
              {" "}
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ocupacion.map((ocupacion) => (
                <tr>
                  <td>{ocupacion.codocu} </td>
                  <td>{ocupacion.nomocu} </td>

                  <td>
                    <Button
                      onClick={() => {
                        setSelectedOcupaciones(ocupacion);
                        setShowModal(true);
                      }}
                      className="mx-1"
                    >
                      {" "}
                      Editar{" "}
                    </Button>
                    <Button
                      onClick={() => eliminarOcupaciones(ocupacion.codocu)}
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
              <Modal.Title>Editar Ocupaciones</Modal.Title>
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
                      name="nomocu"
                      value={selectedOcupaciones.nomocu}
                      onChange={handleChange}
                    />
                  </div>{" "}
                  {/* fin campo */}
                </div>{" "}
                {/* fin row */}
              </div>{" "}
              {/* fin container mod */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={actualizarOcupaciones}>
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
              <Modal.Title>Agregar Ocupaciones</Modal.Title>
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
                      name="codocu"
                      value={newOcupaciones.codocu}
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
                      name="nomocu"
                      value={newOcupaciones.nomocu}
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
              <Button
                variant="secondary"
                onClick={() => setShowNewModal(false)}
              >
                Cerrar
              </Button>
              <Button variant="primary" onClick={insertarOcupaciones}>
                Agregar Ocupaciones
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default Ocupaciones;
