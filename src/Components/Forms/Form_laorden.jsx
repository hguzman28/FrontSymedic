// Import statements
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import { useForms } from "../hooks/useForms";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { Form, Button,Tab,Tabs } from 'react-bootstrap';
import { useState } from 'react';
import Liquidacion from './Liquidacion';




// Functional component definition
const Form_laorden = ({ initialForm }) => {
  // Destructuring from useForms hook
  const {formState, onChangeForm, onDateChange, onSendForm, optionsVirtualize,selectedTipo,handleChangeTipo} = useForms(initialForm);
  const {
    sucursal,
    numero_orden,
    fac,
    estado,
    fecha,
    identificacion,
    nombre,
    apellidos,
    codempresa,
    mipres,
    poliza,
    autoriz,
    motivo,
    origen,
    prioridad,
    entrega,
    web,
    fecha_solicitud,
    medico,
    nivel_pac,
    embarazo,
    cotizacion,
    pendiente_aprob
  } = formState;

  // Destructuring from optionsVirtualize object
  const {OpcionesSucursal,OpcionesOrder,MenuList, handleChangeOpcionesOrder,handleChangeOpcionesSucursal,selectOpcionesSucursal, selectOpcionesOrder, OpcionesOcupacion, handleChangeOpcionesOcupacion, selectOpcionesOcupacion, Opcionesorigen, handleChangeOpcionesorigen, selectOpcionesorigen, Opcionesmedico, handleChangeOpcionesmedico, selectOpcionesmedico,Opcionesvinculacion,handleChangeOpcionesvinculacion,selectOpcionesvinculacion,handleChangeOpcionesdiagnostico,Opcionesdiagnostico,selectOpcionesdiagnostico} = optionsVirtualize;

  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);


  const handleChangeIdentificacion = (event) => {
    setBusqueda(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/api/busqueda/paciente/${busqueda}/${selectedTipo}`);
      const json = await res.json();
      console.log(json);
      // setResultados({'nompac':'Henner','nompac2':'David','primer_apellido':'Guzman','segundo_apellido':'Davila'});
      
      if (!json || !json.data || json.data.length === 0) {
        toast.error("Pacienre no encontrado");
      } else {
        setResultados(json.data[0]);
      }
    }
  };
  
  const handleChangeResultado = (event) => {
    event.preventDefault();
    const newValue=event.target.value
    const name= event.target.name
    
    setResultados({
        ...resultados,
        [name]  :newValue
      });
  };



  return (
  <>
    <Form style={{ border: "0.5px solid #ccc", borderRadius: "5px", boxShadow: "1px 2px 5px #ccc", padding: "20px" }}>
    
      <div className="row g-1 align-items-center mb-1">
      
          <div className="col">
          <Form.Group controlId="sucursal">
            <Form.Label>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Sucursal
            </Form.Label>
            <VirtualizedSelect
              // classNamePrefix="react-select"
              options={OpcionesSucursal}
              value={selectOpcionesSucursal}
              onChange={handleChangeOpcionesSucursal}
              components={{ MenuList }}
              isSearchable={true}
              placeholder="Seleccione una sucursal 👇"
              className="form-control"
            />
          </Form.Group>
          </div>

          <div className="col  mb-1">
            <Form.Group controlId="numero_orden">
              <Form.Label>Número de Orden</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de orden"
                name="numero_orden"
                value={numero_orden}
                onChange={onChangeForm}
                disabled = { selectOpcionesSucursal.tipo !== 'M' }
              />
            </Form.Group>
          </div>
          <div className="col  mb-1">
            <Form.Group controlId="fac">
              <Form.Label>FAC</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el FAC"
                name="fac"
                value={fac}
                onChange={onChangeForm}
                disabled = { selectOpcionesSucursal.tipo !== 'M' }
                required 
              />
            </Form.Group>
          </div>
          <div className="col mb-1">
            <Form.Group controlId="estado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el estado"
                name="estado"
                value={estado}
                onChange={onChangeForm}
                disabled 
              />
            </Form.Group>
          </div>
      </div>
    
      <div className="row g-1 align-items-center mb-1">
        <div className="col">
          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <DatePicker
              selected={fecha}
              onChange={onDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccione una fecha"
              className="form-control"
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="identificacion">
            <Form.Label>Tipo de Identificación</Form.Label>
            <Form.Select value={selectedTipo} onChange={handleChangeTipo}>
              <option value="">Selecciona una opción...</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PA">Pasaporte</option>
              <option value="RC">Registro Civil</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="AS">Adulto sin Identificación</option>
              <option value="MS">Menos sin Identificación</option>
              <option value="NU">Número Único de Identificación</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="identificacion">
            <Form.Label>Número de Identificación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la identificación"
              name="identificacion"
              value={busqueda}
              onChange={handleChangeIdentificacion}
              onKeyDown={handleSubmit}
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              name="nombre"
              value={nombre}
              onChange={onChangeForm}
              disabled 
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="apellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese los apellidos"
              name="apellidos"
              value={apellidos}
              onChange={onChangeForm}
              disabled 
            />
          </Form.Group>
        </div>
      </div>

      <div className="row g-1 align-items-center mb-1">
      <div className="col">
        <Form.Group controlId="codempresa">
          <Form.Label>codemprea</Form.Label>
          <VirtualizedSelect
            options={OpcionesOrder}
            value={selectOpcionesOrder}  
            onChange={handleChangeOpcionesOrder}
            components={{ MenuList }}
            isSearchable={true}
            placeholder="Seleccione una codempresa 👇"
            className="form-control"
          />
        </Form.Group>
      </div>
      <div className="col">
        <Form.Group controlId="mipres">
          <Form.Label>mipres</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la mipres"
            name="mipres"
            value={mipres}
            onChange={onChangeForm}
            className="form-control"
            disabled={selectOpcionesOrder.value === '00'}
            
          />
        </Form.Group>
      </div>
      <div className="col">
        <Form.Group controlId="poliza">
          <Form.Label>poliza</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el poliza"
            name="poliza"
            value={poliza}
            onChange={onChangeForm}
            className="form-control"
            disabled={selectOpcionesOrder.value === '00'}
   
          />
        </Form.Group>
      </div>
      <div className="col">
        <Form.Group controlId="autoriz">
          <Form.Label>autoriz</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese los autoriz"
            name="autoriz"
            value={autoriz}
            onChange={onChangeForm}
            className="form-control"
            disabled={selectOpcionesOrder.value === '00'}
          />
        </Form.Group>
      </div>
      </div>


        <div className="row g-1 align-items-center mb-1">
        <div className="col mb-1">
          <Form.Group controlId="motivo">
            <Form.Label>motivo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el motivo"
              name="motivo"
              value={motivo}
              onChange={onChangeForm}
            />
          </Form.Group>
        </div>
        <div className="col mb-1">
          <Form.Group controlId="origen">
            <Form.Label>origen</Form.Label>
            <VirtualizedSelect
              options={Opcionesorigen}
              value={selectOpcionesorigen}
              onChange={handleChangeOpcionesorigen}
              components={{ MenuList }}
              isSearchable={true}
              placeholder="Seleccione una origen"
            />
          </Form.Group>
        </div>
        <div className="col mb-1">
          <Form.Group controlId="prioridad">
            <Form.Label>prioridad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la prioridad"
              name="prioridad"
              value={prioridad}
              onChange={onChangeForm}
            />
          </Form.Group>
        </div>
        <div className="col mb-1">
          <Form.Group controlId="entrega">
            <Form.Label>entrega</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la entrega"
              name="entrega"
              value={entrega}
              onChange={onChangeForm}
            />
          </Form.Group>
        </div>
      </div>

      <div className="row g-1 align-items-center mb-1">
        <div className="col">
          <Form.Group controlId="web">
            <Form.Label>Web</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la dirección de la web"
              name="web"
              value={web}
              onChange={onChangeForm}
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="medico">
            <Form.Label>Médico</Form.Label>
            <VirtualizedSelect
              options={Opcionesmedico}
              value={selectOpcionesmedico}
              onChange={handleChangeOpcionesmedico}
              components={{ MenuList }}
              isSearchable={true}
              placeholder="Seleccione un médico "
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="nivel_pac">
            <Form.Label>Nivel de Paciente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nivel del paciente"
              name="nivel_pac"
              value={nivel_pac}
              onChange={onChangeForm}
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="embarazo">
            <Form.Label>Embarazo</Form.Label>
            <VirtualizedSelect
              options={[{ value: "S", label: "Sí" }, { value: "N", label: "No" }]}
              value={selectOpcionesOrder}
              // onChange={handleChangeOpcionesOrder}
              components={{ MenuList }}
              isSearchable={true}
              placeholder="Seleccione una opción 👇"
            />
          </Form.Group>
        </div>

        <div className="col">
      <Form.Check
          type="checkbox"
          label="Cotización"
          checked={cotizacion}
          onChange={onChangeForm}
        />
      </div> 

      <div className="col">
      <Form.Check
          type="checkbox"
          label="Pendiente de Aprobación"
          checked={pendiente_aprob}
          onChange={onChangeForm}
        />
      </div> 
      
      </div>

      <div className="row g-3 align-items-center mb-1">
          <div className="col-3"> 
          <Button variant="primary" onClick={onSendForm}>
                Guardar
              </Button>

              <ToastContainer />
          </div>
      </div>

      <ToastContainer />
    </Form>

    <hr style={{ borderTop: "1px solid #ccc", width: "100%", margin: "1rem 0" }} />

    <Tabs
      defaultActiveKey="DatosPersonales"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="DatosPersonales" title="Datos Personales">

         <Form style={{ border: "0.5px solid #ccc", borderRadius: "5px", boxShadow: "1px 2px 5px #ccc", padding: "20px" }}>
           
         <Form.Group className="row d-flex">
          <Form.Label className="col">Pri Nombre</Form.Label>
          <Form.Control className="col" type="text" placeholder="Ingrese el primer nombre" value={resultados.nompac} name="pri_nombre" />
          <Form.Label className="col">Seg Nombre</Form.Label>
          <Form.Control className="col" type="text" placeholder="Ingrese el segundo nombre" value={resultados.nompac2} name="seg_nombre" />  
          <Form.Label className="col">Pri Apellido</Form.Label>
          <Form.Control className="col" type="text" placeholder="Ingrese el primer apellido" value={resultados.apepac} name="pri_apellido" />
          <Form.Label className="col">Seg Apellido</Form.Label>
          <Form.Control className="col" type="text" placeholder="Ingrese el segundo apellido" value={resultados.apepac2} name="seg_apellido" />
         </Form.Group>

         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Sexo</Form.Label>
        <Form.Control className="col" as="select" name="sexo" value={ resultados.sexo } onChange={handleChangeResultado}>
          <option value="">Seleccione</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </Form.Control>
        <Form.Label className="col">Vinculación</Form.Label>
        {/* <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="vinculacion" value={ resultados.vincpac } onChange={handleChangeResultado}/>
          */}
                  
        <VirtualizedSelect
          options={Opcionesvinculacion}
          value={selectOpcionesvinculacion}
          onChange={handleChangeOpcionesvinculacion}
          components={{ MenuList }}
          isSearchable={true}
          placeholder="Seleccione un vinculación "
          className="col"
        />
    

        <Form.Label className="col">Fecha de Nacimiento</Form.Label>
        <Form.Control className="col" type="date" name="fecha_nacimiento" value={ resultados.fecnac } onChange={handleChangeResultado} />
         </Form.Group>

         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Ingreso</Form.Label>
        <Form.Control className="col" type="date" name="ingreso" value={ resultados.fecing } onChange={handleChangeResultado} />

        {/* <Form.Label className="col">Ocupación</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="ocupacion" />
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="ocupacion" disabled/> */}

        <Form.Label className="col"> Ocupación </Form.Label>

        <VirtualizedSelect
              // classNamePrefix="react-select"
              options={OpcionesOcupacion}
              value={selectOpcionesOcupacion}
              onChange={handleChangeOpcionesOcupacion}
              components={{ MenuList }}
              isSearchable={true}
              placeholder="Seleccione una Ocupación"
              className="col"
            />




         </Form.Group>


         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Departamento</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Departamento"  value={ resultados.deppac } onChange={handleChangeResultado}/>
        <Form.Label className="col">Ciudad</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="ocupacion" value={ resultados.ciupac } onChange={handleChangeResultado}/>
        <Form.Label className="col">Grupo Sangineo</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Grupo Sangineo" value={ resultados.gruposang } onChange={handleChangeResultado}/>
       
         </Form.Group>

         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Empresa</Form.Label>

          <VirtualizedSelect
            options={OpcionesOrder}
            value={selectOpcionesOrder}  
            onChange={handleChangeOpcionesOrder}
            components={{ MenuList }}
            isSearchable={true}
            placeholder="Seleccione una codempresa 👇"
            className="col"
          />
    
        

        {/* <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Empresa" value={ resultados.codemp } onChange={handleChangeResultado} /> */}
        <Form.Label className="col">Diagnostico</Form.Label>
        {/* <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Diagnostico" value={ resultados.coddiagnostico } onChange={handleChangeResultado}/>  */}
        <VirtualizedSelect
            options={Opcionesdiagnostico}
            value={selectOpcionesdiagnostico}  
            onChange={handleChangeOpcionesdiagnostico}
            components={{ MenuList }}
            isSearchable={true}
            placeholder="Seleccione una diagnostico"
            className="col"
          />

         </Form.Group>

         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Contrato</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Contrato" value={ resultados.contpac } onChange={handleChangeResultado}/> 
        <Form.Label className="col">Plan</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Plan" value={ resultados.planben } onChange={handleChangeResultado} /> 
        <Form.Label className="col">Unidad de Negocio</Form.Label>
        {/* <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="UN" value={ resultados.codundnegocio } onChange={handleChangeResultado}/>  */}
        <VirtualizedSelect
            options={optionsVirtualize.OpcionesUNDNEGOCIO}
            value={optionsVirtualize.selectOpcionesUNDNEGOCIO}  
            onChange={optionsVirtualize.handleChangeOpcionesUNDNEGOCIO}
            components={{ MenuList }}
            isSearchable={true}
            placeholder="Seleccione una Unidad de Negocio"
            className="col"
          />
         </Form.Group>

         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Antecedentes</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="antecedentes" value={ resultados.obs } onChange={handleChangeResultado}/> 

         </Form.Group>



         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Dirección</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Contrato" value={ resultados.dir } onChange={handleChangeResultado}/> 
        <Form.Label className="col">CC (Acom)</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Plan"  /> 
        <Form.Label className="col">Nombre (Acomp)</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="UN" /> 
         </Form.Group>
         <hr/>
         <Form.Group className="row d-flex">
        <Form.Label className="col">Email</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Contrato" value={ resultados.dir } onChange={handleChangeResultado}/> 
        <Form.Label className="col">Apellidos</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="Plan"  /> 
        <Form.Label className="col">Tel</Form.Label>
        <Form.Control className="col" type="text" placeholder="Ingrese la vinculación" name="UN" /> 
         </Form.Group>


         </Form>

      </Tab>
      <Tab eventKey="Liquidación" title="Liquidación">
         <Form style={{ border: "0.5px solid #ccc", borderRadius: "5px", boxShadow: "1px 2px 5px #ccc", padding: "20px" }}>

          <Liquidacion />
           

         </Form>
      </Tab>
      <Tab eventKey="Mas Datos" title="Mas Datos" >
         <Form style={{ border: "0.5px solid #ccc", borderRadius: "5px", boxShadow: "1px 2px 5px #ccc", padding: "20px" }}>
         </Form>
      </Tab>

      <Tab eventKey="Registro" title="Registro" >
         <Form style={{ border: "0.5px solid #ccc", borderRadius: "5px", boxShadow: "1px 2px 5px #ccc", padding: "20px" }}>
        </Form>
      </Tab>

      

    </Tabs>

   
  </>
  );
};

// Export statement
export default Form_laorden;
