// import { useEffect } from "react";
import { GetStatusLogin } from "../GetStatusLogin";


import Grids_laorden from "../tables/Grids_laorden";
import Form_laorden from "../Forms/Form_laorden";
import Form_example from "../Forms/Form_example";

export const Laorden = () => {

  const { status } = GetStatusLogin();

  const setingPage = {
    title: "Pagina La Orden",
    initialForm: {
      sucursal: '',
      numero_orden: '01',
      fac: '',
      estado: '',
      fecha: null,
      identificacion:'',
      nombre:'',
      apellidos:'',
      codempresa: '',
      mipres:'',
      poliza:'',
      autoriz:'',
      motivo:'',
      origen:'',
      prioridad:'',
      entrega:'',
      web:'',
      fecha_solicitud: null,
      medico: '',
      nivel_pac:'',
      embarazo:'',
      cotizacion:'',
      pendiente_aprob:'',

    },
    metodos: {
      insert: 'insert',
      selectlaorden: 'selectlaorden',
      selectsucursal: 'selectsucursal',
      delete: 'delete'
    }
  }

  return (
  <>
    { status ? ( 
          
          <div  className="container" >
            <h1> {setingPage.title} </h1>
            <div className='row'>
              <div className='col-sm'>
              <Form_laorden initialForm={setingPage} />
               
              </div> 
            </div>
            <div className='row'>
              <div className='col-sm'>
              {/* <Grids_laorden /> */}
              </div>
            </div>
          </div>
          ): ( 
          
            <div  className="container" >
              <h1> {setingPage.title} </h1>
              <div className='row'>
                <div className='col-sm'>
                <Form_laorden initialForm={setingPage} />         
                </div> 
              </div>
              <div className='row'>
                <div className='col-sm'>
                {/* <Grids_laorden /> */}
                </div>
              </div>
            </div>
            )}
  </>
  );
}