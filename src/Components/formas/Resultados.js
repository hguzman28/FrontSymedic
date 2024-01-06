import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
//import '../estilos/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import RepResultado from './RepResultado.js';

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 


function Resultados() {

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

  
  let vectorIncluirExamen = {}; //[]

  const [isLoading, setLoading] = useState(true); // state de cargando .....

  const [mostrarex, setMostrarex] = useState(false);
  const [mostraran, setMostraran] = useState(false);
  const [impresion, setImpresion] = useState(false); // controlar el modo impresion



  const [agencia, setAgencia] = useState(null);
  const [numorden, setNumorden] = useState(null);
  const [listaexamenes, setListaexamenes] = useState([{ "cdgexamen": "", "nombre": "" }]);

  const [listaanalisis, setListaanalisis] = useState([{ "cdganalisis": "", "nomanalisis": "", "resultado": "" }]);


  const [respuesta, setRespuesta] = useState({});
  const [respuestadet, setRespuestadet] = useState({});


  const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/`; 
  //const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 // const baseurl = 'http://127.0.0.1:8000/';

  const [fecorden, setFecorden] = useState(null);
  const [nombrepac, setNombrepac] = useState(null);
  const [edadf, setEdadf] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [medfirma, setMedFirma] = useState(null);
  const [horfirma, setHorFirma] = useState(null);
  const [medfirmae, setMedFirmae] = useState(null);
  const [horfirmae, setHorFirmae] = useState(null);

  const [membrete, setMembrete] = useState('');


  const [incluirExamen, setIncluirExamen] = useState([]); // para controlar si se imprime
  const [valoresAyuda, setValoresAyuda] = useState([]); // 

  const [teclasAyuda, setTeclasAyuda] = useState([]); // 
  const [valuesAyuda, setValuesAyuda] = useState([]); // 

  const [seq, setSeq] = useState(null); // secuencia del examen actual dentro de la orden
  const [mianalisis, setMianalisis] = useState([]); // analisis actual dentro de la orden
  const [mitipores, setMiTipoRes] = useState([]); // tipo de resultado del analisis actual dentro de la orden
  const [miexamen, setMiExamen] = useState([]); // tipo de resultado del analisis actual dentro de la orden
  const [miunicodi, setMiUniCodi] = useState([]); // tipo de resultado del analisis actual dentro de la orden

 
  const [matriz, setMatriz] = useState([]); // tabla temporal donde posic , id
  const [results, setResults] = useState([]);  // arreglo maestro clave-valor
  const [resultsant, setResultsant] = useState([]);  // arreglo maestro clave-valor anterior
  const [resformulados,setResformulados] = useState([]); // para almacenar los resultados q devuelve el servicio formulados


  const [modalEliminar, setModalEliminar] = useState(false);
  const [myIdResultado, setMyIdResultado] = useState('');

  const [modalMensaje, setModalMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');

  //const [user, setUser] = useState('FCHARRIS');

  const handleAgenciaChange = (event) => {
    setAgencia(event.target.value);
  };


  // Función que se ejecutará cuando cambie el valor del campo "Orden"
  const handleOrdenChange = (event) => {
    setNumorden(event.target.value);
  };

  const state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      analisis: '',
      resultado: '',
    }
  }

  const ModalCustomStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const firmar = async (tipofirma, posifirma) => {
    // http://127.0.0.1:8000/resultado/firmar/:age/:ord

    console.log(' va a firmar ' + seq + ' age  ' + agencia + ' orde ' + numorden);

    const response = await fetch(
      `${baseurl}resultado/firmar/${agencia}/${numorden}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(selectedEmpresa)
        body: JSON.stringify({
          user: user,
          seq: seq,
          tipo: tipofirma,
          posfirma: posifirma
        })
      }
    );

    setRespuesta('');
    const respuesta = await response.json();
    const mens = respuesta.mensaje
    setRespuesta(mens);

    if (tipofirma = 'O') {
      setMedFirma(respuesta.medico);
      setHorFirma(respuesta.ts);
    }
    if (tipofirma = 'E') {
      setMedFirmae(respuesta.medico);
      setHorFirmae(respuesta.ts);
    }


    setMensaje(mens);
    setModalMensaje(true);


    //console.log(mens); 

  }


  const grabarcambios = async () => {

    console.log('va a grabar cambios, matriz');
    console.log(matriz);
    //const pendientesalvar = false;
    const cadena = '';
    for (let pos = 1; pos <= matriz.length; pos++) {
      //console.log('entra a loop de resant ' + resultsant[matriz[pos]] + ' ' + results[matriz[pos]] );

      console.log('user=' + user + ' age=' + agencia + ' orden=' + numorden + ' seq=' + seq + ' exam=' + miexamen[pos] + ' anali=' + mianalisis[pos] + ' tipores=' + mitipores[pos] + ' unid=' + miunicodi[pos]);

      if (matriz[pos]) {
        if (results[matriz[pos]] != resultsant[matriz[pos]]) {
          console.log('diferencia en ' + matriz[pos]);
          console.log('resultado a grabar');
          console.log(results[matriz[pos]]);
          console.log('usuario');
          console.log(user);
          console.log('age');
          console.log(agencia);
          console.log('ord');
          console.log(numorden);
          console.log('seq');
          console.log(seq);
          console.log('examen');
          console.log(miexamen[pos]);
          console.log('analisis');
          console.log(mianalisis[pos]);
          console.log('tipores');
          console.log(mitipores[pos]);
          console.log('unicodi');
          console.log(miunicodi[pos]);

          //pendientesalvar = true;    
          try{ 
                const response = await fetch(
                  `${baseurl}resultado/update/${matriz[pos]}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // body: JSON.stringify(selectedEmpresa)
                    body: JSON.stringify({
                      resultado: results[matriz[pos]],
                      usuario: user.username.toUpperCase() ,
                      age: agencia,
                      ord: numorden,
                      seq: seq,
                      examen: miexamen[pos],
                      anali: mianalisis[pos],
                      tipores: mitipores[pos],
                      unicodi: miunicodi[pos]
                    })
                  }
                );
                const data = await response.json(); 
                //setTipomuestras(data.resformula); 
                console.log(' *** estos son los analitos formulados ****');
                console.log(data.resformula);
                setResformulados(data.resformula);

                
                // actualizar en los arreglos los resultados formulados q vonoeron eln el servicio
                data.resformula.map((obj) => {
                  let ordenf  = obj.orden; // se guarda resultado en arreglo
                  let resultf = obj.res; 
                  let idf = matriz[ordenf]; // obtengo el id del registro del analito formulado
                  results[idf] = resultf;
                });
   
            }
          catch {
            //setAlert( "Error invocando al servicio " );
            console.error(error);   
          }

        }
      }
    }
    // if (pendientesalvar==true){
    setMensaje('Cambios asegurados');
    setModalMensaje(true);
    //}
    // else {
    //   setMensaje('No hay cambios por salvar');
    //   setModalMensaje(true); 
    // }
  }

  const eliminarana = async (e) => {

    //alert('borrar ' + myIdResultado);
    const response = await fetch(
      `${baseurl}resultado/delete/${myIdResultado}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(selectedEmpresa)
        body: JSON.stringify({ usuario: user })
      }
    );
    alert('Resultado Eliminado');
  }

  

  const handleChangeIncluir = (event) => {
    const { name, value } = event.target;
    setIncluirExamen((prevIncluir) => ({
      ...prevIncluir,
      [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
    }));
    console.log('vector de inclusion');
    console.log(incluirExamen);

  };


  const handleChange = (e) => {
    // alert('dispara onchange ' )
    // results[analisis.id]

    const pos = valoresAyuda.indexOf(e.target.getAttribute("analisis"));
    //console.log('posicion en arreglo analisis =>' + pos);
    if (pos != -1 && e.target.value.length == 2 && e.target.value.charCodeAt(1) == 58) // tecla+: y si hay valores disponibles y el texto tiene solo un caracter
    {
      const token = e.target.value.substring(0, 1);
      const posi = teclasAyuda[pos].indexOf(token);
      //console.log('posicion en arreglo de teclas =>' + posi);

      if (posi != -1) {
        // alert('se encontro en posicion ' + pos + ' posi correspondiente ' +   posi);
        //console.log("texto=>" + valuesAyuda[pos][posi]); // se busca la misma posicion en values y teclas
        e.target.value = valuesAyuda[pos][posi];


      }
    }



    const { name, value } = e.target;
    setResults
      ((results) => ({
        ...results,
        [name]: value
      }));

  }

    useEffect(() =>{    
      setUsuario(user.username);
      //const x= traedatosenc();
  
    } );
  

  // traer los datos del encabezado y los examenes
  const traedatosenc = async () => {
    //alert("agencia " + agencia + "ordden "+ numorden);


    try {
      const response = await fetch(baseurl + "resultadoencabezado/find/" + agencia + "/" + numorden + "");
      const respuesta = await response.json();
      setRespuesta(respuesta);

      console.log(respuesta);
      if (respuesta.examenes) {
        setNombrepac(respuesta.paciente.nompac);
        setFecorden(respuesta.paciente.fecorden);
        setSexo(respuesta.paciente.sexo);

        setEdadf(respuesta.paciente.edadf);
        setListaexamenes(respuesta.examenes);  // aqui trae detalle de examenes
        setMedFirma(respuesta.paciente.medfirma);
        setHorFirma(respuesta.paciente.horfirma);
        setMedFirmae(respuesta.paciente.medfirmae);
        setHorFirmae(respuesta.paciente.horfirmae);
        setMembrete(respuesta.membrete);
        setMostrarex(true);

        // aqui debo inicializar el state de incluir cada examen
        respuesta.examenes.map((obj) => {
          setIncluirExamen((prevIncluir) => ({
            ...prevIncluir,
            [obj.seq]: 'S'
          }));
        });

      }
    } catch (error) {
      console.error(error);
    }
  }

  const imprimir = () => {

    setImpresion(true);
  }

  const imprimiroff = () => {

    setImpresion(false);
  }

  const analisisexamen = async (secu) => {
    setSeq(secu.target.id);
    setMianalisis(secu.target.getAttribute('analisis'));
    setMiTipoRes(secu.target.getAttribute('tipores'));

    console.log(' recibio parametros ' + agencia + '- ' + numorden + ' - ' + secu.target.id);

    setMostraran(false);

    fetch(baseurl + "resultadodetalle/find/" + agencia + "/" + numorden + "/" + secu.target.id, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => {

        setRespuestadet(resp);

        console.log(' llego respuesta **');
        console.log(resp);
        console.log(respuestadet);

        const tecla_ana = [];
        const valor_ana = [];
        const ayuda = [];
        const resultados = [];
        const matz = [];
        const exams = [];
        const anals = [];
        const tipos = [];
        const unids = [];

        //setRespuestadet(respuestadet);


        //setListaanalisis([{"cdganalisis":"","nomanalisis":"","resultado":""}]); // inicializamos detalle de analisis
        setResults([]);
        setResultsant([]);
        setMatriz([]);
        setMiExamen([]);
        setMianalisis([]);
        setMiTipoRes([]);
        setMiUniCodi([]);

        console.log(' lista de analisis ++');
        setListaanalisis(resp.analisis);
        console.log(resp.analisis);
        console.log(listaanalisis);


        setLoading(false); // para el mensaje loading

        if (resp.analisis)  // respuestadet.analisis
        {

          console.log('trajo analisis');
          console.log(respuestadet.analisis);
          setListaanalisis(resp.analisis); // est es la q llena la vista, multireg

          // llenado de valores de ayuda

          if (resp.resultado == 'success') {

            //resultados = [];
            //setResults([]);

            resp.analisis.map((obj) => { //
              //console.log('entra a valayuda: ');  

              resultados[obj.id] = obj.resultado; // se guarda resultado en arreglo
              matz[obj.orden] = obj.id;
              exams[obj.orden] = obj.cdgexamen;
              anals[obj.orden] = obj.cdganalisis;
              tipos[obj.orden] = obj.tipores;
              unids[obj.orden] = obj.unicodi == '' ? '*' : obj.unicodi;

              //setMatriz(  ...matriz, [obj.orden]= obj.id);

              if (obj.valayuda != '::::') {
                //console.log('valayuda: ');
                //console.log(obj.valayuda);
                const temp = obj.valayuda.split('::');
                const cadtec = temp[0];
                //console.log('cadena teclas ' + cadtec);
                const teclas = cadtec.split(";"); //1,2,3,4,5
                //console.log('split1 realizado ');
                const cadval = temp[1];
                const valores = cadval.split(";"); // No,++,pocas,escazas
                //console.log('splits 2 realizados');
                //console.log(teclas);

                // if (valoresAyuda.indexOf[obj.cdganalisis] == -1)
                if (ayuda.indexOf(obj.cdganalisis) == -1) {
                  //console.log('no esta en arreglo master');
                  //setValoresAyuda(current => [...current, obj.cdganalisis]);
                  ayuda.push(obj.cdganalisis);
                  const pos = ayuda.indexOf(obj.cdganalisis);
                  //console.log('ubicamos el exmen en ' +pos);
                  tecla_ana[pos] = teclas;
                  valor_ana[pos] = valores;
                }

              } // >8
            })
            setListaanalisis(resp.analisis);
            //if (respuestadet.analisis.length === resp.analisis.length)
            setMostraran(true);
            // continueRender(handle); // continua la renderizacion
          }
          setValuesAyuda(valor_ana);
          setTeclasAyuda(tecla_ana);
          setValoresAyuda(ayuda);

          setMiExamen(exams);
          setMianalisis(anals);
          setMiTipoRes(tipos);
          setMiUniCodi(unids);

          //console.log('estos son los valores del arreglo valoresayuda');
          //console.log(valoresAyuda);
          // 

          //console.log('estos son los valores del arreglo teclasayuda');
          //console.log(teclasAyuda);
          //console.log('va a salvar vector maestro');

          setResults(resultados);
          setResultsant(resultados);


          //console.log('estos son los matriz');
          //console.log(matz);
          setMatriz(matz); // guarda el mapa de las parejas orden-id del examen

          //console.log('estos son los matriz pero en el state');
          //console.log(matriz);
          // llenarDatosResultados(resultados); 
          //alert('sale');


        }


      }) //.then (data =>
      .catch(error => {
        console.error(error);
        return null;
      });

  }

  //******************************************

  const analisisexam = async (secu) => {

    setSeq(secu.target.id);
    setMianalisis(secu.target.getAttribute('analisis'));
    setMiTipoRes(secu.target.getAttribute('tipores'));

    // await delay(3000);
    try {
      const responsedet = await fetch(baseurl + "resultadodetalle/find/" + agencia + "/" + numorden + "/" + seq);
      const respuestadet = await responsedet.json();
      //const teclas =[];
      //const valores = [];


      const tecla_ana = []
      const valor_ana = [];
      const ayuda = [];
      const resultados = [];
      const matz = [];
      const exams = [];
      const anals = [];
      const tipos = [];
      const unids = [];

      console.log('respuestadet');
      console.log(respuestadet);

      setRespuestadet(respuestadet);
      //setListaanalisis([{"cdganalisis":"","nomanalisis":"","resultado":""}]); // inicializamos detalle de analisis
      setResults([]);
      setResultsant([]);
      setMatriz([]);
      setMiExamen([]);
      setMianalisis([]);
      setMiTipoRes([]);
      setMiUniCodi([]);


      console.log(listaanalisis);

      if (respuestadet.analisis) {

        console.log('trajo analisis');
        console.log(respuestadet.analisis);
        setListaanalisis(respuestadet.analisis);

        // llenado de valores de ayuda



        if (respuestadet.resultado == 'success') {

          //resultados = [];
          //setResults([]);
          setMostraran(true);
          respuestadet.analisis.map((obj) => {
            console.log('entra a valayuda: ');

            resultados[obj.id] = obj.resultado; // se guarda resultado en arreglo
            matz[obj.orden]    = obj.id;
            exams[obj.orden]   = obj.cdgexamen;
            anals[obj.orden]   = obj.cdganalisis;
            tipos[obj.orden]   = obj.tipores;
            unids[obj.orden]   = obj.unicodi == '' ? '*' : obj.unicodi;

            //setMatriz(  ...matriz, [obj.orden]= obj.id);

            if (obj.valayuda != '::::') {
              console.log('valayuda: ');
              console.log(obj.valayuda);
              const temp = obj.valayuda.split('::');
              const cadtec = temp[0];
              console.log('cadena teclas ' + cadtec);
              const teclas = cadtec.split(";"); //1,2,3,4,5
              console.log('split1 realizado ');
              const cadval = temp[1];
              const valores = cadval.split(";"); // No,++,pocas,escazas
              console.log('splits 2 realizados');
              console.log(teclas);

              // if (valoresAyuda.indexOf[obj.cdganalisis] == -1)
              if (ayuda.indexOf(obj.cdganalisis) == -1) {
                console.log('no esta en arreglo master');
                //setValoresAyuda(current => [...current, obj.cdganalisis]);
                ayuda.push(obj.cdganalisis);
                const pos = ayuda.indexOf(obj.cdganalisis);
                console.log('ubicamos el exmen en ' + pos);
                tecla_ana[pos] = teclas;
                valor_ana[pos] = valores;
              }

            } // >8
          })
        }
        setValuesAyuda(valor_ana);
        setTeclasAyuda(tecla_ana);
        setValoresAyuda(ayuda);

        setMiExamen(exams);
        setMianalisis(anals);
        setMiTipoRes(tipos);
        setMiUniCodi(unids);

        //console.log('estos son los valores del arreglo valoresayuda');
        //console.log(valoresAyuda);
        // 

        console.log('estos son los valores del arreglo teclasayuda');
        console.log(teclasAyuda);
        //console.log('va a salvar vector maestro');

        setResults(resultados);
        setResultsant(resultados);


        console.log('estos son los valores del arreglo results');
        console.log(results);

        console.log('estos son los matriz');
        console.log(matz);
        setMatriz(matz); // guarda el mapa de las parejas orden-id del examen

        console.log('estos son los matriz pero en el state');
        console.log(matriz);
        // llenarDatosResultados(resultados); 
        //alert('sale');

      }
    } catch (error) {
      console.error(error);
    }


  }



  const regteclares = (tec) => {
    // fires on keyup

    //alert('tecla ' + tec.target.value + 'long ' + tec.target.value.length + 'ascii' + tec.target.value.charCodeAt(tec.target.value.length-1) );

    //alert("longitod valores ayuda " + valoresAyuda.length )
    const pos = valoresAyuda.indexOf(tec.target.getAttribute("analisis"));
    //console.log('posicion en arreglo analisis =>' + pos);
    if (pos != -1 && tec.target.value.length == 2 && tec.target.value.charCodeAt(1) == 58) // tecla+: y si hay valores disponibles y el texto tiene solo un caracter
    {
      const token = tec.target.value.substring(0, 1);
      const posi = teclasAyuda[pos].indexOf(token);
      //console.log('posicion en arreglo de teclas =>' + posi);

      if (posi != -1) {
        // alert('se encontro en posicion ' + pos + ' posi correspondiente ' +   posi);
        //console.log("texto=>" + valuesAyuda[pos][posi]); // se busca la misma posicion en values y teclas
        tec.target.value = valuesAyuda[pos][posi];


      }
    }


  }

  return (
    <>
    { user && user.username ? ( 
    <> 

      <div className="table table-hover">

        <h2>Resultados</h2> {seq}

        <div className='row'>
          <div className="form-group col-1">
            <label htmlFor="Agencia">Agencia</label>
            <input className="form-control" type="text" name="agencia" id="agencia" onChange={handleAgenciaChange} />
          </div>

          <div className="form-group col-2">
            <label className="" htmlFor="Orden">Numero de Orden</label>
            <input className="form-control" type="text" name="orden" id="orden" onChange={handleOrdenChange} />
          </div>

        </div>
        <br></br>

        <div >
            <button  style={{ display: mostrarex ? "none" : "block" }}   className="btn btn-primary btn-sm" onClick={traedatosenc}>Buscar</button>
            <span>{"  "}</span>

            <button style={{ display: mostrarex ? "block" : "none" }} className="btn btn-primary btn-sm"  onClick={() => {setMostrarex(false);}} >Limpiar</button>
            <span>{"  "}</span>

            <button
              className="btn btn-primary"
              onClick={grabarcambios}
            >
              Guardar Cambios
            </button>
            <span>{"  "}</span>
            <button
              className="btn btn-primary"
              onClick={imprimir}
            >
              Imprimir Resultado
            </button>
        </div>


        <div  style={{ display: mostrarex ? "block" : "none" }} >

          <div className='row'>
            <div className="form-group col-1">
              <label htmlFor="Fecha">Fecha</label>
              <input disabled className="form-control" type="text" name="fecorden" id="fecorden" value={fecorden} />
            </div>

            <div className="form-group col-2">
              <label className="" htmlFor="Nombre">Nombre del paciente</label>
              <input disabled className="form-control" type="text" name="nompac" id="nompac" value={nombrepac} />
            </div>

            <div className="form-group col-3">
              <label className="" htmlFor="Edad">Edad paciente</label>
              <input disabled className="form-control" type="text" name="edadf" id="edadf" value={edadf} />
            </div>

            <div className="form-group col-4">
              <label className="" htmlFor="Sexo">Sexo</label>
              <input disabled className="form-control" type="text" name="sexo" id="sexo" value={sexo} />
            </div>
          </div>




          <div className='row'>

            <div className="form-group col-1">
              <label className="" htmlFor="Firmado">Firmado</label>
              <input disabled className="form-control" type="text" name="medfirma" id="medfirma" value={medfirma} />
            </div>
            <div className="form-group col-2">
              <label className="" htmlFor="HoraFirma">HoraFirma</label>
              <input disabled className="form-control" type="text" name="horfirma" id="horfirma" value={horfirma} />
            </div>
            <div className="form-group col-3">
              <label className="" htmlFor="Firmadoe">Firma Elab</label>
              <input disabled className="form-control" type="text" name="medfirmae" id="medfirmae" value={medfirmae} />
            </div>
            <div className="form-group col-4">
              <label className="" htmlFor="HoraFirmae">HoraFirma Elab</label>
              <input disabled className="form-control" type="text" name="horfirmae" id="horfirmae" value={horfirmae} />
            </div>


          </div>


          <div className='' style={{ display: mostrarex ? "block" : "none" }} >

            <table striped bordered hover>

              <thead>
                <tr>
                  <th>seq</th>
                  <th>Examen</th>
                  <th>Nombre</th>
                  <th>Firmado</th>
                  <th>Hora</th>
                  <th>Firmado2</th>
                  <th>Hora</th>
                  <th>Elaborado</th>
                  <th>Hora</th>
                  <th>Incluir</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaexamenes.map((examen) => (

                  { mostrarex } && (<tr>
                    <td>{examen.seq}</td>
                    <td style={{ backgroundColor: examen.seq==seq ? "#F4D03F" : "white" }}>{examen.cdgexamen}</td>
                    <td style={{ backgroundColor: examen.seq==seq ? "#F4D03F" : "white" }} >{examen.nombre}</td>

                    <td> {examen.medfirmad} </td>
                    <td> {examen.horfirmad} </td>
                    <td> {examen.medfirmad2} </td>
                    <td> {examen.horfirmad2} </td>

                    <td> {examen.medfirmae} </td>
                    <td >{examen.horfirmae} </td>

                    <td>
                      <input
                        type='checkbox'
                        id={examen.seq}
                        name={examen.seq}
                        checked={incluirExamen[examen.seq] == 'S' ? true : false}
                        onChange={handleChangeIncluir}
                      />
                    </td>

                    <td>
                      <button id={examen.seq}
                        onClick={analisisexamen}
                        className="btn btn-primary"
                       
                        
                      >
                        Gestionar
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => { setSeq(examen.seq); firmar('O', '1'); }}
                      >
                        Firmar
                      </button>
                    </td>

                    <td>
                      {examen.numfirmas > 1 &&
                        <button
                          className="btn btn-primary"
                          onClick={() => { setSeq(examen.seq); firmar('O', '2'); }}
                        >
                          Firmar(2a)
                        </button>}

                    </td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => { firmar('E', '1') }}
                      >
                        Elab
                      </button>

                    </td>

                  </tr>)

                ))}
              </tbody>
            </table>
          </div>

          <div className='row'>
          </div>
          <br />


          <div className="row" style={{ display: mostraran ? "block" : "none" }}>

            <div style={{ display: mostrarex ? "block" : "none" }} className=''>
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

                  {listaanalisis.map((analisis) => (

                    <tr>
                      <td>{analisis.nomanalisis}</td>
                      <td>
                        <label>
                          <input className="form-control" type="text" name={analisis.id} id={analisis.id} key={analisis.id}
                            value={results[analisis.id]} onChange={handleChange} analisis={analisis.cdganalisis} tipores={analisis.tipores} orden={analisis.orden} />
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
                        onClick={() => { setMyIdResultado(analisis.id); setModalEliminar(true) }}
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
              Estás seguro que deseas eliminar El resultado {myIdResultado} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={eliminarana}>Sí</button>
              <button className="btn btn-secundary" onClick={() => setModalEliminar(false)}>No</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalMensaje}>
            <ModalBody>
              {mensaje}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secundary" onClick={() => setModalMensaje(false)}>Cerrar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={impresion} style={ModalCustomStyle} size="xl">

            <ModalBody >
              <RepResultado miage={agencia} miord={numorden} milista={incluirExamen} membrete={membrete} usuario={user.username} />
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secundary" onClick={() => setImpresion(false)}>Cerrar</button>
            </ModalFooter>

          </Modal>


        </div>
      </div>


      </>
      ) : (
        <Navigate to="/login" />
      )}
    </>

  );

  //}

}

export default Resultados;