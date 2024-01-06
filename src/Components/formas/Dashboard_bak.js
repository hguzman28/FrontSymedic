import React, { useState, useEffect } from 'react'; 
import {  Button,  Table,  Modal,  Form,  Alert,} from 'react-bootstrap'; 

//  START INLCUIR 
import { Navigate  } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

 const Dashboard = () => { 

//  START INLCUIR 
const { status } = GetStatusLogin(); //Inlcuir
// const [status, setstatus] = useState(false); 
const { getUser,logout } = useContext(AccountContext);
const user =  getUser();

console.log("#########"); 
console.log(user)
console.log(status)
//  END INLCUIR 


// const [alert, setAlert] = useState(''); 
//  useEffect(() => { 
 
//  }, []); 
const baseurl = `${process.env.REACT_APP_ENDPOINT_DATA}/agencias/`; 
const baseurlov = `${process.env.REACT_APP_ENDPOINT_DATA}/lov/`; 

 
// ******************* fin ******************************** 
  return ( 
    <>
    { user && user.username ? ( 

    <> 
      <h1>Symedic</h1> 
      {/* {alert && ( 
        <Alert variant='success' onClose={() => setAlert('')} dismissible> 
          {alert} 
        </Alert> 
      )}  */}

      <br></br>
      <div>
      Bienvenido: {user.username}
      </div>
      <br></br>
      <div>
      <Button onClick={logout} className='mb-3'> 
        Logout 
      </Button>
      </div> 
 </> 

): ( <Navigate to="/login" /> )  }
</>

); }
export default Dashboard;