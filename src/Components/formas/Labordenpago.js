import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Labordenpago = ({ miage, miord ,regresar}) => {

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();
const [usuario,setUsuario] = useState('');

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


  const [labordenpago, setLabordenpago] = useState([]);
  const [selectedLabordenpago, setSelectedLabordenpago] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const [totpac,setTotpac] = useState(0);
  const [gtotal,setGtotal] = useState(0);
  const [saldo,setSaldo] = useState(0);
  

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
    setUsuario(user.username);
  }, []);

  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labordenpago/`; 
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 // const baseurl = "http://127.0.0.1:8000/labordenpago/";
 // const baseurlov = "http://127.0.0.1:8000/lov/";
  const obtenerLabordenpago = async () => {
    try {
      const response = await fetch(
        baseurl + "select/" + `${miage}` + "/" + `${miord}`
      );
      const data = await response.json();
      setLabordenpago(data.data);
      
      
      let acumulado = 0;
      for (let i = 0; i<data.data.length; i++){
        acumulado = acumulado + data.data[i].valor;
        
      }
      setGtotal(acumulado);
      let totpaci = 0;
      if (data.data[0].totpac == null){
       totpaci = 0;
      }
      else
        { totpaci = data.data[0].totpac }
      setSaldo(totpaci - acumulado);
      setTotpac(totpaci);
  
     // setTablaLabordenpago(data.data);
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


      if (response.status == 200) {
        setAlert("El pago ha sido actualizado exitosamente.");
        setShowModal(false);
        obtenerLabordenpago();
          } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }

    
    
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

      
        if (response.status == 200) {
          setAlert("El registro ha sido eliminado exitosamente.");
          obtenerLabordenpago();
         } else if (response.status == 400) {
          setAlert(data.detail);
        } else {
          setAlert('Error desconocido');
        }
  
      
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
        body: JSON.stringify({datos:{
          codage: newLabordenpago.codage,
          numorden: newLabordenpago.numorden,
          codmed: newLabordenpago.codmed,
          valor: newLabordenpago.valor,
          pend: 'N', //newLabordenpago.pend
        },control:{usuario: usuario}}),
      });
      const data = await response.json();


      if (response.status == 200) {
        setAlert("El registro ha sido agregada exitosamente.");
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerLabordenpago();
        } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }
    

    } catch (error) {
      console.error(error);
    }
  };

  //const [usuario, setUsuario] = useState('');

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
    { user && user.username ? ( 
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
      {" "}
      <Button onClick={() => {regresar('ORDEN');}} className="mb-3">
        Regresar a la Orden
      </Button>
      
      <div><h2>Total Paciente: {totpac}</h2></div>
      <div><h2>Total Abonado: {gtotal}</h2></div>
      <div ><h2>Total por pagar: {saldo}</h2></div>
      
      

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
            <th>Usuario</th>
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
              <td>{pago.usucre} </td>
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
                {/* <Button
                  onClick={() => eliminarLabordenpago(pago.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </Button> */}
              </td>
            </tr>
            
            
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Pagos</Modal.Title>
        </Modal.Header>
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

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
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

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
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default Labordenpago;
