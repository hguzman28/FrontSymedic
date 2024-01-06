import React, { useState, useEffect } from 'react';
//this.element.addEventListener(t, e, { passive: true} );
import 'webdatarocks/webdatarocks.css'
import * as WebDataRocksReact from 'react-webdatarocks';

// this.state = { hasError: false };
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
//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

function Pivotview(props) {

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


  // props.mireporte
  const [selectedValue, setSelectedValue] = useState('');
  const [datos, setDatos] = useState([]);
  //[{'col1':'A','venta':'0'},{'col2':'B','venta':'0'}]
  const [mostrar, setMostrar] = useState(false);
  const [mostrarg, setMostrarg] = useState(false);


  const [reporte, setReporte] = useState({});

  const baseserver = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 
  const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

//  const baseserver = 'http://127.0.0.1:8000/';
  const handleChange = (event) => {

  };

  useEffect(() => {
    //const rep = 1;
    //cargarresultadosrepx();

   // console.log('datos brutos ');
   // console.log(datos);
   setUsuario(user.username);
  }, []);

  return (
    <>
    { user && user.username ? ( 
    <> 
      <div>

        <>

          <div>
           {/* <h2>{props.minomreporte}</h2> */}
          </div>

          {props.data.length > 0 && 
          (<div id="fm-component"></div>)
          }

          {props.data.length > 0 && 
           ( <WebDataRocksReact.Pivot toolbar={
              true
            }
              width={
                "100%"
              }
              report={
                {
                  "dataSource": {
                  // data: [{'vendedor':'A','zona':'Z1','ciudad':'BAQ','venta':'23000'},{'vendedor':'A','zona':'Z2','ciudad':'BAQ','venta':'34000'},{'vendedor':'B','zona':'X1','ciudad':'BOG','venta':'99000'}]
                  "data": props.data
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
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Pivotview;