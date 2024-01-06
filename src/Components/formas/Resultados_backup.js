import React, {useState} from 'react';
//import logo from './logo.svg';
import '../estilos/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


function Resultados() {

  const [agencia, setAgencia] = useState(null);
  const [numorden, setNumorden] = useState(null);
  const [listaexamenes,setListaexamenes] = useState([{"cdgexamen":"","nombre":""}]);

  const [listaanalisis,setListaanalisis] = useState([{"cdganalisis":"","nomanalisis":"","resultado":""}]);

  const [mostrarExam,setMostrarExam] = useState(false);
  const [respuesta,setRespuesta] = useState({});
  const [respuestadet,setRespuestadet] = useState({});
  const baseurl = 'http://127.0.0.1:8000/'; 

  const [fecorden,setFecorden] = useState(null);
  const [nombrepac,setNombrepac] = useState(null);
  const [edadf,setEdadf] = useState(null);
  const [sexo,setSexo] = useState(null);
  const [valoresAyuda,setValoresAyuda] = useState([]); // 

  const [teclasAyuda,setTeclasAyuda] = useState([]); // 
  const [valuesAyuda,setValuesAyuda] = useState([]); // 

  const [seq,setSeq] = useState(null); // secuencia del examen actual dentro de la orden

  const [matriz,setMatriz] = useState([]); // tabla temporal donde posic , id
  const [results,setResults] = useState([]);  // arreglo maestro clave-valor
  const [resultsant,setResultsant] = useState([]);  // arreglo maestro clave-valor anterior


  const [modalEliminar,setModalEliminar] = useState(false);
  const [myIdResultado,setMyIdResultado] = useState('');

  const handleAgenciaChange = (event) => {
    setAgencia(event.target.value);
  };
 
  
  // Función que se ejecutará cuando cambie el valor del campo "Orden"
  const handleOrdenChange = (event) => {
    setNumorden(event.target.value);
  };

  const state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      analisis: '',
      resultado: '',
    }
  }
  


  const grabarcambios= async ()=> {

    console.log('va a grabar cambios, matriz');
    console.log(matriz);

    const cadena = '';
    for (let pos=1;pos<=resultsant.length;pos++){
      console.log('entra a loop de resant ' + resultsant[pos] + ' ' + results[pos] );

          if (results[pos] != resultsant[pos])
          { console.log('diferencia en ' + pos);    
          const response = await fetch(
            `${baseurl}resultado/update/${pos}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
             // body: JSON.stringify(selectedEmpresa)
            body: JSON.stringify({
              resultado: results[pos],
              usuario: 'FCHARRIS' })
            }
          );
          }
    }
    alert('Cambios asegurados');
  }
 
  const eliminarana = async (e) =>  {
   
    //alert('borrar ' + myIdResultado);
    const response = await fetch(
      `${baseurl}resultado/delete/${myIdResultado}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
       // body: JSON.stringify(selectedEmpresa)
      body: JSON.stringify({usuario: 'FCHARRIS' })
      }
    );
    alert('Resultado Eliminado');
  }



 const handleChange=(e)=>{
    const {name, value}=e.target;
    setResults((results)=>({
      ...results,
      [name]: value
    }));
    //console.log(' ++++ este es el nuevo master res +++++++++++');
    //console.log(results);
  }

 

  // traer los datos del encabezado y los examenes
  const traedatosenc = async () =>{
  //alert("agencia " + agencia+ "ordden "+ numorden);

 
        try { 
            const response =  await fetch(baseurl+"resultadoencabezado/find/" + agencia + "/" + numorden +""); 
            const respuesta = await response.json(); 
            setRespuesta(respuesta);
             
            console.log(respuesta);
            if (respuesta.examenes)
             { 
              setNombrepac(respuesta.paciente.nompac);
              setFecorden(respuesta.paciente.fecorden);
              setSexo(respuesta.paciente.sexo);

              setEdadf(respuesta.paciente.edadf);  
              setListaexamenes(respuesta.examenes);
            }              
        } catch (error) { 
            console.error(error); 
        } 
  }

  const analisisexam = async (secu) => {
   
    setSeq(secu.target.id);
    // await delay(3000);
         try { 
           const responsedet =  await fetch(baseurl+"resultadodetalle/find/" + agencia + "/" + numorden + "/" + seq ); 
           const respuestadet = await responsedet.json(); 
           //const teclas =[];
           //const valores = [];
           
           const tecla_ana = []
           const valor_ana = [];
           const ayuda = [];
           const resultados = [];
           const matz = [];
                     
           setRespuesta(respuestadet);
           setListaanalisis([{"cdganalisis":"","nomanalisis":"","resultado":""}]); // inicializamos detalle de analisis
           setResults([]);
           setResultsant([]);
 
           
           console.log(listaanalisis);
 
           if (respuestadet.analisis)
           { 
            
             console.log('trajo analisis');
             console.log(respuestadet.analisis);
             setListaanalisis(respuestadet.analisis);
 
             // llenado de valores de ayuda
           
             if (respuestadet.resultado=='success') {
             
               //resultados = [];
               //setResults([]);
               
               respuestadet.analisis.map((obj) => {
               console.log('entra a valayuda: ');  
 
               resultados[obj.id] = obj.resultado; // se guarda resultado en arreglo
               matz[obj.orden] = obj.id;

               //setMatriz(  ...matriz, [obj.orden]= obj.id);

               if (obj.valayuda != '::::'){
                console.log('valayuda: ');
                console.log(obj.valayuda);
                const  temp = obj.valayuda.split('::');
                const  cadtec= temp[0];
                console.log('cadena teclas ' + cadtec);
                const teclas = cadtec.split(";"); //1,2,3,4,5
                console.log('split1 realizado ');
                const cadval = temp[1];
                const valores = cadval.split(";"); // No,++,pocas,escazas
                console.log('splits 2 realizados');
                console.log(teclas);
 
                // if (valoresAyuda.indexOf[obj.cdganalisis] == -1)
                if (ayuda.indexOf(obj.cdganalisis) == -1)
                 {
                   console.log('no esta en arreglo master');
                   //setValoresAyuda(current => [...current, obj.cdganalisis]);
                   ayuda.push(obj.cdganalisis);
                   const pos = ayuda.indexOf(obj.cdganalisis);
                   console.log('ubicamos el exmen en ' +pos);
                   tecla_ana[pos] = teclas;
                   valor_ana[pos] = valores;
                 }
 
               } // >8
             })
           } 
             setValuesAyuda(valor_ana);
             setTeclasAyuda(tecla_ana);
             setValoresAyuda(ayuda);
             //console.log('estos son los valores del arreglo valoresayuda');
             //console.log(valoresAyuda);
             // 
 
             console.log('estos son los valores del arreglo teclasayuda');
             console.log(teclasAyuda);
             //console.log('va a salvar vector maestro');
 
             setResults(resultados);
             setResultsant(resultados);
 

             console.log('estos son los matriz');
             console.log(matz);
             //setMatriz(matz); // guarda el mapa de las parejas orden-id del examen
            
             console.log('estos son los matriz pero en el state');
             console.log(matriz);
            // llenarDatosResultados(resultados); 
            //alert('sale');
 
           }              
       } catch (error) { 
           console.error(error); 
       }
     
      
  }

  const manejarcambiores = () =>{
   // cambios en resultados
  }
  
  const regteclares = (tec) => {
   // fires on keyup

    /*   
    console.log('este es el vector de ayuda');
    console.log(valoresAyuda);
    console.log('este es el vector de teclas ayuda');
    console.log(teclasAyuda);
    console.log('este es el values de teclas ayuda');
    console.log(valuesAyuda);
   */

    //alert('tecla ' + tec.target.value + 'long ' + tec.target.value.length + 'ascii' + tec.target.value.charCodeAt(tec.target.value.length-1) );
    
    //alert("longitod valores ayuda " + valoresAyuda.length )
    const pos = valoresAyuda.indexOf(tec.target.getAttribute("analisis"));
    //console.log('posicion en arreglo analisis =>' + pos);
    if (pos != -1 && tec.target.value.length == 2 && tec.target.value.charCodeAt(1)==58) // tecla+: y si hay valores disponibles y el texto tiene solo un caracter
    {
      const token = tec.target.value.substring(0,1);  
      const posi = teclasAyuda[pos].indexOf(token);
      //console.log('posicion en arreglo de teclas =>' + posi);

      if (posi != -1)
      {
       // alert('se encontro en posicion ' + pos + ' posi correspondiente ' +   posi);
        //console.log("texto=>" + valuesAyuda[pos][posi]); // se busca la misma posicion en values y teclas
        tec.target.value = valuesAyuda[pos][posi];
        //const t = tec.target.onChange;
        //const resp = handleChange;
        /*setResults((results)=>({
          ...results,
          [posi]: valuesAyuda[pos][posi]
        })); */

      }
    }
    else
    {
      //console.log('no se encontro la tecla para el examen');
    }
   
  }
 
  return (
    <div className="table table-hover">
      
         <h2>Resultados</h2>

      <div className='row'>  
      <div className="form-group col-1">
        <label htmlFor="Agencia">Agencia</label>
        <input  className="form-control"  type="text" name="agencia" id="agencia"  onChange={handleAgenciaChange} />
      </div>

      <div className="form-group col-2">
        <label className="" htmlFor="Orden">Numero de Orden</label>
        <input className="form-control"  type="text" name="orden" id="orden"  onChange={handleOrdenChange} />
      </div>
      </div>

      <div className='row'>
      <div className="form-group col-1">
      <button className="btn btn-primary " onClick={traedatosenc}>Buscar</button>
      </div>            
      </div>

      <div className='row'>  
      <div className="form-group col-1">
        <label htmlFor="Fecha">Fecha</label>
        <input  disabled className="form-control"  type="text" name="fecorden" id="fecorden" value={fecorden}  />
      </div>

      <div className="form-group col-2">
        <label className="" htmlFor="Nombre">Nombre del paciente</label>
        <input disabled className="form-control"  type="text" name="nompac" id="nompac" value={nombrepac}  />
      </div>
      

      <div className="form-group col-3">
        <label className="" htmlFor="Edad">Edad paciente</label>
        <input disabled className="form-control"  type="text" name="edadf" id="edadf" value={edadf}  />
      </div>

      <div className="form-group col-4">
        <label className="" htmlFor="Sexo">Sexo</label>
        <input disabled className="form-control"  type="text" name="sexo" id="sexo" value={sexo}  />
      </div>
      </div>

      <div className=''>
        
           <table striped bordered hover>
            
            <thead>
            <tr>
                <th>Examen</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {listaexamenes.map((examen) => (
                <tr>
                <td>{examen.cdgexamen}</td>
                <td>{examen.nombre}</td>
                
                <td>
                    <button id={examen.seq}
                    onClick={analisisexam}
                    className="btn btn-primary"
                    >
                    Gestionar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
            </table>
        
       
      </div>

      <div className='row'>
      <div className='col-2'>
          <button 
                    className="btn btn-primary"
                    >
                    Firmar
          </button>
        </div>
        <div className='col-3'>
          <button 
                    className="btn btn-primary"
                    onClick={grabarcambios}
                    >
                    Salvar Cambios
          </button>
        </div>   
      </div>
      <br/>


      <div className='row'>
      <div className=''>
           <table striped bordered hover>
            
            <thead>
            <tr>
                <th>Analisis</th>
                <th>Resultado</th>
                <th>Unidad</th>
                <th>Usuario</th>
                <th>Modif</th>
                <th>Interfaz</th>
                <th>Tiponorm</th>
                <th>Normal</th>
                <th>Teclas de Ayuda</th>
                <th>Acciones</th>

            </tr>
            </thead>
            <tbody>
           
            { listaanalisis.map((analisis) => (
                
                <tr>
                <td>{analisis.nomanalisis}</td>
                <td>
                   <label>  
                    <input className="form-control"  type="text" name={analisis.id} id={analisis.id} key={analisis.id} 
                      value={results[analisis.id]} onChange={handleChange}  onKeyUp={regteclares} analisis={analisis.cdganalisis} orden={analisis.orden} />
                   </label>  

         
                </td>
                <td>{analisis.unicodi}</td>
                <td>{analisis.usuario}</td>
                <td>{analisis.fecha}</td>
                <td>{analisis.fechamaq}</td>
                <td>{analisis.tiponorm}</td>
                <td>{analisis.valnormal}</td>
                <td>{analisis.valayuda ? analisis.valayuda.split('::')[2] : ''}</td>


                <td>  <button id={analisis.id}
                    onClick={()=>{setMyIdResultado(analisis.id);setModalEliminar(true)}}
                    className="btn btn-danger"
                    >
                    Borrar
                    </button>  
                </td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>  
       
        </div>    

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás seguro que deseasEl resultado {myIdResultado} ?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={eliminarana}>Sí</button>
            <button className="btn btn-secundary" onClick={()=>setModalEliminar(false)}>No</button>
          </ModalFooter>
        </Modal>          

    </div>


  );

  //}

}

export default Resultados;