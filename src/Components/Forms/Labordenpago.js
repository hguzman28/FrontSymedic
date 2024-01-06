import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";

const Labordenpago = ({ miage, miord }) => {
  const [labordenpago, setLabordenpago] = useState([]);
  const [selectedLabordenpago, setSelectedLabordenpago] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newLabordenpago, setNewLabordenpago] = useState({
    codage: `${miage}`,
    numorden: `${miord}`,
    codmed: "",
    valor: "",
    pend: "",
  });
  const [alert, setAlert] = useState("");
  useEffect(() => {
    obtenerLabordenpago();
    mapear_codmed();
  }, []);
  // const baseurl = "http://127.0.0.1:8000/labordenpago/";
  // const baseurlov = "http://127.0.0.1:8000/lov/";
  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labordenpago/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
  const obtenerLabordenpago = async () => {
    try {
      const response = await fetch(
        baseurl + "select/" + `${miage}` + "/" + `${miord}`
      );
      const data = await response.json();
      setLabordenpago(data.data);
      setTablaLabordenpago(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const actualizarLabordenpago = async () => {
    try {
      const response = await fetch(
        `${baseurl}update/${selectedLabordenpago.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codage: selectedLabordenpago.codage,
            numorden: selectedLabordenpago.numorden,
            codmed: selectedLabordenpago.codmed,
            valor: selectedLabordenpago.valor,
            pend: selectedLabordenpago.pend,
          }),
        }
      );
      const data = await response.json();
      setAlert("La Labordenpago ha sido actualizada exitosamente.");
      setShowModal(false);
      obtenerLabordenpago();
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarLabordenpago = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar la Labordenpago?")) {
      try {
        const response = await fetch(`${baseurl}delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        setAlert("La Labordenpago ha sido eliminada exitosamente.");
        obtenerLabordenpago();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedLabordenpago((prevLabordenpago) => ({
      ...prevLabordenpago,
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
    setNewLabordenpago((prevLabordenpago) => ({
      ...prevLabordenpago,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };
  const [opciones_codmed, setOpcionesCodmed] = useState([]);
  const mapear_codmed = async () => {
    try {
      const response = await fetch(baseurlov + "mediospago");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCodmed(opciones);
    } catch (error) {
      console.error(error);
    }
  };
  const blanquearModal = () => {
    setNewLabordenpago({
      codage: `${miage}`,
      numorden: `${miord}`,
      codmed: "",
      valor: "",
      pend: "",
    });
    return "ok";
  };
  const insertarLabordenpago = async () => {
    console.log(newLabordenpago);
    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codage: newLabordenpago.codage,
          numorden: newLabordenpago.numorden,
          codmed: newLabordenpago.codmed,
          valor: newLabordenpago.valor,
          pend: newLabordenpago.pend,
        }),
      });
      const data = await response.json();
      setAlert("La Labordenpago ha sido agregada exitosamente.");
      setShowNewModal(false);
      const x = blanquearModal();
      obtenerLabordenpago();
    } catch (error) {
      console.error(error);
    }
  };
  // ******************** busquedas ******************************
  const [tablaLabordenpago, setTablaLabordenpago] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaLabordenpago.filter((elemento) => {
      if (
        elemento.codmed
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.autored
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setLabordenpago(resultadosBusqueda);
  };
  // ******************* fin ********************************
  return (
    <>
      <h1>Pagos</h1>
      {alert && (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      )}
      <Button onClick={() => setShowNewModal(true)} className="mb-3">
        Agregar Pagos
      </Button>
      <div>
        {" "}
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Busqueda por "
          onChange={handleChangeFinder}
        />{" "}
      </div>
      <Table striped bordered hover>
        <thead>
          {" "}
          <tr>
            <th>Agencia</th>
            <th>Orden</th>
            <th>Medio Pago</th>
            <th>Valor</th>
            <th>Pendiente</th>
            <th>Fecha</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {labordenpago.map((pago) => (
            <tr>
              <td>{pago.codage} </td>
              <td>{pago.numorden} </td>
              <td>{pago.codmed} </td>
              <td>{pago.valor} </td>
              <td>{pago.pend} </td>
              <td>{pago.fecha} </td>
              <td>
                <Button
                  onClick={() => {
                    setSelectedLabordenpago(pago);
                    setShowModal(true);
                  }}
                  className="mx-1"
                >
                  {" "}
                  Editar{" "}
                </Button>
                <Button
                  onClick={() => eliminarLabordenpago(pago.id)}
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
          <Modal.Title>Editar Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCodage">
              <Form.Label>Agencia</Form.Label>
              <Form.Control
                type="text"
                name="codage"
                value={selectedLabordenpago.codage}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicNumorden">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="text"
                name="numorden"
                value={selectedLabordenpago.numorden}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicCodmed">
              <Form.Label>Medio Pago</Form.Label>
              <select
                onChange={handleChange}
                className="form-control"
                id="codmed"
                name="codmed"
                value={selectedLabordenpago.codmed}
              >
                {" "}
                {opciones_codmed}
              </select>{" "}
            </Form.Group>
            <Form.Group controlId="formBasicValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                name="valor"
                value={selectedLabordenpago.valor}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPend">
              <Form.Label>Pendiente</Form.Label>
              <Form.Control
                type="text"
                name="pend"
                value={selectedLabordenpago.pend}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizarLabordenpago}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCodage">
              <Form.Label>Agencia</Form.Label>
              <Form.Control
                type="text"
                name="codage"
                value={newLabordenpago.codage}
                onChange={handleNewChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicNumorden">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="text"
                name="numorden"
                value={newLabordenpago.numorden}
                onChange={handleNewChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicCodmed">
              <Form.Label>Medio Pago</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="codmed"
                name="codmed"
                value={newLabordenpago.codmed}
              >
                {" "}
                {opciones_codmed}
              </select>{" "}
            </Form.Group>
            <Form.Group controlId="formBasicValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                name="valor"
                value={newLabordenpago.valor}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPend">
              <Form.Label>Pendiente</Form.Label>
              <Form.Control
                type="text"
                name="pend"
                value={newLabordenpago.pend}
                onChange={handleNewChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={insertarLabordenpago}>
            Agregar Labordenpago
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Labordenpago;
