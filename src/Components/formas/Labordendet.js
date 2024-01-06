import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, } from 'react-bootstrap';
import axios from 'axios';
import RepOrden from './RepOrden';
import FinderDiagnostico from './FinderDiagnostico';

import Labordenpago from './Labordenpago';

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Labordendet = (props) => {

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



  const [mipresOn, setMipresOn] = useState(true);
  const [polizaOn, setPolizaOn] = useState(true);
  const [numautoOn, setNumautoOn] = useState(true);

  const [datospaciente, setDatospaciente] = useState({});

  const [modalMensaje, setModalMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');

  //const [usuario, setUsuario] = useState('FCHARRIS');

  const [etapa, setEtapa] = useState('ORDEN');  //'RCAJA','ORDEN'
  const [labordendet, setLabordendet] = useState([]);
  const [laborden, setLaborden] = useState([]);

  const [miempresa, setMiempresa] = useState(null);
  const [miordenl, setMiordenl] = useState('');

  //--------------- para los tabs de laborden y paciente
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  // --------buscador examen ----------------------------------
  const [miExamen, setMiExamen] = useState('');
  const [resultadosExamenes, setResultadosExamenes] = useState([]);
  const [miExamenDesc, setMiExamenDesc] = useState('');
  const [ocultaresExamenes, setOcultaResExamenes] = useState(true);

  // -----------------para la vista de paciente ------------------- 
  const [paciente, setPacientes] = useState([]);
  const [selectedPacientes, setSelectedPacientes] = useState({});



  // diagnosticos
  const [finderDiag, setFinderDiag] = useState(''); // campo dummy para probar finder
  const [showFinderDiag, setShowFinderDiag] = useState(false); // campo dummy para probar finder
  const [finderDescDiag, setFinderDescDiag] = useState(''); // campo dummy para la descripcion del codigo digitado


  const handleMedicoChange = (event) => {

    setMimedico(event.target.value);
    selectedLaborden.codmedico = event.target.value
    //setMiMedicoDesc('');
  };


  // states para buscador de medicos
  const [miMedico, setMimedico] = useState('');
  const [resultadosMedico, setResultadosMedico] = useState([]);
  const [miMedicoDesc, setMiMedicoDesc] = useState('');
  const [ocultaresMedico, setOcultaResMedico] = useState(true);


  const [tablaLaborden, setTablaLaborden] = useState([]);
  const [selectedLaborden, setSelectedLaborden] = useState({}); // encabezado
  const [selectedLabordendet, setSelectedLabordendet] = useState({});  // detalle
  const [showModal, setShowModal] = useState(false);
  const [showModalOl, setShowModalOl] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const [opciones_codcombo, setOpcionesCodcombo] = useState([]); // para la lista de combos
  const [micombo, setMicombo] = useState('');

  const [dependglobal, setDependglobal] = useState(''); // para guardar la dependencia a colocarle a toda la orden

  const [titulomodal, setMititulomodal] = useState('');


  const mapear_codcombo = async () => {
    try {
      const response = await fetch(baseurlov + 'labcombo');
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesCodcombo(opciones);
    } catch (error) {
      console.error(error);
    }
  }


  const [newLabordendet, setNewLabordendet] = useState({
    id: '',
    codage: props.miage,
    numorden: props.miord,
    cdgexamen: '',
    valor: 0,
    desc1: 0,
    desc2: 0,
    desc3: 0,
    partic: 'N',
    corte: 'N',
    pend: 'N',
    codcombo: '0',
    subtemp: 0,
    subtpac: 0,
    seq: 0,
    cuotam: 0,
    fechapend: null,
    remi: 'N',
    ordenam: '0',
  });
  const [alert, setAlert] = useState('');
  useEffect(() => {

    
    setUsuario(user.username);

    obtenerLabordendet();
    obtenerLaborden();
    obtenerPaciente();
    //  setMiempresa(data.data[0].codemp);
    mapear_estado();
    mapear_codage();
    mapear_agefaccli();
    mapear_tipide();
    mapear_codemp();
    mapear_depend(); // mapea las dependencias de la empresa 
    mapear_codcombo(); // para la lista de combos

    mapear_sexo();
    mapear_vincpac();
    mapear_codocu();
    mapear_deppac();
    mapear_ciupac();
    mapear_planben();
    mapear_codundnegocio();


  }, []);


  //const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/agencias/`; 
  //const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

  const baseserver = `${process.env.REACT_APP_ENDPOINT_DATA}/`;
  const baseurl = baseserver + 'labordendet/';
  const baseurl2 = baseserver + 'laborden/';
  const baseurl3 = baseserver +'labdepend/';
  const baseurlov = baseserver +'lov/'
  const baseurlovl = baseserver + 'lovl/'
  const baseurlpac = baseserver + 'paciente/';

  const [opciones_estado, setOpcionesEstado] = useState([]); const [opciones_codage, setOpcionesCodage] = useState([]); const [opciones_agefaccli, setOpcionesAgefaccli] = useState([]); const [opciones_tipide, setOpcionesTipide] = useState([]); const [opciones_codemp, setOpcionesCodemp] = useState([]);
  const [opciones_depend, setOpcionesDepend] = useState([]);


  //--------------------------- buscador de examenes -------------------------------------
  const limpiar = () => {
    setResultadosExamenes([]);
    setOcultaResExamenes(true);
    setResultadosMedico([]);
    setOcultaResMedico(true);
  }

  // servicio que busca examenes
  const handleBuscarlovlClickExa = async () => {
    //alert('buscar exa ' + miExamen);
    if (miExamen == '') {
      setResultadosExamenes([]);
      setOcultaResExamenes(true);
    }
    else {
      try {
        const response = await axios.get(`${baseurlovl}examenes/${miExamen}`);
        setResultadosExamenes(response.data.data);
        setOcultaResExamenes(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  function validar_examen(exa) {
    fetch(baseurl + "validate/examenes/" + exa)
      .then(response => response.json())
      .then(data => {
        //console.log("Dentro fetch exitoso paciente");
        const nombres = '';
        nombres = data.data[0].nombre;
        return (nombres);
      })
      .catch(error => {
        console.error(error);
        return (null);
      });
  }

  // servicio que busca medicos
  const handleBuscarlovlClickMedi = async () => {
    //alert('buscar exa ' + miExamen);
    if (miMedico == '') {
      setResultadosMedico([]);
      setOcultaResMedico(true);
    }
    else {
      try {
        const response = await axios.get(`${baseurlovl}medicos/${miMedico}`);
        setResultadosMedico(response.data.data);
        setOcultaResMedico(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // validar nombre del medico
  function validar_medico(medi) {
    fetch(baseurl + "validate/medicos/" + medi)
      .then(response => response.json())
      .then(data => {
        //console.log("Dentro fetch exitoso paciente");
        const nombres = '';
        nombres = data.data[0].nombre;
        return (nombres);
      })
      .catch(error => {
        console.error(error);
        return (null);
      });
  }


  // patron multiproposito, lo muevo al handlenewchange original de la forma
  // const handleExamenChange = (event) => {
  //   setMiExamen(event.target.value);
  //    };

  // -----------------------------------------------------------------------------------------


  const mapear_estado = async () => {
    try {
      const listado = [{ "id": "", "name": "Seleccione opcion" }, { "id": "A", "name": "Asentada" }, { "id": "X", "name": "Anulada" }];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesEstado(opciones);
    } catch (error) {
      console.error(error);
    }
  }

  // ubica las dependencias de la empresa seleccionada
  const mapear_depend = async () => {
    try { // + selectedLaborden.codemp
      const response = await fetch(baseurl3 + 'selectone/' + miempresa);
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesDepend(opciones);
      console.log(opciones);
    } catch (error) {
      console.error(error);
    }
  }

  const mapear_codage = async () => {
    try {
      const response = await fetch(baseurlov + 'agencia');
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesCodage(opciones);
    } catch (error) {
      console.error(error);
    }
  }

  const mapear_agefaccli = async () => {
    try {
      const response = await fetch(baseurlov + 'agencia');
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesAgefaccli(opciones);
    } catch (error) {
      console.error(error);
    }
  }

  const mapear_tipide = async () => {
    try {
      const response = await fetch(baseurlov + 'tipoident');
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesTipide(opciones);
    } catch (error) {
      console.error(error);
    }
  }

  const mapear_codemp = async () => {
    try {
      const response = await fetch(baseurlov + 'labempresa');
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>));
      setOpcionesCodemp(opciones);
    } catch (error) {
      console.error(error);
    }
  }


  const obtenerLabordendet = async () => {
    try {
      const response = await fetch(baseurl + 'selectone/' + props.miage + '/' + props.miord);
      const data = await response.json();
      setLabordendet(data.data);
      setTablaLabordendet(data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const obtenerPaciente = async () => {
    try {
      // alert(busqueda);
      //if ( busqueda.length > 2) // solo cuando haya un patron en la barra
      //{
      const response = await fetch(baseurlpac + "selectoneonly/" + selectedLaborden.tipide + "/" + selectedLaborden.codpac);
      const data = await response.json();
      setSelectedPacientes(data.data[0]);
      setFinderDiag(data.data[0].coddiagnostico);
      validar_diagnostico(data.data[0].coddiagnostico);

      //  setTablaPacientes(data.data);
      //}
    } catch (error) {
      console.error(error);
    }
  };


  const mapear_codundnegocio = async () => {
    try {
      const response = await fetch(baseurlov + "unegocio");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCodundnegocio(opciones);
    } catch (error) {
      console.error(error);
    }
  };


  const actualizarLabordendet = async () => {
    try {
      const response = await fetch(
        `${baseurl}update/${selectedLabordendet.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            datos: {
              codage: selectedLabordendet.codage,
              numorden: selectedLabordendet.numorden,
              cdgexamen: selectedLabordendet.cdgexamen,
              valor: selectedLabordendet.valor,
              desc1: selectedLabordendet.desc1,
              desc2: selectedLabordendet.desc2,
              desc3: selectedLabordendet.desc3,
              partic: selectedLabordendet.partic,
              corte: selectedLabordendet.corte,
              pend: selectedLabordendet.pend,
              codcombo: selectedLabordendet.codcombo,
              subtemp: selectedLabordendet.subtemp,
              subtpac: selectedLabordendet.subtpac,
              seq: selectedLabordendet.seq,
              cuotam: selectedLabordendet.cuotam,
              fechapend: selectedLabordendet.fechapend,
              remi: selectedLabordendet.remi,
              ordenam: selectedLabordendet.ordenam,
              coddep: selectedLabordendet.coddep
            }, control: { usuario: usuario, empresa: miempresa }
          })

        });
      const data = await response.json();
      if (response.status == 200) {
        setAlert('La Labordendet ha sido actualizada exitosamente.');
        setShowModal(false);
        obtenerLabordendet();
        //setMiempresa(selectedLaborden.codemp);
        setOpcionesDepend([]); // blanqueo state
        mapear_depend();

      } else if (response.status == 400) { setAlert(data.detail); } else { setAlert('Error desconocido'); }
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarLabordendet = async (id, combo) => {
    if (window.confirm('Esta seguro que desea eliminar el examen? Si el examen pertenece a combo, se eliminaran los examenes del mismo combo')) {
      try {
        const response = await fetch(baseurl + "delete/" + id,
          //`${baseurl}delete/${id}`,
          {
            method: 'DELETE',
            body: JSON.stringify({ datos: { age: props.miage, ord: props.miord, codcombo: combo }, control: { usuario: usuario } })
          }
        );
        const data = await response.json();
        setAlert('La Labordendet ha sido eliminada exitosamente.');
        obtenerLabordendet();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const aplicarCombo = async () => {

    if (window.confirm('Esta seguro que desea adicionar los examenes de este combo?')) {
      // if (micombo=='') {alert('No se ha seleccionado Combo, elija uno')}
      // else {
      // alert('agencia ' + props.miage + ' orden '+props.miord + ' combo ' + micombo);
      //alert('entra a servicio aplicar combo ');
      try {
        // const response = await fetch(`${baseserver}insertcombo/`,
        const response = await fetch(baseurl + "insertcombo",
          {
            method: 'POST',
            body: JSON.stringify({
              datos: { codage: props.miage, numorden: props.miord, codcombo: micombo }
              , control: { usuario: usuario }
            })
          }
        );
        const data = await response.json();

        if (response.status == 200) {
          setAlert("Operacion exitosa");
          setShowNewModal(false);
        } else if (response.status == 400) {
          setAlert(data.detail);
        } else {
          setAlert('Error desconocido');
        }
        //setAlert('La Labordendet ha sido eliminada exitosamente.');
        obtenerLabordendet();
      } catch (error) {
        console.error(error);
      }
      //   }
    }
  };

  const aplicarDepend = async () => {

    if (window.confirm('Esta seguro que desea aplicar la misma dependencia a todos los examanes?')) {

      try {
        // const response = await fetch(`${baseserver}insertcombo/`,
        const response = await fetch(baseurl + "cambiardepend",
          {
            method: 'POST',
            body: JSON.stringify({
              datos: { codage: props.miage, numorden: props.miord, coddep: dependglobal }
              , control: { usuario: usuario }
            })
          }
        );
        const data = await response.json();

        if (response.status == 200) {
          setAlert("Operacion exitosa");
          setShowNewModal(false);
        } else if (response.status == 400) {
          setAlert(data.detail);
        } else {
          setAlert('Error desconocido');
        }
        //setAlert('La Labordendet ha sido eliminada exitosamente.');
        obtenerLabordendet();
      } catch (error) {
        console.error(error);
      }
      //   }
    }
  };



  const obtenerLaborden = async () => {
    try {
      const response = await fetch(baseurl2 + 'selectoneonly/' + props.miage + '/' + props.miord);
      const data = await response.json();
      setLaborden(data.data[0]);   // tomar el primer reg
      setSelectedLaborden(data.data[0]);
      console.log(' datos de la op encab , codemp:');
      console.log(data.data[0].codemp);
      setMiempresa(data.data[0].codemp);  // salva el valor de la empresa de la orden
      setMimedico(data.data[0].codmedico);
      mapear_depend();
      //setTablaLaborden(data.data);
    } catch (error) {
      console.error(error);
    }
  };






  const actualizarLaborden = async () => {
    try {
      const response = await fetch(
        `${baseurl2}update/${selectedLaborden.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fecorden: selectedLaborden.fecorden,
            estado: selectedLaborden.estado,
            codage: selectedLaborden.codage,

            numorden: selectedLaborden.numorden,
            agefaccli: selectedLaborden.agefaccli,
            numfaccli: selectedLaborden.numfaccli,
            tipide: selectedLaborden.tipide,
            codpac: selectedLaborden.codpac,
            codemp: selectedLaborden.codemp,
            contpac: selectedLaborden.contpac,
            interlab: selectedLaborden.interlab,
            prio: selectedLaborden.prio,
            codmedico: selectedLaborden.codmedico ? selectedLaborden.codmedico : miMedico,
            nivpac: selectedLaborden.nivpac,
            copago: selectedLaborden.copago,
            cuotam: selectedLaborden.cuotam,
            bono: selectedLaborden.bono,
            descpac: selectedLaborden.descpac,
            abopac: selectedLaborden.abopac,
            coddiagnostico: selectedLaborden.coddiagnostico,
            totemp: selectedLaborden.totemp,
            totpac: selectedLaborden.totpac,
            usuario: selectedLaborden.usuario,
            dur: selectedLaborden.dur,
            descpacp: selectedLaborden.descpacp,
            factura: selectedLaborden.factura,
            edadf: selectedLaborden.edadf,
            facturar: selectedLaborden.facturar,
            pendaprob: selectedLaborden.pendaprob,
            embar: selectedLaborden.embar,
            fechasol: selectedLaborden.fechasol,
            usuvbo: selectedLaborden.usuvbo,
            horvbo: selectedLaborden.horvbo,
            idbono: selectedLaborden.idbono,
            mipres: selectedLaborden.mipres,
            poliza: selectedLaborden.poliza,
            contrato: selectedLaborden.contrato,
            fecent: selectedLaborden.fecent,
            horent: selectedLaborden.horent,
            web: selectedLaborden.web,
          })
        });
      const data = await response.json();
      if (response.status == 200) {
        setAlert('La Laborden ha sido actualizada exitosamente.');
        setShowModal(false);
        recalcularTotales(); // recalcula los totales de la orden
        obtenerLaborden();
        setMiempresa(selectedLaborden.codemp);
        mapear_depend(); // actualiza la lista de dependencias de la empresa 
        // aqui debo recalcular los totales de la orden -----------------------------
        mapear_depend();

        // fin ----------------------------------------------------------------------

      } else if (response.status == 400) { setAlert(data.detail); } else { setAlert('Error desconocido'); }
    } catch (error) {
      console.error(error);
    }
  };



  const recalcularTotales = async () => {
    try {
      const response = await fetch(
        `${baseurl2}liquida`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            datos: {
              codage: selectedLaborden.codage,
              numorden: selectedLaborden.numorden,
            }, control: { usuario: usuario }
          })
        });
      const data = await response.json();
      if (response.status == 200) {
        console.log('ok');
      } else if (response.status == 400) { console.error(data.detail); }
    } catch (error) {
      console.error(error);
    }
  };



  const actualizarPacientes = async () => {
    try {
      const response = await fetch(`${baseurlpac}update/${selectedPacientes.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipide: selectedPacientes.tipide,
          codpac: selectedPacientes.codpac,
          nompac: selectedPacientes.nompac,
          nompac2: selectedPacientes.nompac2,
          apepac: selectedPacientes.apepac,
          apepac2: selectedPacientes.apepac2,
          sexo: selectedPacientes.sexo,
          vincpac: selectedPacientes.vincpac,
          fecnac: selectedPacientes.fecnac,
          fecing: selectedPacientes.fecing,
          codocu: selectedPacientes.codocu,
          deppac: selectedPacientes.deppac,
          ciupac: selectedPacientes.ciupac,
          gruposang: selectedPacientes.gruposang,
          codemp: selectedPacientes.codemp,
          coddiagnostico: finderDescDiag ? finderDiag : '',
          contpac: selectedPacientes.contpac,
          planben: selectedPacientes.planben,
          codundnegocio: selectedPacientes.codundnegocio,
          nivpac: selectedPacientes.nivpac,
          obs: selectedPacientes.obs,
          dir: selectedPacientes.dir,
          tel: selectedPacientes.tel,
          remite: selectedPacientes.remite,
          cedaco: selectedPacientes.cedaco,
          nomaco: selectedPacientes.nomaco,
          apeaco: selectedPacientes.apeaco,
          telaco: selectedPacientes.telaco,
          diraco: selectedPacientes.diraco,
          celular: selectedPacientes.celular,
          acofam: selectedPacientes.acofam,
        }),
      });
      const data = await response.json();

      if (response.status == 200) {
        setAlert("La Pacientes ha sido actualizada exitosamente.");
        setShowModal(false);
        obtenerPaciente();

      } else if (response.status == 400) {
        setAlert(data.detail);
      } else {
        setAlert('Error desconocido');
      }

    } catch (error) {
      console.error(error);
    }
  };

  // controlar el cambio en la lista de combos
  const changecombo = (event) => {
    const { name, value } = event.target;
    setMicombo(event.target.value);
  };

  // controlar el cambio en la lista de dependencias globales
  const handleChangeDepend = (event) => {
    const { name, value } = event.target;
    setDependglobal(event.target.value);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    setMiExamen(event.target.value);

    setSelectedLabordendet((prevLabordendet) => ({
      ...prevLabordendet,
      [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
    }));
  };
  const handleChangeOl = (event) => {
    const { name, value } = event.target;

    if (selectedLaborden.codemp == '00') {
      setMipresOn(true);
      setPolizaOn(true);
      setNumautoOn(true);
    }
    else {
      setMipresOn(false);
      setPolizaOn(true);
      setNumautoOn(false);
    }


    setSelectedLaborden((prevLaborden) => ({
      ...prevLaborden,
      [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
    }));
  };
  const handleChangepac = (event) => {
    const { name, value } = event.target;

    // buscador diagn
    //setFinderDiag(event.target.value);
    //setFinderDescDiag('');

    setSelectedPacientes((prevPacientes) => ({
      ...prevPacientes,
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
    setMiExamen(event.target.value); // seteo campo de busqueda o buscador
    setNewLabordendet((prevLabordendet) => ({
      ...prevLabordendet,
      [name]: event.target.type == 'checkbox' ? (event.target.checked ? 'S' : 'N') : value
    }));
  };
  const blanquearModal = () => {
    setNewLabordendet({
      id: '',
      codage: '',
      numorden: '',
      cdgexamen: '',
      valor: 0,
      desc1: 0,
      desc2: 0,
      desc3: 0,
      partic: 'N',
      corte: 'N',
      pend: 'N',
      codcombo: '',
      subtemp: 0,
      subtpac: 0,
      seq: '',
      cuotam: 0,
      fechapend: null,
      remi: '',
      ordenam: '',

    });
    return ('ok');
  }
  const insertarLabordendet = async () => {
    //console.log(newLabordendet);

    try {
      const response = await fetch(baseurl + 'insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          datos: {
            codage: props.miage,
            numorden: props.miord,
            cdgexamen: newLabordendet.cdgexamen,
            valor: newLabordendet.valor,
            desc1: newLabordendet.desc1,
            desc2: newLabordendet.desc2 ? newLabordendet.desc2 : 0,
            desc3: newLabordendet.desc3 ? newLabordendet.desc2 : 0,
            partic: newLabordendet.partic,
            corte: newLabordendet.corte,
            pend: newLabordendet.pend,
            codcombo: newLabordendet.codcombo,
            subtemp: newLabordendet.subtemp,
            subtpac: newLabordendet.subtpac,
            seq: newLabordendet.seq,
            cuotam: 0,
            fechapend: newLabordendet.fechapend,
            remi: newLabordendet.remi,
            ordenam: newLabordendet.ordenam
          }, control: { usuario: usuario, empresa: miempresa }
        })
      });
      const data = await response.json();
      if (response.status == 200) {
        setAlert('El(La) Orden Lab ha sido agregado(a) exitosamente.');
        setShowNewModal(false);
        const x = blanquearModal();
        obtenerLabordendet();
      } else if (response.status == 400) { setAlert(data.detail); } else { setAlert('Error desconocido'); }
    } catch (error) {
      console.error(error);
    }
  };
  // ******************** busquedas ****************************** 
  const [tablaLabordendet, setTablaLabordendet] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const handleChangeFinder = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaLabordendet.filter((elemento) => {
      if (elemento.cdgexamen.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) { return elemento; }
    });
    setLabordendet(resultadosBusqueda);
  }
  // ******************* pacientes ********************************

  const [opciones_sexo, setOpcionesSexo] = useState([]);
  const [opciones_vincpac, setOpcionesVincpac] = useState([]);
  const [opciones_codocu, setOpcionesCodocu] = useState([]);
  const [opciones_deppac, setOpcionesDeppac] = useState([]);
  const [opciones_ciupac, setOpcionesCiupac] = useState([]);
  const [opciones_planben, setOpcionesPlanben] = useState([]);
  const [opciones_codundnegocio, setOpcionesCodundnegocio] = useState([]);

  const imprimir = () => {
    console.log('imprimir');
    setEtapa('IMPRIMIR');
  }



  const mapear_sexo = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "M", name: "Masculino" },
        { id: "F", name: "Femenino" },
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesSexo(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_vincpac = async () => {
    try {
      const response = await fetch(baseurlov + "vinculacion");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesVincpac(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_codocu = async () => {
    try {
      const response = await fetch(baseurlov + "ocupacion");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCodocu(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_deppac = async () => {
    try {
      const response = await fetch(baseurlov + "departamento");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesDeppac(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  const mapear_ciupac = async () => {
    try {
      const response = await fetch(baseurlov + "ciudad");
      const data = await response.json();
      const opciones = data.data.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesCiupac(opciones);
    } catch (error) {
      console.error(error);
    }
  };



  const mapear_planben = async () => {
    try {
      const listado = [
        { id: "", name: "Seleccione opcion" },
        { id: "NOPBS", name: "NOPBS" },
        { id: "PBS", name: "PBS" },
        { id: "PART", name: "Particular" },
      ];
      const opciones = listado.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      ));
      setOpcionesPlanben(opciones);
    } catch (error) {
      console.error(error);
    }
  };

  // texto diagnostico
  const handleChangeFinderDiag = (event) => {
    setFinderDiag(event.target.value);
    setFinderDescDiag('');
  };
  // para controlar si se muestra o no el finder
  const handleDclickDiag = (event) => {
    // aqui hay q revisar si la cadena contiene % para usar el buscador o invocar a validar
    // para buscar la descripcion
    let primcar = finderDiag.substring(0, 1);
    if (primcar == '%') {
      setShowFinderDiag(true);
    }
    else {
      setShowFinderDiag(false);
      // alert(' va a buscar ' + finderDiag);
      let descripcion = validar_diagnostico(finderDiag);
      //alert(' retorno ' + descripcion);
    }
  }
  // para traer la descripcion al digitar el codigo
  function validar_diagnostico(patro) {
    // alert(' se buscara ' + patro);
    fetch(baseurl + "validate/diagnosticos/" + patro)
      .then(response => response.json())
      .then(data => {
        console.log(' respuesta del servicio validate ');
        console.log(data);
        let nombres = '';
        nombres = data.name;
        setFinderDescDiag(nombres);
        return (nombres);
      })
      .catch(error => {
        console.error(error);
        return (null);
      });
  }

  return (
      <>
    { user && user.username ? ( 
    <> 

      {etapa == 'ORDEN' && (
        <>
          <h1>Detalle de Orden Lab {props.miage}-{props.miord}  </h1>
          {alert && (
            <Alert variant='success' onClose={() => setAlert('')} dismissible>
              {alert}
            </Alert>
          )}
          {/*<Button onClick={() => setShowNewModal(true)} className='mb-3'>
        Agregar Orden Lab
      </Button> */}


    {selectedPacientes && (<div>
            <table>
              <tr>
                <td>
                  Paciente
                </td>
                <td>
                  {selectedPacientes.nompac + ' ' + selectedPacientes.nompac2 + ' ' + selectedPacientes.apepac + ' ' + selectedPacientes.apepac2}
                </td>
              </tr>
              <tr>
                <td>
                  TipoIdent
                </td>
                <td>
                  {selectedPacientes.tipide}
                </td>
              </tr>
              <tr>
                <td>
                  Ident
                </td>
                <td>
                  {selectedPacientes.codpac}
                </td>
              </tr>
              <tr>
                <td>
                  Edad
                </td>
                <td>
                  {selectedLaborden.edadf}
                </td>
              </tr>
            </table>
          </div>
          )}


          <Button onClick={() => { obtenerLaborden(); setSelectedLaborden(laborden); obtenerPaciente(); setMititulomodal('Informacion de la Orden'); setShowModalOl(true) }} className='mb-3'>
            Editar Encabezado de Orden
          </Button>
          <span> </span>
          <Button onClick={() => setEtapa('RCAJA')} className='mb-3'>
            Recibos de Caja
          </Button>
          <span> </span>
          <Button onClick={() => imprimir()} className='mb-3'>
            Imprimir Orden
          </Button>
          <span> </span>
          <Button onClick={() => props.regresar('ENC')} className='mb-3'>
            Regresar a Ordenes del paciente
          </Button>

          {/* -------------- panel para crear registros---------------- */}


          <div class='container'>
            <div class='row'>

              <div class='col' > {/* 4  */}

                <label>Examen</label>
                <input name='cdgexamen' type="text" value={newLabordendet.cdgexamen} onChange={handleNewChange} />
                <button onClick={handleBuscarlovlClickExa}>Buscar</button>
                <span> </span>
                <button onClick={limpiar}>Limpiar</button>

                {(!ocultaresExamenes) && resultadosExamenes.length > 0 &&
                  < div name='marcores_examenes' style={{ overflowY: 'scroll', height: '350px' }}>
                    <ul>
                      {resultadosExamenes.map((resultado) => (
                        <li onDoubleClick={() => { setMiExamen(resultado.id); newLabordendet.cdgexamen = resultado.id; limpiar(); }} key={resultado.id}>{resultado.id}-{resultado.name} </li>
                      ))}
                    </ul>
                  </div>}
                <span> </span>
                <Button variant='primary' onClick={insertarLabordendet}>
                  Agregar Examen
                </Button>

              </div> {/* fin campo */}
            </div>
            <div class='row'>
              <div class='col' > {/* 1  */}
                <label for='lbl'>Particular</label>
                <input type='checkbox' name='partic' checked={newLabordendet.partic == 'S' ? true : false}
                  onChange={handleNewChange} />
              </div> {/* fin campo */}
              <div class='col' > {/* 2  */}
                <label for='lbl'>Cortesia</label>
                <input type='checkbox' name='corte' checked={newLabordendet.corte == 'S' ? true : false}
                  onChange={handleNewChange} />
              </div> {/* fin campo */}
            </div>
            <div class='col' > {/* 3  */}
              <label for='lbl'>Pendiente</label>
              <input type='checkbox' name='pend' checked={newLabordendet.pend == 'S' ? true : false}
                onChange={handleNewChange} />
            </div> {/* fin campo */}
          </div> {/* fin row */}



          <div class='row'>
            <div class='col' >

              <select onChange={changecombo} class='form-select form-select-sm' id='codcombo' name='codcombo' value={micombo} > {opciones_codcombo}
              </select>
            </div>
            <div class='col' >
              <Button variant='primary' onClick={aplicarCombo} class='btn btn-primary form-button-sm'>
                Agregar este Combo
              </Button>
            </div>

            <div class='col' >
              <select onChange={handleChangeDepend} class='form-select form-select-sm' key='coddepg' id='coddepg' name='coddepg' value={dependglobal} > {opciones_depend}
              </select>
            </div>

            <div class='col' >
              <Button variant='primary' onClick={aplicarDepend} class='btn btn-primary form-button-sm'>
                Establecer Dependencia a toda la orden
              </Button>
            </div>
          </div>

          {/* ---------------fin panel -----------------------------------*/}
          <br></br>
          {/* <div > 
           <input className='form-control inputBuscar' value={busqueda} placeholder='Busqueda por  cdgexamen' onChange={handleChangeFinder} /> </div> */}
          <div style={{ overflowY: 'scroll', height: '350px' }}>
            <Table striped bordered hover>
              <thead> <tr class="table-dark">

                <th>Examen</th>
                <th>Nombre</th>
                <th>Valor</th>
                <th>Desc1</th>
                <th>Desc2</th>
                <th>Desc3</th>
                <th>Particular</th>
                <th>Cortesia</th>
                <th>Pendiente</th>
                <th>Combo</th>
                <th>SubtEmpresa</th>
                <th>SubtPaciente</th>
                <th>Seq</th>
                <th>CuotaM</th>
                <th>FechaPend</th>
                <th>Remitida</th>
                <th>Ordenamiento</th>
                <th>Acciones</th>
              </tr></thead>

              <tbody>
                {labordendet.map((ordendet) => (
                  <tr>
                    <td>{ordendet.cdgexamen} </td>
                    <td>{ordendet.nombre} </td>
                    <td>{ordendet.valor} </td>
                    <td>{ordendet.desc1} </td>
                    <td>{ordendet.desc2} </td>
                    <td>{ordendet.desc3} </td>
                    <td>{ordendet.partic} </td>
                    <td>{ordendet.corte} </td>
                    <td>{ordendet.pend} </td>
                    <td>{ordendet.codcombo} </td>
                    <td>{ordendet.subtemp} </td>
                    <td>{ordendet.subtpac} </td>
                    <td>{ordendet.seq} </td>
                    <td>{ordendet.cuotam} </td>
                    <td>{ordendet.fechapend} </td>
                    <td>{ordendet.remi} </td>
                    <td>{ordendet.ordenam} </td>

                    <td><Button
                      onClick={() => {
                        setSelectedLabordendet(ordendet)
                        setShowModal(true)
                      }}
                      className='mx-1'
                    > Editar </Button>
                      <Button
                        onClick={() => { setMiordenl(labordendet.codage + '-' + labordendet.numorden); eliminarLabordendet(ordendet.id, ordendet.codcombo); }}
                        className='btn btn-danger' >
                        Eliminar
                      </Button>

                    </td>
                  </tr>
                ))}

              </tbody>

            </Table>
          </div>
          <div>
            <table striped bordered hover>
              <thead>
                <tr >
                  <th> Total Empresa</th>
                  <th> Total Paciente</th>
                  <th> Total Bono</th>
                  <th> Total Copago</th>
                  <th> Total Cuota Mod.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedLaborden.totemp}</td>
                  <td>{selectedLaborden.totpac}</td>
                  <td>{selectedLaborden.bono}</td>
                  <td>{selectedLaborden.copago}</td>
                  <td>{selectedLaborden.cuotam}</td>
                </tr>
              </tbody>

            </table>
          </div>


          <Modal show={showModal} onHide={() => setShowModal(false)} size='xl' >
            <Modal.Header closeButton>
              <Modal.Title>Editar Registro</Modal.Title>
            </Modal.Header>
            {alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible>
              {alert}
            </Alert>)}
            <Modal.Body>
              <div class='container' >
                <div class='col' > {/* 2  */}
                  <label for='lbl'>Agencia</label>
                  <input
                    disabled
                    type='text' class='form-control'
                    name='codage'
                    value={selectedLabordendet.codage}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 3  */}
                  <label for='lbl'>Orden</label>
                  <input
                    disabled
                    type='text' class='form-control'
                    name='numorden'
                    value={selectedLabordendet.numorden}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}

{/*
                 <div class='col' > 
                  <label for='lbl'>Examen</label>
                  <input
                    type='text' class='form-control'
                    name='cdgexamen'
                    value={selectedLabordendet.cdgexamen}
                    onChange={handleChange}
                  />
                </div>  
                    */}

                <div class='col' > 
                  <label>Examen</label>
                  <input name='cdgexamen' type="text" value={selectedLabordendet.cdgexamen} onChange={handleChange} />
                  <button onClick={handleBuscarlovlClickExa}>Buscar</button>
                  <span> </span>
                  <button onClick={limpiar}>Limpiar</button>

                  {(!ocultaresExamenes) && resultadosExamenes.length > 0 &&
                    < div name='marcores_examenes' style={{ overflowY: 'scroll', height: '350px' }}>
                      <ul>
                        {resultadosExamenes.map((resultado) => (
                          <li onDoubleClick={() => { setMiExamen(resultado.id); selectedLabordendet.cdgexamen = resultado.id; limpiar(); }} key={resultado.id}>{resultado.id}-{resultado.name} </li>
                        ))}
                      </ul>
                    </div>}
                </div> 


              </div> {/* fin row */}
              <div class='row'>
                <div class='col' > {/* 1  */}
                  <label for='lbl'>Valor</label>
                  <input
                    disabled
                    type='text' class='form-control'
                    name='valor'
                    value={selectedLabordendet.valor}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 2  */}
                  <label for='lbl'>Desc1</label>
                  <input
                    type='text' class='form-control'
                    name='desc1'
                    value={selectedLabordendet.desc1}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 3  */}
                  <label for='lbl'>Desc2</label>
                  <input
                    type='text' class='form-control'
                    name='desc2'
                    value={selectedLabordendet.desc2}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 4  */}
                  <label for='lbl'>Desc3</label>
                  <input
                    type='text' class='form-control'
                    name='desc3'
                    value={selectedLabordendet.desc3}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}
              </div> {/* fin row */}
              <div class='row'>
                <div class='col' > {/* 1  */}
                  <label for='lbl'>Particular</label>
                  <input type='checkbox' name='partic' checked={selectedLabordendet.partic == 'S' ? true : false}
                    onChange={handleChange} />
                </div> {/* fin campo */}
                <div class='col' > {/* 2  */}
                  <label for='lbl'>Cortesia</label>
                  <input type='checkbox' name='corte' checked={selectedLabordendet.corte == 'S' ? true : false}
                    onChange={handleChange} />
                </div> {/* fin campo */}
                <div class='col' > {/* 3  */}
                  <label for='lbl'>Pendiente</label>
                  <input type='checkbox' name='pend' checked={selectedLabordendet.pend == 'S' ? true : false}
                    onChange={handleChange} />
                </div> {/* fin campo */}
                <div class='col' > {/* 4  */}
                  <label for='lbl'>Combo</label>
                  <input
                    type='text' class='form-control'
                    name='codcombo'
                    value={selectedLabordendet.codcombo}
                    onChange={handleChange}
                    disabled
                  />
                </div> {/* fin campo */}
              </div> {/* fin row */}
              <div class='row'>
                <div class='col' > {/* 1  */}
                  <label for='lbl'>SubtEmpresa</label>
                  <input
                    type='text' class='form-control'
                    name='subtemp'
                    value={selectedLabordendet.subtemp}
                    onChange={handleChange}
                    disabled
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 2  */}
                  <label for='lbl'>SubtPaciente</label>
                  <input
                    type='text' class='form-control'
                    name='subtpac'
                    value={selectedLabordendet.subtpac}
                    onChange={handleChange}
                    disabled
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 3  */}
                  <label for='lbl'>Seq</label>
                  <input
                    type='text' class='form-control'
                    name='seq'
                    value={selectedLabordendet.seq}
                    onChange={handleChange}
                    disabled
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 4  */}
                  <label for='lbl'>CuotaM</label>
                  <input
                    type='text' class='form-control'
                    name='cuotam'
                    value={selectedLabordendet.cuotam}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}
              </div> {/* fin row */}
              <div class='row'>
                <div class='col' > {/* 1  */}
                  <label for='lbl'>FechaPend</label>
                  <input
                    type='text' class='form-control'
                    name='fechapend'
                    value={selectedLabordendet.fechapend}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}
                <div class='col' > {/* 3  */}
                  <label for='lbl'>Remitida</label>
                  <input type='checkbox' name='remi' checked={selectedLabordendet.remi == 'S' ? true : false}
                    onChange={handleChange} />
                </div> {/* fin campo */}

                <div class='col' > {/* 3  */}
                  <label for='lbl'>Ordenamiento</label>
                  <input
                    type='text' class='form-control'
                    name='ordenam'
                    value={selectedLabordendet.ordenam}
                    onChange={handleChange}
                  />
                </div> {/* fin campo */}

                <div class='col' > {/* 3  */}
                  <label for='lbl'>Dependencia</label>
                  <select onChange={handleChange} class='col form-select form-select-sm' key='coddep' id='coddep' name='coddep' value={selectedLabordendet.coddep} > {opciones_depend}
                  </select>
                </div> {/* fin campo */}

                <div class='row'>
                  <div class='col'>
                    <label for='lbl'>Condiciones: </label>
                    {selectedLabordendet.condiciones}
                  </div>
                  <div class='col'>
                    <label for='lbl'>Duracion: </label>
                    {selectedLabordendet.duracion}
                  </div>
                  <div class='col'>
                    <label for='lbl'>CUP: </label>
                    {selectedLabordendet.cut}
                  </div>
                  <div class='col'>
                    <label for='lbl'>Empresa: </label>
                    {miempresa}
                  </div>
                </div>


              </div> {/* fin container mod */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
              <Button variant='primary' onClick={actualizarLabordendet}>
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showNewModal} onHide={() => setShowNewModal(false)} size='xl'>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Orden Lab</Modal.Title>
            </Modal.Header>
            {alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible>
              {alert}
            </Alert>)}
            <Modal.Body>
              <div class='container'>
                <div class='rwo'>
                  <div class='col' > {/* 2  */}
                    <label for='lbl'>Agencia</label>
                    <input
                      type='text' class='form-control'
                      name='codage'
                      value={newLabordendet.codage}
                      onChange={handleNewChange}
                    />
                  </div> {/* fin campo */}
                  <div class='col' > {/* 3  */}
                    <label for='lbl'>Orden</label>
                    <input
                      type='text' class='form-control'
                      name='numorden'
                      value={newLabordendet.numorden}
                      onChange={handleNewChange}
                    />
                  </div> {/* fin campo */}
                  <div class='col' > {/* 4  */}
                    <label for='lbl'>Examen</label>
                    <input
                      type='text' class='form-control'
                      name='cdgexamen'
                      value={newLabordendet.cdgexamen}
                      onChange={handleNewChange}
                    />
                  </div> {/* fin campo */}
                </div> {/* fin row */}
                <div class='row'>
                  <div class='col' > {/* 1  */}
                    <label for='lbl'>Valor</label>
                    <input
                      disabled
                      type='text' class='form-control'
                      name='valor'
                      value={newLabordendet.valor}
                      onChange={handleNewChange}
                    />
                  </div> {/* fin campo */}
                  <div class='col' > {/* 2  */}
                    <label for='lbl'>Desc1</label>
                    <input
                      type='text' class='form-control'
                      name='desc1'
                      value={newLabordendet.desc1}
                      onChange={handleNewChange}
                    />
                  </div> {/* fin campo */}
                  <div class='col' > {/* 3  */}
                    <label for='lbl'>Desc2</label>
                    <input
                      type='text' class='form-control'
                      name='desc2'
                      value={newLabordendet.desc2}
                      onChange={handleNewChange}
                    />
                  </div> {/* fin campo */}
                  <div class='col' > {/* 4  */}
                    <label for='lbl'>Desc3</label>
                    <input
                      type='text' class='form-control'
                      name='desc3'
                      value={newLabordendet.desc3}
                      onChange={handleNewChange}
                    />
                  </div> {/* fin campo */}
                </div> {/* fin row */}
                <div class='row'>
                  <div class='col' > {/* 1  */}
                    <label for='lbl'>Particular</label>
                    <input type='checkbox' name='partic' checked={newLabordendet.partic == 'S' ? true : false}
                      onChange={handleNewChange} />
                  </div> {/* fin campo */}
                  <div class='col' > {/* 2  */}
                    <label for='lbl'>Cortesia</label>
                    <input type='checkbox' name='corte' checked={newLabordendet.corte == 'S' ? true : false}
                      onChange={handleNewChange} />
                  </div> {/* fin campo */}
                  <div class='col' > {/* 3  */}
                    <label for='lbl'>Pendiente</label>
                    <input type='checkbox' name='pend' checked={newLabordendet.pend == 'S' ? true : false}
                      onChange={handleNewChange} />
                  </div> {/* fin campo */}
                </div> {/* fin row */}

              </div> {/* fin container ins */}
            </Modal.Body >
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShowNewModal(false)}>
                Cerrar
              </Button>
              <Button variant='primary' onClick={insertarLabordendet}>
                Agregar Labordendet
              </Button>
            </Modal.Footer>
          </Modal >


          {/** ------------------------------- modif OL -----------------------------*/}



          <Modal show={showModalOl} onHide={() => setShowModalOl(false)} size='xl' >
            <Modal.Header closeButton>
              <Modal.Title>Editar Orden Lab</Modal.Title>
            </Modal.Header>
            {alert && (<Alert variant='success' onClose={() => setAlert('')} dismissible>
              {alert}
            </Alert>)}
            <Modal.Body>

              <div className="tab-buttons btn">
                <button
                  class={activeTab === 0 ? 'active' : ''}
                  onClick={() => { handleTabClick(0); setMititulomodal('Informacion de La Orden'); }}
                >
                  Datos de la Orden
                </button>
                <span> </span>
                <button
                  class={activeTab === 1 ? 'active' : ''}
                  onClick={() => { handleTabClick(1); setMititulomodal('Informacion del Paciente'); }}
                >
                  Datos del Paciente
                </button>
              </div>

              <h3> {titulomodal} </h3>

              <div className="tab-content">
                {activeTab === 0 && (
                  <>
                    <div class='container' >
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Agencia</label>
                          <select disabled onChange={handleChangeOl} class='col form-select form-select-sm' id='codage' name='codage' value={selectedLaborden.codage} > {opciones_codage}
                          </select>   </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>Orden</label>
                          <input
                            type='text' class='form-control'
                            name='numorden'
                            value={selectedLaborden.numorden}
                            onChange={handleChangeOl}
                            disabled
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>Fecha</label>
                          <input
                            type='text' class='form-control'
                            name='fecorden'
                            value={selectedLaborden.fecorden}
                            onChange={handleChangeOl}
                            disabled
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Estado</label>
                          <select onChange={handleChangeOl} class='col form-select form-select-sm' id='estado' name='estado' value={selectedLaborden.estado} > {opciones_estado}
                          </select>   </div> {/* fin campo */}
                      </div> {/* fin row */}

                      <div class='row'>
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>AgeFac</label>
                          <select disabled onChange={handleChangeOl} class='col form-select form-select-sm' id='agefaccli' name='agefaccli' value={selectedLaborden.agefaccli} > {opciones_agefaccli}
                          </select>
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>NumFac</label>
                          <input
                            type='text' class='form-control'
                            name='numfaccli'
                            value={selectedLaborden.numfaccli}
                            onChange={handleChangeOl}
                            disabled
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>TipoIdent</label>
                          <select disabled onChange={handleChangeOl} class='col form-select form-select-sm' id='tipide' name='tipide' value={selectedLaborden.tipide} > {opciones_tipide}
                          </select>   </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>NumIdent</label>
                          <input
                            disabled type='text' class='form-control'
                            name='codpac'
                            value={selectedLaborden.codpac}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Empresa</label>
                          <select onChange={handleChangeOl} class='col form-select form-select-sm' id='codemp' name='codemp' value={selectedLaborden.codemp} > {opciones_codemp}
                          </select>   </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>Contrato</label>
                          <input
                            type='text' class='form-control'
                            name='contpac'
                            value={selectedLaborden.contpac}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Remitido</label>
                          <input type='checkbox' name='interlab' checked={selectedLaborden.interlab == 'S' ? true : false}
                            onChange={handleChangeOl} />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Prioridad</label>
                          <input
                            type='text' class='form-control'
                            name='prio'
                            value={selectedLaborden.prio}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>Medico</label>
                          {/*<input
                                                type='text' class='form-control'
                                                name='codmedico'
                                                value={selectedLaborden.codmedico}
                                                onChange={handleChangeOl}
                                            /> */}
                          <div>

                            <input name='codmedico' type="text" value={miMedico} onChange={handleMedicoChange} />
                            <button onClick={handleBuscarlovlClickMedi}>Buscar</button>
                            <button onClick={limpiar}>Limpiar</button> {miMedicoDesc}

                            {(!ocultaresMedico) && resultadosMedico.length > 0 &&
                              < div name='marcores_medicos' style={{ overflowY: 'scroll', height: '250px' }}>
                                <ul>
                                  {resultadosMedico.map((resultado) => (
                                    <li onDoubleClick={() => { setMimedico(resultado.id); selectedLaborden.codmedico = resultado.id; setMiMedicoDesc(resultado.name); limpiar(); }} key={resultado.id}>{resultado.id}-{resultado.name} </li>
                                  ))}
                                </ul>
                              </div>}
                          </div>
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Nivel</label>
                          <input
                            type='text' class='form-control'
                            name='nivpac'
                            value={selectedLaborden.nivpac}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Copago</label>
                          <input
                            type='text' class='form-control'
                            name='copago'
                            value={selectedLaborden.copago}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>CuotaM</label>
                          <input disabled
                            type='text' class='form-control'
                            name='cuotam'
                            value={selectedLaborden.cuotam}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Bono</label>
                          <input
                            type='text' class='form-control'
                            name='bono'
                            value={selectedLaborden.bono}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>DesPac</label>
                          <input disabled
                            type='text' class='form-control'
                            name='descpac'
                            value={selectedLaborden.descpac}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>AbonoPac</label>
                          <input disabled
                            type='text' class='form-control'
                            name='abopac'
                            value={selectedLaborden.abopac}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Diagnostico</label>
                          <input
                            type='text' class='form-control'
                            name='coddiagnostico'
                            value={selectedLaborden.coddiagnostico}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>TotalEmp</label>
                          <input
                            disabled
                            type='text' class='form-control'
                            name='totemp'
                            value={selectedLaborden.totemp}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>TotalPac</label>
                          <input
                            disabled
                            type='text' class='form-control'
                            name='totpac'
                            value={selectedLaborden.totpac}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Usuario</label>
                          <input
                            disabled
                            type='text' class='form-control'
                            name='usuario'
                            value={selectedLaborden.usuario}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Duracion</label>
                          <input
                            type='text' class='form-control'
                            name='dur'
                            value={selectedLaborden.dur}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>DesctoPac</label>
                          <input
                            disabled
                            type='text' class='form-control'
                            name='descpacp'
                            value={selectedLaborden.descpacp}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>NumFact</label>
                          <input
                            type='text' class='form-control'
                            name='factura'
                            value={selectedLaborden.factura}
                            onChange={handleChangeOl}
                            disabled
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Edad</label>
                          <input
                            disabled
                            type='text' class='form-control'
                            name='edadf'
                            value={selectedLaborden.edadf}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>Facturar</label>
                          <input type='checkbox' name='facturar' checked={selectedLaborden.facturar == 'S' ? true : false}
                            onChange={handleChangeOl} />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>PendAprob</label>
                          <input type='checkbox' name='pendaprob' checked={selectedLaborden.pendaprob == 'S' ? true : false}
                            onChange={handleChangeOl} />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Embarazo</label>
                          <input type='checkbox' name='embar' checked={selectedLaborden.embar == 'S' ? true : false}
                            onChange={handleChangeOl} />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>FechaSolIc</label>
                          <input
                            type='date' class='form-control'
                            name='fechasol'
                            value={selectedLaborden.fechasol}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>VoBueno</label>
                          <input
                            type='text' class='form-control'
                            name='usuvbo'
                            value={selectedLaborden.usuvbo}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>HoraVoBno</label>
                          <input
                            disabled
                            type='text' class='form-control'
                            name='horvbo'
                            value={selectedLaborden.horvbo}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>IdBono</label>
                          <input
                            type='text' class='form-control'
                            name='idbono'
                            value={selectedLaborden.idbono}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Mipres</label>
                          <input
                            type='text' class='form-control'
                            name='mipres'
                            value={selectedLaborden.mipres}
                            onChange={handleChangeOl}
                            disabled={mipresOn}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Poliza</label>
                          <input
                            type='text' class='form-control'
                            name='poliza'
                            value={selectedLaborden.poliza}
                            onChange={handleChangeOl}
                            disabled={polizaOn}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>Autorizacion</label>
                          <input
                            type='text' class='form-control'
                            name='contrato'
                            value={selectedLaborden.contrato}
                            onChange={handleChangeOl}
                            disabled={numautoOn}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 3  */}
                          <label for='lbl'>Fecha Entrega</label>
                          <input
                            type='date' class='form-control'
                            name='fecent'
                            value={selectedLaborden.fecent}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                      </div> {/* fin row */}
                      <div class='row'>
                        <div class='col' > {/* 1  */}
                          <label for='lbl'>Hora Entrega</label>
                          <input
                            type='text' class='form-control'
                            name='horent'
                            value={selectedLaborden.horent}
                            onChange={handleChangeOl}
                          />
                        </div> {/* fin campo */}
                        <div class='col' > {/* 2  */}
                          <label for='lbl'>Consultar Web</label>
                          <input type='checkbox' name='web' checked={selectedLaborden.web == 'S' ? true : false}
                            onChange={handleChangeOl} />
                        </div> {/* fin campo */}
                      </div>
                    </div> {/* fin container mod */}
                  </>
                )
                }
                {activeTab === 1 && (
                  <>
                    <div class="container">
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">Tipo Ide</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="tipide"
                            name="tipide"
                            value={selectedPacientes.tipide}
                            disabled
                          >
                            {" "}
                            {opciones_tipide}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">Ident</label>
                          <input
                            type="text"
                            class="form-control"
                            name="codpac"
                            value={selectedPacientes.codpac}
                            onChange={handleChangepac}
                            disabled
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">1erNombre</label>
                          <input
                            type="text"
                            class="form-control"
                            name="nompac"
                            value={selectedPacientes.nompac}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">2oNombre</label>
                          <input
                            type="text"
                            class="form-control"
                            name="nompac2"
                            value={selectedPacientes.nompac2}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">1erApellido</label>
                          <input
                            type="text"
                            class="form-control"
                            name="apepac"
                            value={selectedPacientes.apepac}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">2oApellido</label>
                          <input
                            type="text"
                            class="form-control"
                            name="apepac2"
                            value={selectedPacientes.apepac2}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">Sexo</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="sexo"
                            name="sexo"
                            value={selectedPacientes.sexo}
                          >
                            {" "}
                            {opciones_sexo}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">Vinculacion</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="vincpac"
                            name="vincpac"
                            value={selectedPacientes.vincpac}
                          >
                            {" "}
                            {opciones_vincpac}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">FechaNac</label>
                          <input
                            type="date"
                            class="form-control"
                            name="fecnac"
                            value={selectedPacientes.fecnac}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">Ocupacion</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="codocu"
                            name="codocu"
                            value={selectedPacientes.codocu}
                          >
                            {" "}
                            {opciones_codocu}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">Departamento</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="deppac"
                            name="deppac"
                            value={selectedPacientes.deppac}
                          >
                            {" "}
                            {opciones_deppac}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">Ciudad</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="ciupac"
                            name="ciupac"
                            value={selectedPacientes.ciupac}
                          >
                            {" "}
                            {opciones_ciupac}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">GrupoSanguineo</label>
                          <input
                            type="text"
                            class="form-control"
                            name="gruposang"
                            value={selectedPacientes.gruposang}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">Empresa</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="codemp"
                            name="codemp"
                            value={selectedPacientes.codemp}
                          >
                            {" "}
                            {opciones_codemp}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">Diagnostico</label>
                          {/* <input
                       type="text"
                       class="form-control"
                       name="coddiagnostico"
                       value={selectedPacientes.coddiagnostico}
                       onChange={handleChange}
                      /> */}
                          <input name='coddiagnostico' type="text" value={finderDiag} onDoubleClick={handleDclickDiag} onChange={handleChangeFinderDiag} /> {finderDescDiag}
                          {showFinderDiag && <div>
                            <FinderDiagnostico patron={finderDiag} retornar={setFinderDiag} descripcion={setFinderDescDiag} mostrar={setShowFinderDiag} />
                          </div>
                          }
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">Contrato</label>
                          <input
                            type="text"
                            class="form-control"
                            name="contpac"
                            value={selectedPacientes.contpac}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">PlanBenef</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="planben"
                            name="planben"
                            value={selectedPacientes.planben}
                          >
                            {" "}
                            {opciones_planben}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">Unegocio</label>
                          <select
                            onChange={handleChangepac}
                            class="col form-select form-select-sm"
                            id="codundnegocio"
                            name="codundnegocio"
                            value={selectedPacientes.codundnegocio}
                          >
                            {" "}
                            {opciones_codundnegocio}
                          </select>{" "}
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">Nivel</label>
                          <input
                            type="text"
                            class="form-control"
                            name="nivpac"
                            value={selectedPacientes.nivpac}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">Antecedentes</label>
                          <input
                            type="text"
                            class="form-control"
                            name="obs"
                            value={selectedPacientes.obs}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">Dir</label>
                          <input
                            type="text"
                            class="form-control"
                            name="dir"
                            value={selectedPacientes.dir}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">Tel</label>
                          <input
                            type="text"
                            class="form-control"
                            name="tel"
                            value={selectedPacientes.tel}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">Remite</label>
                          <input
                            type="text"
                            class="form-control"
                            name="remite"
                            value={selectedPacientes.remite}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">IdentAcomp</label>
                          <input
                            type="text"
                            class="form-control"
                            name="cedaco"
                            value={selectedPacientes.cedaco}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">NombreAcomp</label>
                          <input
                            type="text"
                            class="form-control"
                            name="nomaco"
                            value={selectedPacientes.nomaco}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">ApellidoAcomp</label>
                          <input
                            type="text"
                            class="form-control"
                            name="apeaco"
                            value={selectedPacientes.apeaco}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">TelAcomp</label>
                          <input
                            type="text"
                            class="form-control"
                            name="telaco"
                            value={selectedPacientes.telaco}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 3  */}
                          <label for="lbl">DirAcomp</label>
                          <input
                            type="text"
                            class="form-control"
                            name="diraco"
                            value={selectedPacientes.diraco}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row */}
                      <div class="row">
                        <div class="col">
                          {" "}
                          {/* 1  */}
                          <label for="lbl">Celular</label>
                          <input
                            type="text"
                            class="form-control"
                            name="celular"
                            value={selectedPacientes.celular}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                        <div class="col">
                          {" "}
                          {/* 2  */}
                          <label for="lbl">Familiar</label>
                          <input
                            type="checkbox"
                            name="acofam"
                            checked={selectedPacientes.acofam == "S" ? true : false}
                            onChange={handleChangepac}
                          />
                        </div>{" "}
                        {/* fin campo */}
                      </div>{" "}
                      {/* fin row ultimo */}
                    </div>{" "}
                    {/* fin container mod */}
                  </>
                )}

              </div>


            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShowModalOl(false)}>
                Cerrar
              </Button>
              <Button variant='primary' onClick={() => { actualizarPacientes(); actualizarLaborden(); }}>
                Guardar cambios
              </Button>
            </Modal.Footer>



          </Modal>





          {/* ------------------------- modal de mensajes ----------------------------------  */}

          <Modal isOpen={modalMensaje}>
            <div>
              {mensaje}

            </div>
            <button className="btn btn-secundary" onClick={() => setModalMensaje(false)}>Cerrar</button>

          </Modal>


        </>
      )};

      {etapa == 'RCAJA' && (
        <>
          <Labordenpago miage={props.miage} miord={props.miord} regresar={setEtapa} />
        </>
      )};
      {etapa == 'IMPRIMIR' && (
        <>
          <RepOrden miage={props.miage} miord={props.miord} regresar={setEtapa} /> 
        </>
      )};
       </> 
    ): ( <Navigate to="/login" /> )  }
    </>

  );
};
export default Labordendet;