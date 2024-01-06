// import { useEffect } from "react";
import { GetStatusLogin } from "../GetStatusLogin";

import Form_medico from '../Forms/Form_medico';
import Grids_medico from '../tables/Grids_medico';
import Form_Mediospago from "../Forms/Form_Mediospago";


export const MedioDePagos = () => {

  const { status } = GetStatusLogin();

  const setingPage = {
    title: "Medio de pagos",
    initialForm: {
      username: '',
      email: '',
      fecha: null,
      options: null
    },
    metodos: {
      insert: 'insert',
      select: 'select',
      selectoptions: 'selectoptions',
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
              <Form_medico initialForm={setingPage} />
              <Form_Mediospago />      
              </div> 
            </div>
          </div>
          ): ( "" )}
  </>
  );
}