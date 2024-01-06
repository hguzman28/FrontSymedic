import { Chart } from "react-google-charts";
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';

import * as XLSX from 'xlsx';

import Pivotview from "./Pivotview";
// npm install --save react-google-charts

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Googlechart = (props) => {


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




  const [selectedValue, setSelectedValue] = useState('');
  const [datos, setDatos] = useState([["Age", "Weight"], [4, 5.5], [8, 12]]);
  const [tamano, setTamano] = useState(0);
  //[{'col1':'A','venta':'0'},{'col2':'B','venta':'0'}]
  const [mostrar, setMostrar] = useState(false);
  const [mostrarg, setMostrarg] = useState(false);

  const [tienepar, setTienepar] = useState(false);  // reporte pide parametros
  const [tieneparllenos, setTieneparllenos] = useState(false); // reporte tiene parametros llenos

  const [parametros, setParametros] = useState([]); // parametros
  const [hayparametros, setHayparametros] = useState(false);
  const [valparametros, setValparametros] = useState([]); // parametros [{tipo:pt,titulo:empresa, pos:0},{tipo:pf,titulo:fecha_ini, pos:1}]

  const [reporte, setReporte] = useState({});

  const server = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
 // const baseserver = 'http://127.0.0.1:8000/';
 const baseserver = `${process.env.REACT_APP_ENDPOINT_DATA}/`;

  //const [usuario, setUsuario] = useState('FCHARRIS');
  const [opcionestiporep, setOpcionesTiporep] = useState([]);
  const [opcion, setOpcion] = useState('Table');

  const [modelopivot, setModelopivot] = useState(false); // graficos o pivot

  const handleChange = (event) => {
    setOpcion(event.target.value);
  };

  let vectorparam = [];

  const handleParam = (event) => {
    console.log(' handle param ');
    vectorparam = valparametros;
    const { name, value } = event.target;
    let tip = event.target.getAttribute('tipo');
    const posi = event.target.getAttribute('pos');

    let reg = { tipo: tip, titulo: name, valor: value }
    //let reg = JSON.stringify({tipo: tip, titulo: name, valor: value});
    vectorparam[posi] = reg;
    console.log(vectorparam);
    setValparametros(vectorparam);
  };

  const cargarresultadosrep = async () => {

    //if (hayparametros){
    try {
      const response = await fetch(
        `${baseserver}reportes/findarrayparam/${props.mireporte}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario: usuario, parametros: valparametros })
        });
      const data = await response.json();
      setDatos(data.data);
      setTamano(data.filas - 1);
      setMostrar(true);

      console.log('++++ tamano +++++ ' + tamano);
      console.log(datos);

    } catch (error) {
      console.error(error);
    }


  }

  const cargarparametros = async () => {
    // http://127.0.0.1:8000/reportes/getparam/5
    try {
      const response = await fetch(baseserver + 'reportes/getparam/' + props.mireporte);
      const data = await response.json();
      setParametros(data.parametros);
      console.log('parametros');
      console.log(data.parametros);

    } catch (error) {
      console.error(error);
    }
  }

  const mapear_tiporep = async () => {
    try {
      const listado = [{ 'id': 'Bar', 'name': 'Bar' },
      { 'id': 'Line', 'name': 'Line' },
      { 'id': 'Table', 'name': 'Table' },
      { 'id': 'PieChart', 'name': 'PieChart' },
      { 'id': 'Gauge', 'name': 'Gauge' },
      { 'id': 'Histogram', 'name': 'Histogram' },
      { 'id': 'ScatterChart', 'name': 'ScatterChart' }
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesTiporep(opciones);
    } catch (error) {
      console.error(error);
    }
  }

  const exportToExcel = (datos) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    // props.data.data
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported_data.xlsx');
  };

  const runparameters = () => {
    setHayparametros(true);
    //setValparametros(vectorparam);
    console.log(' valores de parametros ');
    console.log(valparametros);
    cargarresultadosrep();
  };


  useEffect(() => {
    // setTamano(0);
    setUsuario(user.username);
    cargarparametros();
    console.log('cargo parametros');
    // if (parametros.length > 0) {
    cargarresultadosrep();
    // }
    mapear_tiporep();
    
  }, []);

  // ******************* fin ******************************** 
  return (
    <>
    { user && user.username ? ( 
    <> 
      <div class='container'>
        <div >
          <Table striped bordered hover>
            <thead> <tr>
              <th>Nombre del Parametro</th>
              <th>Valor</th>
            </tr></thead>
            <tbody>
              {parametros.map((obj) => (
                <tr>
                  <td>{obj.titulo} </td>
                  <td> <input id={obj.titulo} tipo={obj.tipo} name={obj.titulo} type={obj.tipo == "pf" ? 'date' : 'text'} onChange={handleParam} pos={obj.pos}  ></input> </td>
                  {/* type={obj.tipo=="pf"?'date':'text'} */}
                </tr>))}
            </tbody>
          </Table>
          <div>
            <Button onClick={() => { runparameters(); }} className="mb-3">
              Ejecutar con parametros
            </Button>
            <span>{" "}</span>
            <Button onClick={() => { setModelopivot(true); }} className="mb-3">
              Vista Pivot Table
            </Button>
            <span>{" "}</span>
            <Button onClick={() => { setModelopivot(false); }} className="mb-3">
              Vista Graficos
            </Button>

          </div>
        </div>

       { !modelopivot && ( 
        <div class='row' >
          <div class='col-1 form-control'>
            <label> Tipo de Informe {"  "} </label>
            <select onChange={handleChange} className="form-control" id="unicodi" name="unicodi" 	 >
              {opcionestiporep}
            </select>
          </div>
          <div class='col-2 form-control '>
            <Button onClick={() => exportToExcel(datos)} className="mb-3">
              Exportar
            </Button>
          </div>
        </div>
       )}

      </div>

      <br></br>

      <>
        {(tamano > 0) && modelopivot == false && (
          <>
            <div>
              <Chart
                chartType={opcion}
                data={datos}
                width="100%"
                height="200px"
                legendToggle

              />
            </div>
          </>)
        }
        {(tamano > 0) && modelopivot == true && (
          <>
            <div>
              <Pivotview data={datos} regresar={setModelopivot}
              />
            </div>
          </>)
        }
      </>
      </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}
export default Googlechart;
