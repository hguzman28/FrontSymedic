import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, } from 'react-bootstrap';


//  START INLCUIR 
import { Navigate } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Combosdet = () => {


  //  START INLCUIR 
  const { status } = GetStatusLogin(); //Inlcuir
  // const [status, setstatus] = useState(false); 
  const { getUser, logout } = useContext(AccountContext);
  const user = getUser();

  console.log("#########");
  console.log(user)
  console.log(status)
  //  END INLCUIR 



  const [labcombodet, setCombosdet] = useState([]);
  const [selectedLabcombosdet, setSelectedLabcombosdet] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newLabcombosdet, setNewLabcombosdet] = useState({
    codcombo: '',
    cdgexamen: '',
    valor: ''
  });
  const [alert, setAlert] = useState('');

  const [grantotal, setGrantotal] = useState(0);

  useEffect(() => {
    obtenerCombosdet();
  }, []);

  const baseserver = `${process.env.REACT_APP_ENDPOINT_DATA}/`;
  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/labcombodet/`;
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;

  const obtenerCombosdet = async () => {
    try {
      const response = await fetch(baseurl + 'select');
      const data = await response.json();
      setCombosdet(data.data);
      setTablaCombosdet(data.data);

      /* setGrantotal(0);
       Combosdet.map((obj) => {
         //subtotal = subtotal + 1
         setGrantotal(grantotal + obj.valor);
       }); 
       */



    } catch (error) {
      console.error(error);
    }
  };

  function validar_examen(exa) {
    fetch(baseserver+"validate/examenes/" + exa )
    .then(response => response.json())
    .then(data => {
      //console.log("Dentro fetch exitoso paciente");
      const nombres = '';
      nombres = data.data[0].nombre ;
      return(nombres);
    })
    .catch(error => {
      console.error(error);
      return(null);
    });
}


  const actualizarLabcombosdet = async () => {
    try {
      const response = await fetch(
        `${baseurl}update/${selectedLabcombosdet.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            codcombo: selectedLabcombosdet.codcombo,
            cdgexamen: selectedLabcombosdet.cdgexamen,
            valor: selectedLabcombosdet.valor
          })
        });
      const data = await response.json();
      if (response.status == 200) {
        setAlert('La Labcombosdet ha sido actualizada exitosamente.');
        setShowModal(false);
        obtenerCombosdet();
      }
      else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }

    } catch (error) {
      console.error(error);
    }
  };
  const eliminarLabcombosdet = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar la Labcombosdet?')) {
      try {
        const response = await fetch(
          `${baseurl}delete/${id}`,
          {
            method: 'DELETE',
          }
        );
        const data = await response.json();
        setAlert('La Labcombosdet ha sido eliminada exitosamente.');
        obtenerCombosdet();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedLabcombosdet((prevLabcombosdet) => ({
      ...prevLabcombosdet,
      [name]: value
    }));
  };
  const handleNewChange = (event) => {
    const { name, value } = event.target;
    setNewLabcombosdet((prevLabcombosdet) => ({
      ...prevLabcombosdet,
      [name]: value,
    }));
  };
  const blanquearModal = () => {
    setNewLabcombosdet({
      codcombo: '',
      cdgexamen: '',
      valor: ''

    }); return ('ok');
  }
  const insertarLabcombosdet = async () => {
    console.log(newLabcombosdet);
    try {
      const response = await fetch(baseurl + 'insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: newLabcombosdet.id,
          codcombo: newLabcombosdet.codcombo,
          cdgexamen: newLabcombosdet.cdgexamen,
          valor: newLabcombosdet.valor
        })
      });
      const data = await response.json();
      if (response.status == 200) {
        setAlert('La Labcombosdet ha sido agregada exitosamente.');
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerCombosdet();
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
  const [tablaCombosdet, setTablaCombosdet] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  const filtrar = (terminoBusqueda) => {

    var resultadosBusqueda = tablaCombosdet.filter((elemento) => {

      if (elemento.codcombo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.cdgexamen.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {//subtotal = subtotal + elemento.valor?0:Number(elemento.valor); // valor del combo 
        return elemento;
      }
    });
    setCombosdet(resultadosBusqueda);
    setGrantotal(0);

    const total = resultadosBusqueda.reduce(
      (acc, exam) => acc + exam.valor, 0);
    setGrantotal(total);

  }
  // ******************* fin ******************************** 
  return (
    <>
      {user && user.username ? (
        <>
          <h1>Detalle de Combos</h1>
          {alert && (
            <Alert variant='success' onClose={() => setAlert('')} dismissible>
              {alert}
            </Alert>
          )}
          <Button onClick={() => setShowNewModal(true)} className='mb-3'>
            Agregar Labcombosdet
          </Button>
          <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Búsqueda por ' onChange={handleChangeFinder} /> </div>
          <br>
          </br>
          <div> <Form.Label>Total del Paquete</Form.Label>
            <input className='form-control' value={grantotal} />
          </div>

          <Table striped bordered hover>
            <thead> <tr>
              <th>id</th>
              <th>codcombo</th>
              <th>cdgexamen</th>
              <th>Nombre</th>
              <th>valor</th>
              <th>Acciones</th>
            </tr></thead>
            <tbody>
              {labcombodet.map((combodet) => (
                <tr>
                  <td>{combodet.id} </td>
                  <td>{combodet.codcombo} </td>
                  <td>{combodet.cdgexamen} </td>
                  <td> {combodet.nombre} </td>
                  <td>{combodet.valor} </td>

                  <td><Button
                    onClick={() => {
                      setSelectedLabcombosdet(combodet)
                      setShowModal(true)
                    }}
                    className='mx-1'
                  > Editar </Button>
                    <Button
                      onClick={() => eliminarLabcombosdet(combodet.id)}
                      className='btn btn-danger' >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Labcombosdet</Modal.Title>
            </Modal.Header>
            {alert && (
              <Alert variant='success' onClose={() => setAlert('')} dismissible>
                {alert}
              </Alert>
            )}

            <Modal.Body>
              <Form>
                <Form.Group controlId='formBasicCodcombo'>
                  <Form.Label>Codcombo</Form.Label>
                  <Form.Control
                    type='text'
                    name='codcombo'
                    value={selectedLabcombosdet.codcombo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicCdgexamen'>
                  <Form.Label>Cdgexamen</Form.Label>
                  <Form.Control
                    type='text'
                    name='cdgexamen'
                    value={selectedLabcombosdet.cdgexamen}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicValor'>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    type='text'
                    name='valor'
                    value={selectedLabcombosdet.valor}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
              <Button variant='primary' onClick={actualizarLabcombosdet}>
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Labcombosdet</Modal.Title>
            </Modal.Header>
            {alert && (
              <Alert variant='success' onClose={() => setAlert('')} dismissible>
                {alert}
              </Alert>
            )}

            <Modal.Body>
              <Form>
                <Form.Group controlId='formBasicId'>
                  <Form.Label>Id</Form.Label>
                  <Form.Control
                    type='text'
                    name='id'
                    value={newLabcombosdet.id}
                    onChange={handleNewChange}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicCodcombo'>
                  <Form.Label>Codcombo</Form.Label>
                  <Form.Control
                    type='text'
                    name='codcombo'
                    value={newLabcombosdet.codcombo}
                    onChange={handleNewChange}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicCdgexamen'>
                  <Form.Label>Cdgexamen</Form.Label>
                  <Form.Control
                    type='text'
                    name='cdgexamen'
                    value={newLabcombosdet.cdgexamen}
                    onChange={handleNewChange}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicValor'>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    type='text'
                    name='valor'
                    value={newLabcombosdet.valor}
                    onChange={handleNewChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShowNewModal(false)}>
                Cerrar
              </Button>
              <Button variant='primary' onClick={insertarLabcombosdet}>
                Agregar Labcombosdet
              </Button>
            </Modal.Footer>
          </Modal>


        </>
      ) : (<Navigate to="/login" />)}
    </>


  )
}
export default Combosdet