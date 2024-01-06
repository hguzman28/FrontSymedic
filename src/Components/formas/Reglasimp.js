import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, } from 'react-bootstrap';
//  START INLCUIR              
import { Navigate } from 'react-router-dom';
import { GetStatusLogin } from '../GetStatusLogin';
import { useContext } from 'react';
import { AccountContext } from '../useContext/Account'; //  END INLCUIR  
const Reglasimp = () => {
    //  START INLCUIR    
    const { status } = GetStatusLogin(); //Inlcuir  
    const { getUser, logout } = useContext(AccountContext);
    const user = getUser();
    const [reglasimp, setReglasimp] = useState([]);
    const [selectedReglasimp, setSelectedReglasimp] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newReglasimp, setNewReglasimp] = useState({
        id: '',
        tipodoc: '',
        tipocli: '',
        pagado: '',
        firmado: '',
        imprimir: '',
        causal: '',
    });
    const [alert, setAlert] = useState('');
    useEffect(() => {
        obtenerReglasimp();
        mapear_tipocli();
        mapear_imprimir();
    }, []);
    const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/reglasimp/`;
    const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`;
    //const baseurl = 'http://127.0.0.1:8000/reglasimp/'; 
    //const baseurlov = 'http://127.0.0.1:8000/lov/'  
    const obtenerReglasimp = async () => {
        try {
            const response = await fetch(baseurl + 'select');
            const data = await response.json();
            setReglasimp(data.data);
            setTablaReglasimp(data.data);
        } catch (error) {
            console.error(error);
        }
    };
    const actualizarReglasimp = async () => {
        try {
            const response = await fetch(
                `${baseurl}update/${selectedReglasimp.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tipodoc: selectedReglasimp.tipodoc,
                        tipocli: selectedReglasimp.tipocli,
                        pagado: selectedReglasimp.pagado,
                        firmado: selectedReglasimp.firmado,
                        imprimir: selectedReglasimp.imprimir,
                        causal: selectedReglasimp.causal,
                    })
                });
            const data = await response.json();
            if (response.status == 200) {
                setAlert('La Reglasimp ha sido actualizada exitosamente.');
                setShowModal(false);
                obtenerReglasimp();
                obtenerReglasimp();
            } else if (response.status == 400) { setAlert(data.detail); } else { setAlert('Error desconocido'); }
        } catch (error) {
            console.error(error);
        }
    };
    const eliminarReglasimp = async (id) => {
        if (window.confirm('Esta seguro que desea eliminar la Reglasimp?')) {
            try {
                const response = await fetch(
                    `${baseurl}delete/${id}`,
                    {
                        method: 'DELETE',
                    }
                );
                const data = await response.json();
                setAlert('La Reglasimp ha sido eliminada exitosamente.');
                obtenerReglasimp();
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedReglasimp((prevReglasimp) => ({
            ...prevReglasimp,
            [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
        }));
    };
    const handleNewChange = (event) => {
        const { name, value } = event.target;
        setNewReglasimp((prevReglasimp) => ({
            ...prevReglasimp,
            [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
        }));
    };
    const [opciones_tipocli, setOpcionesTipocli] = useState([]); const [opciones_imprimir, setOpcionesImprimir] = useState([]);
    const mapear_tipocli = async () => {
        try {
            const listado = [{ "id": "", "name": "Seleccione opcion" }, { "id": "X", "name": "Externo" }, { "id": "I", "name": "Interno" }, { "id": "E", "name": "Externo" }, { "id": "M", "name": "Medico" }];
            const opciones = listado.map((obj) => (
                <option key={obj.id} value={obj.id}>
                    {obj.name}
                </option>));
            setOpcionesTipocli(opciones);
        } catch (error) {
            console.error(error);
        }
    }

    const mapear_imprimir = async () => {
        try {
            const listado = [{ "id": "", "name": "Seleccione opcion" }, { "id": "S", "name": "SI" }, { "id": "N", "name": "NO" }, { "id": "SP", "name": "Vista Previa" }];
            const opciones = listado.map((obj) => (
                <option key={obj.id} value={obj.id}>
                    {obj.name}
                </option>));
            setOpcionesImprimir(opciones);
        } catch (error) {
            console.error(error);
        }
    }
    const blanquearModal = () => {
        setNewReglasimp({
            id: '',
            tipodoc: '',
            tipocli: '',
            pagado: '',
            firmado: '',
            imprimir: '',
            causal: '',

        }); return ('ok');
    }
    const insertarReglasimp = async () => {
        console.log(newReglasimp);
        try {
            const response = await fetch(baseurl + 'insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tipodoc: newReglasimp.tipodoc,
                    tipocli: newReglasimp.tipocli,
                    pagado: newReglasimp.pagado,
                    firmado: newReglasimp.firmado,
                    imprimir: newReglasimp.imprimir,
                    causal: newReglasimp.causal,
                })
            });
            const data = await response.json();
            if (response.status == 200) {
                setAlert('El(La) Reglas de Impresion ha sido agregado(a) exitosamente.');
                setShowNewModal(false);
                const x = blanquearModal();
                obtenerReglasimp();
            } else if (response.status == 400) { setAlert(data.detail); } else { setAlert('Error desconocido'); }
        } catch (error) {
            console.error(error);
        }
    };
    // ******************** busquedas ****************************** 
    const [tablaReglasimp, setTablaReglasimp] = useState([]);
    const [busqueda, setBusqueda] = useState();
    const handleChangeFinder = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }
    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaReglasimp.filter((elemento) => {
            if (elemento.tipodoc.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.tipocli.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) { return elemento; }
        });
        setReglasimp(resultadosBusqueda);
    }
    // ******************* fin ******************************** 
    return (
        <> {user && user.username ? (<>
            <h1>Reglas de Impresion</h1>
            {alert && (
                <Alert variant='success' onClose={() => setAlert('')} dismissible>
                    {alert}
                </Alert>
            )}
            <Button onClick={() => setShowNewModal(true)} className='mb-3'>
                Agregar Reglas de Impresion
            </Button>
            <div> <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por  tipodoc tipocli' onChange={handleChangeFinder} /> </div>
            <Table striped bordered hover>
                <thead> <tr>
                    <th>TipoDocumento</th>
                    <th>TipoCliente</th>
                    <th>Pagado</th>
                    <th>Firmado</th>
                    <th>Imprimir</th>
                    <th>Causal</th>
                    <th>Acciones</th>
                </tr></thead>
                <tbody>
                    {reglasimp.map((regla) => (
                        <tr>
                            <td>{regla.tipodoc} </td>
                            <td>{regla.tipocli} </td>
                            <td>{regla.pagado} </td>
                            <td>{regla.firmado} </td>
                            <td>{regla.imprimir} </td>
                            <td>{regla.causal} </td>

                            <td><Button
                                onClick={() => {
                                    setSelectedReglasimp(regla)
                                    setShowModal(true)
                                }}
                                className='mx-1'
                            > Editar </Button>
                                <Button
                                    onClick={() => eliminarReglasimp(regla.id)}
                                    className='btn btn-danger' >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} size='xl' >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Reglas de Impresion</Modal.Title>
                </Modal.Header>
                {alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible>
                    {alert}
                </Alert>)}
                <Modal.Body>
                    <div class='container' >
                        <div class='row'>
                            <div class='col' > {/* 2  */}
                                <label for='lbl'>TipoDocumento</label>
                                <input
                                    type='text' class='form-control'
                                    name='tipodoc'
                                    value={selectedReglasimp.tipodoc}
                                    onChange={handleChange}
                                />
                            </div> {/* fin campo */}
                        </div> {/* fin row */}
                        <div class='col' > {/* 1  */}
                            <label for='lbl'>TipoCliente</label>
                            <select onChange={handleChange} class='col form-select form-select-sm' id='tipocli' name='tipocli' value={selectedReglasimp.tipocli} > {opciones_tipocli}
                            </select>   </div> {/* fin campo */}
                        <div class='row'>
                            <div class='col' > {/* 2  */}
                                <label for='lbl'>Pagado</label>
                                <input type='checkbox' name='pagado' checked={selectedReglasimp.pagado == 'S' ? true : false}
                                    onChange={handleChange} />
                            </div> {/* fin campo */}
                        </div> {/* fin row */}
                        <div class='col' > {/* 1  */}
                            <label for='lbl'>Firmado</label>
                            <input type='checkbox' name='firmado' checked={selectedReglasimp.firmado == 'S' ? true : false}
                                onChange={handleChange} />
                        </div> {/* fin campo */}
                        <div class='row'>
                            <div class='col' > {/* 2  */}
                                <label for='lbl'>Imprimir</label>
                                <select onChange={handleChange} class='col form-select form-select-sm' id='imprimir' name='imprimir' value={selectedReglasimp.imprimir} > {opciones_imprimir}
                                </select>   </div> {/* fin campo */}
                        </div> {/* fin row */}
                        <div class='col' > {/* 1  */}
                            <label for='lbl'>Causal</label>
                            <input
                                type='text' class='form-control'
                                name='causal'
                                value={selectedReglasimp.causal}
                                onChange={handleChange}
                            />
                        </div> {/* fin campo */}
                    </div> {/* fin container mod */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant='primary' onClick={actualizarReglasimp}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showNewModal} onHide={() => setShowNewModal(false)} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Reglas de Impresion</Modal.Title>
                </Modal.Header>
                {alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible>
                    {alert}
                </Alert>)}
                <Modal.Body>
                    <div class='container'>
                        <div class='col' > {/* 2  */}
                            <label for='lbl'>TipoDocumento</label>
                            <input
                                type='text' class='form-control'
                                name='tipodoc'
                                value={newReglasimp.tipodoc}
                                onChange={handleNewChange}
                            />
                        </div> {/* fin campo */}
                    </div> {/* fin row */}
                    <div class='row'>
                        <div class='col' > {/* 1  */}
                            <label for='lbl'>TipoCliente</label>
                            <select onChange={handleNewChange} class='col form-select form-select-sm' id='tipocli' name='tipocli' value={newReglasimp.tipocli} > {opciones_tipocli}
                            </select>   </div>  {/* fin campo */}
                        <div class='col' > {/* 2  */}
                            <label for='lbl'>Pagado</label>
                            <input type='checkbox' name='pagado' checked={newReglasimp.pagado == 'S' ? true : false}
                                onChange={handleNewChange} />
                        </div> {/* fin campo */}
                    </div> {/* fin row */}
                    <div class='row'>
                        <div class='col' > {/* 1  */}
                            <label for='lbl'>Firmado</label>
                            <input type='checkbox' name='firmado' checked={newReglasimp.firmado == 'S' ? true : false}
                                onChange={handleNewChange} />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                            <label for='lbl'>Imprimir</label>
                            <select onChange={handleNewChange} class='col form-select form-select-sm' id='imprimir' name='imprimir' value={newReglasimp.imprimir} > {opciones_imprimir}
                            </select>   </div>  {/* fin campo */}
                    </div> {/* fin row */}
                    <div class='row'>
                        <div class='col' > {/* 1  */}
                            <label for='lbl'>Causal</label>
                            <input
                                type='text' class='form-control'
                                name='causal'
                                value={newReglasimp.causal}
                                onChange={handleNewChange}
                            />
                        </div> {/* fin campo */}
                    </div> {/* fin container ins */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowNewModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant='primary' onClick={insertarReglasimp}>
                        Agregar Reglasimp
                    </Button>
                </Modal.Footer>
            </Modal>
        </>) : (<Navigate to='/login' />)}
        </>);
};
export default Reglasimp