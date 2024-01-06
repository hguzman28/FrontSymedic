// import { useEffect } from "react";
import { GetStatusLogin } from "../GetStatusLogin";
// import { Redirect } from 'react-router-dom'; // Importa Redirect
import Form_medico from '../Forms/Form_medico';
import Grids_medico from '../tables/Grids_medico';


import { useContext } from 'react';
import { AccountContext } from '../useContext/Account';

export const Medico = () => {
 
  const { status } = GetStatusLogin();


  const { getUser } = useContext(AccountContext);
  const user =  getUser();
  console.log("#########"); 
  console.log(user.username);

  const setingPage = {
    title: "Pagina Medico",
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
              </div> 
            </div>
            <div className='row'>
              <div className='col-sm'>
              <Grids_medico />
              </div>
            </div>
          </div>
          ): ( "" )}
  </>
  );
}