import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Alert,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Analisis = (props) => {



//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


  const [analisis, setAnalisis] = useState([]);
  const [selectedAnalisis, setSelectedAnalisis] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newAnalisis, setNewAnalisis] = useState({
    cdgexamen: `${props.miexamen}`,
    cdganalisis: "",
    nombre: "",
    unicodi: "",
    tipores: "",
    cdganalisisa: "S",
    cdganalisisb: "",
    tiponorm: "",
    aplica: "S",
    redondear: "0",
    redondeo: "0",
    tecnica: "0",
    grupo: "1",
    orden: "99",
  });

  const [modalMensaje, setModalMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  // para las listas
  const [opciones_maeunid, setOpcionesMaeUnid] = useState([]);
  const [opciones_tipores, setOpcionesTipores] = useState([]);
  const [opciones_tiponorm, setOpcionesTiponorm] = useState([]);

  const [alert, setAlert] = useState("");
  useEffect(() => {
    obtenerAnalisis();
    mapear_tiponorm();
    mapear_tipores();
    mapear_unidades();
  }, []);
 // const baseurl = "http://127.0.0.1:8000/analisis/";
 // const baseurlov = "http://127.0.0.1:8000/lov/";
 const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/analisis/`; 
 const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

  const obtenerAnalisis = async () => {
    try {
      const response = await fetch(`${baseurl}select/${props.miexamen}`);
      const data = await response.json();
      setAnalisis(data.data);
      setTablaAnalisis(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_unidades = async () => {
    try {
      const response = await fetch(baseurlov + "mae_unid");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesMaeUnid(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_tipores = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "T", name: "Texto" },
        { id: "N", name: "Numero" },
        { id: "F", name: "Formula" },
      ];

      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesTipores(opciones);
    } catch (error) {
      console.error(error);
    }
  };
  const mapear_tiponorm = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "E", name: "Edad" },
        { id: "R", name: "Ritmo" },
        { id: "S", name: "Sexo" },
        { id: "SE", name: "Sexo-edad" },
        { id: "U", name: "Unico" },
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesTiponorm(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarAnalisis = async () => {
    try {
      const response = await fetch(`${baseurl}update/${selectedAnalisis.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cdgexamen: selectedAnalisis.cdgexamen,
          cdganalisis: selectedAnalisis.cdganalisis,
          nombre: selectedAnalisis.nombre,
          unicodi: selectedAnalisis.unicodi,
          tipores: selectedAnalisis.tipores,
          cdganalisisa: selectedAnalisis.cdganalisisa,
          tiponorm: selectedAnalisis.tiponorm,
          aplica: selectedAnalisis.aplica,
          redondear: selectedAnalisis.redondear,
          redondeo: selectedAnalisis.redondeo,
          tecnica: selectedAnalisis.tecnica,
          grupo: selectedAnalisis.grupo,
          orden: selectedAnalisis.orden,
        }),
      });
      const data = await response.json();

      if (response.status == 200) {
        setAlert("La Analisis ha sido actualizada exitosamente.");
        setShowModal(false);
        obtenerAnalisis();
      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }



    } catch (error) {
      console.error(error);
    }
  };
  const eliminarAnalisis = async (id) => {
    if (window.confirm("¿Esta seguro que desea eliminar la Analisis?")) {
      try {
        const response = await fetch(`${baseurl}delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        setAlert("La Analisis ha sido eliminada exitosamente.");
        obtenerAnalisis();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedAnalisis((prevAnalisis) => ({
      ...prevAnalisis,
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
    setNewAnalisis((prevAnalisis) => ({
      ...prevAnalisis,
      [name]:
        event.target.type == "checkbox"
          ? event.target.checked
            ? "S"
            : "N"
          : value,
    }));
  };

  const blanquearModal = () => {
    setNewAnalisis({
      cdgexamen: "",
      cdganalisis: null,
      nombre: "",
      unicodi: "",
      tipores: "",
      cdganalisisa: "S",
      tiponorm: "",
      aplica: "1",
      redondear: "",
      redondeo: "",
      tecnica: "",
      grupo: "",
      orden: "",
    });
    return "ok";
  };
  const insertarAnalisis = async () => {
    //alert('va a insertar analisis');
    console.log(newAnalisis);

    try {
      const response = await fetch(baseurl + "insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cdgexamen: newAnalisis.cdgexamen,
          cdganalisis: newAnalisis.cdganalisis,
          nombre: newAnalisis.nombre,
          unicodi: newAnalisis.unicodi,
          tipores: newAnalisis.tipores,
          cdganalisisa: newAnalisis.cdganalisisa,
          tiponorm: newAnalisis.tiponorm,
          aplica: newAnalisis.aplica,
          redondear: newAnalisis.redondear,
          redondeo: newAnalisis.redondeo,
          tecnica: newAnalisis.tecnica,
          grupo: newAnalisis.grupo,
          orden: newAnalisis.orden,
        }),
      });
      const data = await response.json();

      if (response.status == 200) {
        setAlert("El Analisis ha sido agregada exitosamente.");
        setShowNewModal(false);
        const x = this.blanquearModal();
        obtenerAnalisis();
        } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }
  



    } catch (error) {
      //setAlert(error);
      console.log(error);
      console.error(error);
    }
  };
  // ******************** busquedas ******************************
  const [tablaAnalisis, setTablaAnalisis] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaAnalisis.filter((elemento) => {
      if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setAnalisis(resultadosBusqueda);
  };
  // ******************* fin ********************************
  return (
    <>
    { user && user.username ? ( 
    <> 

      <h3>
        Analisis de {props.miexamen}. {props.mititulo}
      </h3>
      
     

      {alert && (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      )}
      <Button onClick={() => setShowNewModal(true)} className="mb-3">
        Agregar Analisis
      </Button>
      <br></br>

      <Button onClick={() => props.retornar('')} className="mb-3">
        Regresar a Examenes
      </Button>
      
      <div style={{ display: (analisis && analisis.length >0) ? "block" : "none" }} >
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
            <th>id</th>
            <th>Examen</th>
            <th>Analisis</th>
            <th>nombre</th>
            <th>unicodi</th>
            <th>tipores</th>
            <th>Activo</th>

            <th>tiponorm</th>
            <th>aplica</th>
            <th>redondear</th>
            <th>redondeo</th>

            <th>tecnica</th>
            <th>grupo</th>
            <th>orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {analisis.map((analisis) => (
            <tr>
              <td>{analisis.id} </td>
              <td>{analisis.cdgexamen} </td>
              <td>{analisis.cdganalisis} </td>
              <td>{analisis.nombre} </td>
              <td>{analisis.unicodi} </td>
              <td>{analisis.tipores} </td>
              <td>{analisis.cdganalisisa} </td>

              <td>{analisis.tiponorm} </td>
              <td>{analisis.aplica} </td>
              <td>{analisis.redondear} </td>
              <td>{analisis.redondeo} </td>

              <td>{analisis.tecnica} </td>
              <td>{analisis.grupo} </td>
              <td>{analisis.orden} </td>

              <td>
                <Button
                  onClick={() => {
                    setSelectedAnalisis(analisis);
                    setShowModal(true);
                  }}
                  className="mx-1"
                >
                  {" "}
                  Editar{" "}
                </Button>


                <Button
                  onClick={() => {
                    props.retornar2(analisis.cdganalisis);
                    props.retornar(analisis.cdgexamen);
                    
                   // <Labnormal miexamen={examen} mititulo={nomexamen} mianalisis={analisis} retornar={setExamen}  retornar2={setAnalisis} />
  
                  }}
                  className="mx-1"
                >
                  {" "}
                  Normales{" "}
                </Button> 

                <Button
                  onClick={() => eliminarAnalisis(analisis.id)}
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
          <Modal.Title>Editar Analisis</Modal.Title>
        </Modal.Header>
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
        )}   

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCdgexamen">
              <Form.Label>Cdgexamen</Form.Label>
              <Form.Control
                type="text"
                name="cdgexamen"
                value={selectedAnalisis.cdgexamen}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicCdganalisis">
              <Form.Label>Cdganalisis</Form.Label>
              <Form.Control
                type="text"
                name="cdganalisis"
                value={selectedAnalisis.cdganalisis}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedAnalisis.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicunidad">
              <Form.Label>Unidad</Form.Label>
              <select
                onChange={handleChange}
                className="form-control"
                id="unicodi"
                name="unicodi"
                value={selectedAnalisis.unicodi}
              >
                {opciones_maeunid}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasictiposerv">
              <Form.Label>TipoRes</Form.Label>
              <select
                onChange={handleChange}
                className="form-control"
                id="tipores"
                name="tipores"
                value={selectedAnalisis.tipores}
              >
                {opciones_tipores}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicEntlun">
              <Form.Label>Activo</Form.Label>
              <input
                type="checkbox"
                name="cdganalisisa"
                checked={selectedAnalisis.cdganalisisa == "S" ? true : false}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasictiposerv">
              <Form.Label>TipoNormal</Form.Label>
              <select
                onChange={handleChange}
                className="form-control"
                id="tiponorm"
                name="tiponorm"
                value={selectedAnalisis.tiponorm}
              >
                {opciones_tiponorm}
              </select>
            </Form.Group>


            <Form.Group controlId="formBasicEntlun">
              <Form.Label>Aplica</Form.Label>
              <input
                type="checkbox"
                name="aplica"
                checked={selectedAnalisis.aplica == "S" ? true : false}
                value= {selectedAnalisis.aplica}
                onChange={handleChange}
              />
            </Form.Group>      


            <Form.Group controlId="formBasicRedondear">
              <Form.Label>Redondear</Form.Label>
              <Form.Control
                type="text"
                name="redondear"
                value={selectedAnalisis.redondear}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicRedondeo">
              <Form.Label>Redondeo</Form.Label>
              <Form.Control
                type="text"
                name="redondeo"
                value={selectedAnalisis.redondeo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicTecnica">
              <Form.Label>Tecnica</Form.Label>
              <Form.Control
                type="text"
                name="tecnica"
                value={selectedAnalisis.tecnica}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicGrupo">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                type="text"
                name="grupo"
                value={selectedAnalisis.grupo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicOrden">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="text"
                name="orden"
                value={selectedAnalisis.orden}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizarAnalisis}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Analisis</Modal.Title>
        </Modal.Header>
        {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}   

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                name="id"
                disabled
                value={newAnalisis.id}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCdgexamen">
              <Form.Label>Cdgexamen</Form.Label>
              <Form.Control
                type="text"
                name="cdgexamen"
                value={newAnalisis.cdgexamen}
                onChange={handleNewChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicCdganalisis">
              <Form.Label>Cdganalisis</Form.Label>
              <Form.Control
                type="text"
                name="cdganalisis"
                value={newAnalisis.cdganalisis}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newAnalisis.nombre}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicunidad">
              <Form.Label>Unidad</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="unicodi"
                name="unicodi"
                value={newAnalisis.unicodi}
              >
                {opciones_maeunid}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasictiposerv">
              <Form.Label>TipoRes</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="tipores"
                name="tipores"
                value={newAnalisis.tipores}
              >
                {opciones_tipores}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicEntlun">
              <Form.Label>Activo</Form.Label>
              <input
                type="checkbox"
                name="cdganalisisa"
                checked={newAnalisis.cdganalisisa == "S" ? true : false}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasictiposerv">
              <Form.Label>TipoNormal</Form.Label>
              <select
                onChange={handleNewChange}
                className="form-control"
                id="tiponorm"
                name="tiponorm"
                value={newAnalisis.tiponorm}
              >
                {opciones_tiponorm}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicEntlun">
              <Form.Label>Aplica</Form.Label>
              <input
                type="checkbox"
                name="aplica"
                checked={newAnalisis.aplica == "S" ? true : false}
                onChange={handleNewChange}
              />
            </Form.Group>      

            <Form.Group controlId="formBasicRedondear">
              <Form.Label>Redondear</Form.Label>
              <Form.Control
                type="text"
                name="redondear"
                value={newAnalisis.redondear}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicRedondeo">
              <Form.Label>Redondeo</Form.Label>
              <Form.Control
                type="text"
                name="redondeo"
                value={newAnalisis.redondeo}
                onChange={handleNewChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicTecnica">
              <Form.Label>Tecnica</Form.Label>
              <Form.Control
                type="text"
                name="tecnica"
                value={newAnalisis.tecnica}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicGrupo">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                type="text"
                name="grupo"
                value={newAnalisis.grupo}
                onChange={handleNewChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicOrden">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="text"
                name="orden"
                value={newAnalisis.orden}
                onChange={handleNewChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={insertarAnalisis}>
            Agregar Analisis
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal isOpen={modalMensaje}>
        <ModalBody>{mensaje}</ModalBody>
        <ModalFooter>
          <button
            className="btn btn-secundary"
            onClick={() => setModalMensaje(false)}
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
       
    </div> 
     </>
    ): ( <Navigate to="/login" /> )  }
    </>
  );
};
export default Analisis;
