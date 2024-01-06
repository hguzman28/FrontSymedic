import React, {useState,useEffect} from 'react';
//import logo from './logo.svg';
//import '../estilos/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {  Button,  Table,    Form,  Alert} from 'react-bootstrap'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import * as XLSX from 'xlsx';



//const baseurl = "http://127.0.0.1:8000/";
//const baseurlov = "http://127.0.0.1:8000/lov/";


// http://127.0.0.1:8000/labseccion/select

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 



function Lista() {

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

  const[modalMensaje,setModalMensaje] = useState(false);
  const[mensaje,setMensaje] = useState('');

  const [loading, setLoading] = useState(false);
  const [selectedSeccions, setSelectedSeccions] = useState({}); 
  const [secciones, setSecciones] = useState({}); 
  const [seccionesprendidas,setSeccionesPrendidas] = useState("");

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const [agencia, setAgencia] = useState('');
  const [numorden, setNumorden] = useState('');
  const [data, setData] = useState({});
  const [agenciar, setAgenciar] = useState('');
  const [F1, setF1] = useState('');
  const [F2, setF2] = useState('');
  const [nomexamen, setNomExamen] = useState('');

  // examenes **************************************************************
  const [miExamen,setMiExamen] = useState('');
  const [resultadosExamenes, setResultadosExamenes] = useState([]);
  const [miExamenDesc,setMiExamenDesc] = useState('');
  const [ocultaresExamenes, setOcultaResExamenes] = useState(true);

  const[opciones_order,setOpcionesOrden] = useState([]);
  const[opciones_color,setOpcionesColor] = useState([]);
  const[opciones_conres,setOpcionesConres] = useState([]);
  const[opciones_procesadas,setOpcionesProcesadas] = useState([]);


  const[order,setOrder] = useState('');
  const[color,setColor] = useState('');
  const[procesadas,setProcesadas] = useState('');
  const[conres,setConres] = useState('');

  // vector de items de la lista de trabajo
  const[items,setItems] = useState([]); //posicion numerada desde la pos 0, el contenido es un json (registro)
  const[registro,setRegistro] = useState({});
  const[lista,setLista] = useState({'data':[{"id":'',"cdgexamen":"","nomexamen":"",
    "proc":"","tipide":"","codpac":"","nompac":"","usuario":"","medfirma":"",
    "horfirma":"","fecent":"","horent":"","prio":"","codemp":"","nomemp":"",
    "motivo":"","antefam":""}]});

  // estados de procesado de la lista
  const [proc,setProc] = useState({}); // [id,{'id':'1','proc':'S'}]
//  const [proc_pos,setProc_pos] = useState([]); // [pos,{'id':'1','proc':'S'}]

  const [seq1,setSeq1] = useState(0); // secuencia inicial para firmar
  const [seq2,setSeq2] = useState(0); // secuencia final para firmar

  // **************** resumen de filtros ************************
  const [cadena,setCadena] = useState('');
  const [cadorderby,setCadorderby] = useState('');


  const [seq,setSeq] = useState('');
  const [tipo,setTipo] = useState('');

  const [indice1,setIndice1] = useState(0); // se usa para firmar por rangos
  const [indice2,setIndice2] = useState(0); // se usa para firmar por rangos
  const [listafirmar,setListafirmar] = useState({}); // se usa para firmar por 
  const [listafirmarservice,setListafirmarservice] = useState([]); // se usa para firmar por 
  const [listafirmarfiltradas,setListafirmarfiltradas] = useState([]); // se usa para firmar por

 
  
  const mapear_order = async () =>{
      try {
          const listado = [{'id':'','name':'Seleccione valor'},
          {'id':'O','name':'Orden'},
          {'id':'E','name':'Examen'},
          {'id':'AO','name':'Agencia-Orden'}
                  ];
          const opciones = listado.map((obj) => (
          <option key={obj.id} value={obj.id}>
            {obj.name}
          </option> ));
          setOpcionesOrden(opciones);
      } catch (error) { 
          console.error(error); 
      }
   } 

   const mapear_colores = async () =>{
    try {
     const response = await fetch(baseurlov +'color'); 
     const data = await response.json(); 
     const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option> ));
        setOpcionesColor(opciones);
    } catch (error) { 
        console.error(error); 
    }
   } 

   const mapear_conres = async () =>{
    try {
        const listado = [{'id':'','name':'Seleccione valor'},
        {'id':'S','name':'Con resultado'},
        {'id':'N','name':'Sin resultado'}
                ];
        const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option> ));
        setOpcionesConres(opciones);
    } catch (error) { 
        console.error(error); 
    }
 } 

 const mapear_procesadas = async () =>{
  try {
      const listado = [{'id':'','name':'Seleccione valor'},
      {'id':'S','name':'Procesadas'},
      {'id':'N','name':'Sin Procesar'}
              ];
      const opciones = listado.map((obj) => (
      <option key={obj.id} value={obj.id}>
        {obj.name}
      </option> ));
      setOpcionesProcesadas(opciones);
  } catch (error) { 
      console.error(error); 
  }
} 

const handleProcChange = (event) => {
  setProcesadas(event.target.value);
  };   
     
  const handleConresChange = (event) => {
    setConres(event.target.value);
    };   
  
  const handleExamenChange = (event) => {
    setMiExamen(event.target.value);
    setNomExamen('');
     };
     
  const handleColorChange = (event) => {
      setColor(event.target.value);
      
       };   
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    };   
       

  const handlei1 = (event) => {
    setIndice1(event.target.value);
    };     

    const handlei2 = (event) => {
      setIndice2(event.target.value);
      };     
  
     const limpiar = () =>{
      setResultadosExamenes([]);
      setOcultaResExamenes(true);
    }   

   // servicio que busca examenes
   const handleBuscarlovlClickExa = async () => {
    //alert('buscar exa ' + miExamen);
    if (miExamen ===''){
     setResultadosExamenes([]); 
     setOcultaResExamenes(true);
    }
    else {
    try {
      const response = await axios.get(`${baseurl}lovl/examenes/${miExamen}`);
      setResultadosExamenes(response.data.data);
      setOcultaResExamenes(false);
    } catch (error) {
      console.error(error);
    } 
    }
  };  

  function validar_examen(exa) {
    fetch(baseurl+"validate/examenes/" + exa )
    .then(response => response.json())
    .then(data => {
      //console.log("Dentro fetch exitoso paciente");
      let nombres = '';
      nombres = data.data[0].nombre ;
      return(nombres);
    })
    .catch(error => {
      console.error(error);
      return(null);
    });
    }


const cargar_lista = (pendientes) => {
  let registro = {};
  let vector = [];
  let vector2 = [];
  console.log(' cargar valores de las cadenas *************************');

   let miwhere  = validar_cadena(pendientes);


  fetch(baseurl + "listatrabajo", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({  where: miwhere , pend: pendientes===true?'S':'N' ,orden: cadorderby }),
    
  })
  .then(response => response.json())
  .then(data => {
    setLista(data)
    console.log(' esta es la lista =>');
    console.log(lista);
    // cargar el vecot de estados
    let cons = 1;

    let arrayfirmar = [];
    data.data.map((obj) => {
      
        setProc((prevIncluir) => (
          {...prevIncluir,[obj.id]: obj.proc}
          ));   

          setListafirmar((prevstatus) => ( 
          {...prevstatus,[obj.consec]:obj.id} 
          )); 

          arrayfirmar[obj.consec] = obj.id;
          //relacionfirmar
//        obj.consec obj.id  

    });
   
    setListafirmarservice(arrayfirmar);
    console.log('lista para firmar');
    console.log(arrayfirmar);

  })
  .catch(error => {
    console.error(error);
    return null;
  });

}


 const validar_cadena = (pendientes) =>  {
  console.log(' validar cadena +++++++++++++++++++');
     // const operacion = pendientes;
      let cadena ='';
      let cadagencia = ''; //
      let cadagenciar = ''; //

      let cadagenciao = '';
      let cadenares = '';
      let cadfecha = '';
      let cadsecciones = ' ';
      let cadexamen =''; //
      let cadcolor ='';
      let cadpendi ='';
      let cadenaproc ='';
      let cadfechapend = ''; 
      let cadwhere ='';
      let subwhere ='';
      let orderby = ''; //
      let mis_secciones ='';
      
      console.log('0');

      if (agencia !== '') {
       cadagencia = " and x.codage='"+ agencia + "' ";
      }
      if (agenciar !== '') {
       cadagenciar =  " and x.codager='"+ agenciar + "' ";
      }

      console.log('1');
  
      if (miExamen !== '') {
        cadexamen = " and x.cdgexamen='"+ miExamen + "' ";
       }

       console.log('2');
 
  

       console.log(F1);
       // filtros por fechas
       if ((F1!=='') && (F2!=='')){

        console.log('examinar fechas');
        let date = F1.getDate();
        let  month = F1.getMonth() + 1; 
        let  year = F1.getFullYear();
        if (date < 10) {date = '0' + date;}
        if (month < 10) {month = '0' + month;}
        let F1format = year + month + date;
 
        date = F2.getDate();
        month = F2.getMonth() + 1; 
        year = F2.getFullYear();
        if (date < 10) {date = '0' + date;}
        if (month < 10) {month = '0' + month;}
        let F2format = year + month + date;

        cadpendi = " and x.ordenl in  (select ordenl from laborden where to_char(fecorden,'yyyymmdd') between  '" + F1format + "' and '" + F2format + "' and estado='A' union  ";
        cadpendi = cadpendi + " select a.ordenl from laborden a,labordendet b where a.ordenl=b.ordenl and to_char(fechapend,'yyyymmdd') between  '" + F1format + "' and  '" + F2format + "'  and estado='A') ";
      }
      else
      { cadfecha = '';
        cadpendi = ' and 1=1 '; }

      if (pendientes === true){
       cadpendi = cadpendi + " and x.pend='S' "; }

      console.log('3');

       if (color!==''){cadcolor = " and x.color = '" + color + "'";}

      if (conres!=='')
      {
        if (conres === 'S'){
          cadenares = " and (x.ordenl,x.seq) in (select ordenl,seq from resultado)  ";
        } else
        {
          // ORDENES SIN RESULTADO
          cadenares = " and (x.ordenl,x.seq) not in (ordenl,seq from resultado) ";
       }
      }

      console.log('4');

      if (procesadas!=='')
      {
        if (procesadas === 'S'){
          cadenaproc = " and x.proc='S'  ";
        } else
        {cadenaproc = " and (x.proc='N' or x.proc is null) ";}
      }

      console.log('5');

      console.log(order);  

      if (order === 'E') 
        { orderby = "order by x.cdgexamen"; }
      else { 
        if (order === 'O')
            {orderby = "order by x.numorden";}
        else {orderby = " order by x.codage,x.numorden";}
      }
      
     setCadorderby(orderby)
      console.log('6 , orderby= ' + cadorderby);
   

      let cad = seccionesprendidas;
      //.substring(1)
      console.log( '7 , secciones prendidas ' + seccionesprendidas);

      if (cad !== '')
      { cadsecciones = " and x.cdgexamen in (select cdgexamen from examen where codseccion in (" + cad + "))";}

      console.log('8 ' + cadsecciones);

      console.log(cadsecciones);
      // cadfecha +
      cadwhere = "   1=1 " + cadagenciao + cadagencia + cadagenciar + cadsecciones + cadexamen + cadcolor  + cadpendi + cadenaproc + cadenares + ""; 
      subwhere = cadwhere + " or (" + subwhere + " and fechapend is not null " + cadfechapend + cadenaproc + cadenares + " )";

      console.log('9'); 

      console.log(cadwhere);
      return(cadwhere);
      
}
 // **********************************************************************

  const[opcionesAgencias,setOpcionesAgencias] = useState();

   // Función que se ejecutará cuando cambie el valor del campo "Agencia"
  const handleAgenciaChange = (event) => {
    setAgencia(event.target.value);
  };
  
  // Función que se ejecutará cuando cambie el valor del campo "Orden"
  const handleOrdenChange = (event) => {
    setNumorden(event.target.value);
  };
  
  const handleAgenciarChange = (event) => {
    setAgenciar(event.target.value);
  };
  const handleF1Change = (event) => {
    setF1(event.target.selected);
  };
  const handleF2Change = (event) => {
    setF2(event.target.selected);
  };
  useEffect(() => { 
    cargarsecciones(); 
    mapear_agencias();
    mapear_colores();
    mapear_order();
    mapear_procesadas();
    mapear_conres();
  }, []); 

  // mara manejar los cambios en los checkboxes
  const handleChange = (event) => { 
   // selectedSeccions
   // console.log('cambia state');
   // console.log(event.target.name + ' '+ event.target.checked);

    const { name, value } = event.target; 
    setSelectedSeccions((prevSeccions) => (
      { 
      ...prevSeccions, 
      [name]: event.target.type==='checkbox'?(event.target.checked?'S':'N'):value 
    }
    ));   
   
    console.log(' itera para name= ' + name);
// const [seccionesprendidas,setSeccionesPrendidas] = useState([]);
 
     let cadaux = seccionesprendidas;
     if (cadaux.indexOf(name) > 0)
     {
      console.log(' encontro a '+name);
      if (event.target.checked)
      { console.log('checked');
        if (cadaux!=''){ 
          cadaux = cadaux + ",'" + name + "'";}
        else {cadaux = "'" + name + "'";} 
        }
        else
      {  console.log('unchecked'); 
        cadaux = cadaux.replace(",'" + name + "'", "");
        cadaux = cadaux.replace( name + "'", "");
      } 
      }
     else
     { if (cadaux!=''){ 
      cadaux = cadaux + ",'" + name + "'";}
     else {cadaux = "'" + name + "'";} }
     
     setSeccionesPrendidas(cadaux.substring(0));
    
      // .substring(0) 

      console.log(' asi quedo la lista de secciones');
      console.log(cadaux);
      console.log(' asi quedo la selected seccions');
      console.log(selectedSeccions);
      
      return cadena;
   }; 



   const handleMarcarTodas = () =>{

    let cadaux = '';
    let conta = 1;
    secciones.map((obj) => {
      setSelectedSeccions((prevIncluir) => ({ 
        ...prevIncluir, 
        [obj.codseccion]: 'S'   
      }));  

        if (conta == 1 && obj.codseccion != "" )
        { cadaux = "'"+obj.codseccion + "'" }
        else
        { cadaux = cadaux + ",'" + obj.codseccion +"'"; }

      conta = conta + 1;

      });

      console.log('+secciones prendidas+');
      setSeccionesPrendidas(cadaux);
      // .substring(2)
      console.log( seccionesprendidas); 

      console.log(' ** selectedseccion **');
      console.log(selectedSeccions);
//*********************************************** */

          
// ******************************
   }

   const handleDesMarcarTodas = () =>{

    
    secciones.map((obj) => {
      setSelectedSeccions((prevIncluir) => ({ 
        ...prevIncluir, 
        [obj.codseccion]: 'N'   
      }));  
      });

      setSeccionesPrendidas('');
   }

   const handleProc = (list) => { 
    // event.target.checked
    // const { name, value } = event.target;


      const response =  fetch(
        `${baseurl}listatrabajo/proc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        // body: JSON.stringify(selectedEmpresa)
        body: JSON.stringify({
          id: list.id
          })
        }
      );
    
    let seq = list.id;
    //list.proc = 'S'; 
    //alert('procesada ' + seq + ' actualmente ' + proc[seq].proc);

    setProc((prevIncluir) => ({ 
      ...prevIncluir, 
      [list.id]: 'S'   
    }));   

       
    

    // **************************************
   
    //alert('sale procesada ' + seq); 
   }

   const handleNoProc = (list) => { 
    let seq = list.id;
    //lista.proc = 'N'; 


    const response =  fetch(
      `${baseurl}listatrabajo/noproc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      // body: JSON.stringify(selectedEmpresa)
      body: JSON.stringify({
        id: list.id
        })
      }
    );
  
    setProc((prevIncluir) => ({ 
        ...prevIncluir, 
        [list.id]: 'N'   
      }));   
  
     
   // alert('no procesada ' + seq + ' actualmente ' +  proc[seq].proc);
       
   
   }


   const handleChangeProc = (event) => { 
    const { name, value } = event.target; 
    setProc((prevIncluir) => ({ 
      ...prevIncluir, 
      [name]: event.target.type=='checkbox'?(event.target.checked?'S':'N'):value   
    }));   
  
  }; 



  const cargarsecciones = () => {

    fetch(baseurl+"labseccion/select")
    .then(response => response.json())
    .then(data => {
      console.log("Dentro fetch exitoso");
      setSecciones(data.data)
      //setLoading(false);
      console.log(data.data);
    })
    .catch(error => {
      console.error(error);
      //setLoading(false);
    });
  }

  const mapear_agencias = async () =>{
    try {
     const response = await fetch(baseurlov +'agencia'); 
     const data = await response.json(); 
     const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option> ));
        setOpcionesAgencias(opciones);
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

  const firmarseleccion = async () => {

    //alert(indice1 + ' a ' + indice2);

    let arreglotemp = [];
    let indicetemp = 1;
    if (indice1 != '' && indice1!= null && indice2 != '' && indice2!= null )
    {
       let z = 0;
       let y = 0;
       y = parseInt(indice1);
       z = parseInt(indice2) + 1
       //alert('va a filtrar ' + z);

       const arreglotemp = []; 
       for(let i = y; i < z; i++) {
           arreglotemp[indicetemp] = listafirmar[i];
           indicetemp = indicetemp + 1; 
        } 
       //alert('ya filtro'); 
       setListafirmarfiltradas(arreglotemp);
       console.log(" esta es la lista de las filtradas ");
       console.log(listafirmarfiltradas);

       try {
          const response =  await fetch(
            `${baseurl}listatrabajo/firmar`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
              usuario: user,
              listado: listafirmarfiltradas
              })
            }
          );
          const datafirma = await response.json();
          console.log("regresa del servicio");
         
          console.log(datafirma);
          alert(datafirma.mensaje); 
          
        //  setMensaje(response);
        //  setModalMensaje(true);
      } catch (error) {
        console.error(error);
      }

    }

   //let  result = ','.join(key for key, value in listafirmar.items() if value == 'S');
  }

  return (
    <>
    { user && user.username ? ( 
    <> 
    <div className="App">
      <div className="tab-buttons">
        <button
          className={activeTab === 0 ? 'active btn btn-primary' : 'btn btn-primary'}
          onClick={() => handleTabClick(0)} >
          Filtros
        </button>
        <button
          className={activeTab === 1 ? 'active btn btn-primary' : 'btn btn-primry'}
          onClick={() => handleTabClick(1)}
        >Secciones 
        </button>
        <button
          className={activeTab === 2 ? 'active btn btn-primary' : 'btn btn-primary'}
          onClick={() => handleTabClick(2)}
        >Lista 
        </button>
        <button
          className={activeTab === 3 ? 'active btn btn-primary' : 'btn btn-primary'}
          onClick={() => handleTabClick(3)}
        >Firmas
        </button>

      </div>
      <div className="tab-content">
        {activeTab === 0 && 
          <div class='container'>
             <div class='row'>  
              
             <div class="form-group col">
                <label for='lbl'>Agencia</label> 
                <select class='col form-select form-select-sm' onChange={handleAgenciaChange} id="agencia" name="agencia" 		value={agencia} >
                {opcionesAgencias}
                </select>        
             </div> 
              <br></br>
              <br></br>
              <br></br>
              
         

              <div class="form-group col">
                <label class="" htmlFor="Orden" for='lbl' >Numero de Orden</label>
                <input value= {numorden} class="form-control"  type="text" name="orden" id="orden"  onChange={handleOrdenChange} />
              </div>
              
             
              <div class="form-group col">
                <label htmlFor="Agencia" for='lbl'>Agencia de Realizacion</label>
                <select class='col form-select form-select-sm' onChange={handleAgenciarChange} id="agenciar" name="agenciar" 		value={agenciar} >
                {opcionesAgencias}
                </select>        

              </div>
            </div> 

               <div className='row' style={{width:"500px"}} > 
                <label for='lbl'>Examen</label>  
                <input name='cdgexamen' class='form-control' type="text" value={miExamen} onChange={handleExamenChange}/ > {nomexamen}
                <button class='btn btn-primary' onClick={handleBuscarlovlClickExa}>Buscar</button>
                <button class='btn btn-warning' onClick={limpiar}>Limpiar</button>
                  
                {(!ocultaresExamenes) && 
                < div name= 'marcores_examenes' style={{overflowY:'scroll',height:'350px'}}> 
                <ul>
                  {resultadosExamenes.map((resultado) => (
                    <li onDoubleClick={() => {setMiExamen(resultado.id);setNomExamen(resultado.name.substring(0,40));limpiar(); }} key={resultado.id}>{resultado.id}-{resultado.name} </li>
                  ))}
                </ul>
                </div> }
              </div>
              

            <div className='row'>
              <div className='col'>
                <label htmlFor="fecha_inicio" for='lbl'>Fecha Inicio</label>
                <DatePicker placeholderText="dd-mm-yyyy" dateFormat='dd-MM-yyyy' className="form-control"  id="fechainicio" name="fechainicio" selected ={F1} onSelect={(date) => setF1(date)} onChange={(date) => setF1(date)}  />
              </div>
              <div className='col'>
                <label htmlFor="fecha_inicio" for='lbl'>Fecha Final</label>
                <DatePicker placeholderText="dd-mm-yyyy" dateFormat='dd-MM-yyyy' className="form-control"  id="fechafinal" name="fechafinal" selected={F2} onSelect={(date) => setF2(date)}  onChange={(date) => setF2(date)}  />
              </div>

            </div>

            <div className='row'>
            <div className='col'> 
             
              <label for='lbl'>Color</label> 
              <select onChange={handleColorChange} class="col form-select form-select-sm" id="color" name="color" value={color} >
                {opciones_color}
              </select>        
                
              </div>
            </div>

         
            <div class='row'>
            <div class='col'>
                 
                <Form.Label>Con Resultado</Form.Label> 
                <select onChange={handleConresChange} class="col form-select form-select-sm" id="conres" name="conres" value={conres} >
                  {opciones_conres}
                </select>        
                    
              </div>
            </div>
        
            <div class='row'>
            <div class='col'>
                 
                <Form.Label>Procesadas</Form.Label> 
                <select onChange={handleProcChange} class="col form-select form-select-sm" id="procesadas" name="procesadas" value={procesadas} >
                  {opciones_procesadas}
                </select>        
                  
              </div>
            </div>

            <div class='row'>
            <div class='col'>
                 
                <label>Orderar por</label> 
                <select onChange={handleOrderChange} class="col form-select form-select-sm" id="order" name="order" value={order} >
                  {opciones_order}
                </select>        
                
              </div>
            </div>
        

          </div>
          }
        {activeTab === 1 && 
        
          <div className=''  >
              
              {secciones.map((secc) => (
                  <Form> 
                    <Form.Group controlId='formBasicseccion'> 
                    <Form.Label>{secc.nombre}</Form.Label> 
                      <input 
                        type='checkbox' 
                        name={secc.codseccion} 
                        checked={selectedSeccions[secc.codseccion]==='S'?true:false}
                        onChange={handleChange} /> 
                      </Form.Group> 
                    </Form>
                  ))}
            <div>
            <button className = "btn btn-primary" onClick={handleMarcarTodas}>Seleccionar Todas</button>
            <button className = "btn btn-primary" onClick={handleDesMarcarTodas}>Deseleccionar Todas</button>

            </div>
          </div>
        
        }
        {activeTab === 2 &&  
        <div className=''  >
          <br>
          </br>
          <br>
          </br>
          <div class='container' >
          <div class='row'>
            <div class='col-1'>
              <div>
                    <button name='lista' className = 'btn btn-primary'  onClick={() => { cargar_lista(false) }} >Consultar</button>
              </div>
            </div>  
            <div class='col-3'>
              <div>
                  <button name='pendientes' className = 'btn btn-primary' onClick={() => { cargar_lista(true) }}>Consultar Pendientes</button>
              </div>
            </div>

            <div class='col-4'>
            <div>
            <Button onClick={() => exportToExcel(lista.data)} className="mb-3">
              Exportar
            </Button>
            </div>
            </div>


          </div>
          <br></br>
          </div>
          {lista.data.length > 0  && <Table striped bordered hover> 
              <thead> <tr> 
                <th>Consec</th>
                <th>Agencia</th> 
                <th>Orden</th> 
                <th>Examen</th> 
                <th>Nomexamen</th> 
                <th>Procesado</th> 
                <th>IdentPaciente</th> 
               
                <th>NombrePaciente</th> 
                <th>UsuarioOrden</th> 
                <th>FirmadoPor</th> 
                <th>Empresa</th> 
                <th>NomEmpresa</th> 
                <th>Acciones</th> 
              </tr></thead> 
            <tbody> 
              {lista.data.map((list) => (
                <tr>
                    <td>{list.consec} </td> 
                    <td>{list.codage} </td> 
                    <td>{list.numorden} </td> 
                    <td>{list.cdgexamen} </td> 
                    <td>{list.nomexamen} </td> 
                    <td> <input 
                        type='checkbox' 
                        id={list.id}
                        name={list.id} 
                        checked={proc[list.id]=='S'?true:false} 
                        onChange={handleChangeProc} 
                        disabled
                       /> 
                    </td>
                     
                    <td>{list.codpac} </td> 
                   
                    <td>{list.nompac} </td> 
                    <td>{list.usurecep} </td> 
                    <td>{list.medfirmad} </td> 
                    <td>{list.codemp} </td> 
                    <td>{list.nomemp} </td> 
                    <td> 
                    {proc[list.id] === 'N' && <Button variant='btn btn-success'  onClick={() => { handleProc(list) }} >Procesada</Button>} 
                    {proc[list.id] === 'S' &&<Button onClick={() => { handleNoProc(list) }} variant='btn btn-warning' >No procesada </Button> }   
                    </td>

                </tr> 
                
              ))} 
            </tbody> 
          </Table>}
         
          
        </div>
      }

        {activeTab === 3 &&  
        <div className=''  >
          <br>
          </br>
          <br>
          </br>
          <div className='container'>
          <div className='row'>

          <div className='col-1'>
              <Form.Label>Desde</Form.Label> 
              <input 
                class='form-control'
                type='text' 
                name='i1' 
                onChange={handlei1} 
              /> 
             
          </div>
          </div>
          <div className='row'>
          <div className='col-1'>
              <Form.Label>Hasta</Form.Label> 
              <input 
                class='form-control'
                type='text' 
                name='i2' 
                onChange={handlei2} 
              />
          </div>
          </div>
          <br></br>
          <div className='row'> 
          <div className='col-1'>
              <div>
                <button name='lista' className = 'btn btn-primary'  onClick={() => { firmarseleccion() }} >Firmar</button>
              </div>
          </div>  
            
          </div>
         </div> 
          
        </div>
        }



      </div>

      <Modal isOpen={modalMensaje}>
      <ModalBody>
        {mensaje} 
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secundary" onClick={()=>setModalMensaje(false)}>Cerrar</button>
      </ModalFooter>
      </Modal>       


    </div>
  
    </> 
    ): ( <Navigate to="/login" /> )  }
    </>

  );
}

export default Lista;