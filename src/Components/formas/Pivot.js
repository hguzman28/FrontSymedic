/*

npm i webdatarocks --save ??

 para evitar q se vea 2 veces 
 ----- nota: en index.js
 root.render(
  <>
  <App />
    </>,
    document.getElementById('root')
  );
*/
import { Button, Table, Modal, Form, Alert, } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
//this.element.addEventListener(t, e, { passive: true} );
import 'webdatarocks/webdatarocks.css'
import * as WebDataRocksReact from 'react-webdatarocks';


function Pivot(props) {


  // props.mireporte
  const [selectedValue, setSelectedValue] = useState('');
  const [datos, setDatos] = useState([]);
  //[{'col1':'A','venta':'0'},{'col2':'B','venta':'0'}]
  const [mostrar, setMostrar] = useState(false);
  const [mostrarg, setMostrarg] = useState(false);


  const [reporte, setReporte] = useState({});

  const baseserver = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 
  //const baseserver = 'http://127.0.0.1:8000/';



  const handleChange = (event) => {

  };

  const cargarresultadosrep = async (report) => {

    try {
      const response = await fetch(baseserver + 'reportes/find/' + props.mireporte);
      const data = await response.json();
      setDatos(data.data);
      setMostrar(true);
    } catch (error) {
      console.error(error);
    }
  }

  const cargarresultadosrepx = (report) => {
    fetch(baseserver + 'reportes/find/' + props.mireporte, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDatos(data.data);
        setMostrar(true);
        console.log('xxxx datos: xxxx');
        console.log(data.data);
      })
      .catch(error => {
        console.error(error);
        setDatos([]);
      });
  }

  console.log(' vamos a evaluar los datos del webdatarocks, datos:');
  console.log(datos);


  //alert('para aqui');

  if (datos.length > 0) {

    console.log(' ahora si, vamos a evaluar ');


    try {

      //console.log(' existe la clase webdatarocks?');
      //console.log( e.currentTarget.classList.contains(WebDataRocks) );

      /*   let pivote = new WebDataRocks({
           container: "#wdr-component",
           toolbar: true,
           report: {
             dataSource: {
              //data: [{'vendedor':'A','zona':'Z1','ciudad':'BAQ','venta':'23000'},{'vendedor':'A','zona':'Z2','ciudad':'BAQ','venta':'34000'},{'vendedor':'B','zona':'X1','ciudad':'BOG','venta':'99000'}]
             data: datos
             },
             options: {
               grid: {
                 type: "flat"
               },
               exportTo: {header:"xxxxxxxxxxxxxxxx"}
             }
           },
           
         });*/

    }
    catch (error) {
      // alert( "Error invocando WDR " );
      console.error(error);
    }
  }

  useEffect(() => {
    //const rep = 1;
    cargarresultadosrepx(props.mireporte);

    console.log('datos brutos ');
    console.log(datos);
 
  }, []);

  return (
    <>
      <div>

        <>

          <div>
            <h2>{props.minomreporte}</h2>
          </div>

          {datos.length > 0 && 
          (<div id="fm-component"></div>)
          }

          {datos.length > 0 && 
           ( <WebDataRocksReact.Pivot toolbar={
              true
            }
              width={
                "100%"
              }
              componentFolder = "./"
              report={
                {
                  "dataSource": {
                  // data: [{'vendedor':'A','zona':'Z1','ciudad':'BAQ','venta':'23000'},{'vendedor':'A','zona':'Z2','ciudad':'BAQ','venta':'34000'},{'vendedor':'B','zona':'X1','ciudad':'BOG','venta':'99000'}]
                  "data": datos
                  },
                  "options": {
                    "grid": {
                      "type": "flat"
                    }
                  }
                }
              } 

            />)}

        </> 

      </div>
    </>
  );
}
export default Pivot;