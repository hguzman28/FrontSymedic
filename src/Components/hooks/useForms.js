import { useState } from "react";
import {  toast } from 'react-toastify';
import { FixedSizeList } from 'react-window';
import { useOptions } from "./useOptions";
import { useOptionsSucursal } from "./useOptionsSucursal";


export const useForms = ( initialForm={}) => {

    const [formState, setForm] = useState( initialForm.initialForm );
    
    const [ResponseService, setResponseService] = useState(null);
    const [notification, setnotification] = useState(null);

    // const { OpcionesSucursal } = useOptions2("AGENCIAS");
    // const { options: OpcionesSucursal } = useOptions("Opsucursal","codemp","nombre");

        // START Opcioneslaempresa
        const [selectOpcionesOrder, setOpcionesOrder] = useState({value:0,label:''});
        const { options: OpcionesOrder } = useOptions("Opcioneslaempresa","codemp","nombre");
        const handleChangeOpcionesOrder = (selectOpcionesOrder) => {
          setOpcionesOrder(selectOpcionesOrder);
          console.log(selectOpcionesOrder.value);
        };
        // END Opcioneslaempresa
    
      // START GET_OCUPACION
      const [selectOpcionesOcupacion, setOpcionesOcupacion] = useState({value:0,label:''});
      const { options: OpcionesOcupacion } = useOptions("GET_OCUPACION","codocu","nomocu");
      const handleChangeOpcionesOcupacion = (selectOpcionesOcupacion) => {
        setOpcionesOcupacion(selectOpcionesOcupacion);
        console.log(selectOpcionesOcupacion.value);
      };
      // END GET_OCUPACION

    // START GET_origen
    const [selectOpcionesorigen, setOpcionesorigen] = useState({value:0,label:''});
    const { options: Opcionesorigen } = useOptions("GET_origen","origen","origen");
    const handleChangeOpcionesorigen = (selectOpcionesorigen) => {
      setOpcionesorigen(selectOpcionesorigen);
      console.log(selectOpcionesorigen.value);
    };
    // END GET_origen

    // START GET_medico
    const [selectOpcionesmedico, setOpcionesmedico] = useState({value:0,label:''});
    const { options: Opcionesmedico } = useOptions("GET_medico","codmedico","nommedico");
    const handleChangeOpcionesmedico = (selectOpcionesmedico) => {
      setOpcionesmedico(selectOpcionesmedico);
      console.log(selectOpcionesmedico.value);
    };
    // END GET_origen

    // START GET_vinculacion
    const [selectOpcionesvinculacion, setOpcionesvinculacion] = useState({value:0,label:''});
    const { options: Opcionesvinculacion } = useOptions("GET_VINCULACION","vincpac","nomvic");
    const handleChangeOpcionesvinculacion = (selectOpcionesvinculacion) => {
      setOpcionesvinculacion(selectOpcionesvinculacion);
      console.log(selectOpcionesvinculacion.value);
    };
    // END GET_vinculacion

    // START GET_diagnostico
    const [selectOpcionesdiagnostico, setOpcionesdiagnostico] = useState({value:0,label:''});
    const { options: Opcionesdiagnostico } = useOptions("GET_diagnostico","coddiagnostico","nomdiagnostico");
    const handleChangeOpcionesdiagnostico = (selectOpcionesdiagnostico) => {
      setOpcionesdiagnostico(selectOpcionesdiagnostico);
      console.log(selectOpcionesdiagnostico.value);
    };
    // END GET_diagnostico

    // START GET_UNDNEGOCIO
    const [selectOpcionesUNDNEGOCIO, setOpcionesUNDNEGOCIO] = useState({value:0,label:''});
    const { options: OpcionesUNDNEGOCIO } = useOptions("GET_UNDNEGOCIO","codundnegocio","nomundnegocio");
    const handleChangeOpcionesUNDNEGOCIO = (selectOpcionesUNDNEGOCIO) => {
      setOpcionesUNDNEGOCIO(selectOpcionesUNDNEGOCIO);
      console.log(selectOpcionesUNDNEGOCIO.value);
    };
    // END GET_UNDNEGOCIO


    // START Sucursal
    const [selectOpcionesSucursal, setOpcionesSucursal] = useState({value:0,label:null,tipo:null});
    const { options: OpcionesSucursal } = useOptionsSucursal("AGENCIAS","codage","nomage");
    const handleChangeOpcionesSucursal = (selectOpcionesSucursal) => {
      setOpcionesSucursal(selectOpcionesSucursal);
      console.log(selectOpcionesSucursal);
    };
    // END Sucursal
    


    
    const [selectedTipo, setSelectedTipo] = useState("");

    const handleChangeTipo = (event) => {
      setSelectedTipo(event.target.value);
    };


  
    const onChangeForm = (event) => {
  
          const newValue=event.target.value
          const name= event.target.name

  
          setForm({
            ...formState,
            [name]  :newValue
          })
    }

    const onDateChange = date => {
      console.log( date);
      console.log(date)
      setForm(prevState => ({
        ...prevState,
        fecha: date
      }));
    };

    const onResetForm = () => {

        setForm(initialForm);


    }

    const onSendForm = async (event) => {

      event.preventDefault();

      try {
        const res = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/${initialForm.metodos.insert}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...formState}),
        });
        const json = await res.json();
        setResponseService(json);
        setnotification("Registro exitoso");
        toast.success("Registro exitoso")
        onResetForm()
      } catch (error) {
        console.error(error);
        setnotification("Ha ocurrido un error en el registro");
        toast.error("Ha ocurrido un error en el registro")
      }

    }



  
    const MenuList = (props) => {
      const { options, children, maxHeight, getValue } = props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * 35;
      const height = options.length * 35;
      return (
        <FixedSizeList
          height={maxHeight}
          itemCount={children.length}
          itemSize={35}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </FixedSizeList>
      );
    };
  
    
    const optionsVirtualize = { 
      OpcionesSucursal: OpcionesSucursal, OpcionesOrder:OpcionesOrder, OpcionesOcupacion: OpcionesOcupacion, Opcionesorigen: Opcionesorigen,Opcionesmedico:Opcionesmedico, Opcionesvinculacion:Opcionesvinculacion,Opcionesdiagnostico:Opcionesdiagnostico,OpcionesUNDNEGOCIO:OpcionesUNDNEGOCIO,
      
      
      // OpcionesCodempresa: OpcionesCodempresa,
      // OpcionesLaorigen: OpcionesLaorigen,
      // OpcionesMedico: OpcionesMedico,

      MenuList:MenuList, 
      handleChangeOpcionesOrder:handleChangeOpcionesOrder, handleChangeOpcionesSucursal: handleChangeOpcionesSucursal, handleChangeOpcionesOcupacion: handleChangeOpcionesOcupacion,handleChangeOpcionesorigen:handleChangeOpcionesorigen,handleChangeOpcionesmedico:handleChangeOpcionesmedico,handleChangeOpcionesvinculacion:handleChangeOpcionesvinculacion,handleChangeOpcionesdiagnostico:handleChangeOpcionesdiagnostico,handleChangeOpcionesUNDNEGOCIO:handleChangeOpcionesUNDNEGOCIO,
      selectOpcionesOrder,selectOpcionesSucursal, selectOpcionesOcupacion, selectOpcionesorigen,selectOpcionesmedico,selectOpcionesvinculacion,selectOpcionesdiagnostico,selectOpcionesUNDNEGOCIO}

  return {
    formState,
    onChangeForm,
    onDateChange,
    onResetForm,
    onSendForm,
    ResponseService,
    notification,
    optionsVirtualize,
    handleChangeTipo,
    selectedTipo
  }
}
