import {Link, NavLink} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../useContext/Account';
import { GetStatusLogin } from "../GetStatusLogin";

export const NavBar = () => {

  const { status_login } = GetStatusLogin();

  const [status, setStatus] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session: ', session);
        setStatus(true);
      })
      .catch((err) => {
        console.log('Session: ', err);
        setStatus(false);
      });
  }, [status]);


  return (

    <>
    { status_login ? ( 
    
    
   


<nav className="navbar navbar-expand-lg navbar-light bg-light rouder-3">
  <div className="container-fluid">

    <Link className="navbar-brand" to="/">Symedic</Link>

    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav">

      <NavLink
      
       className={ ( { isActive } )=> `nav-link ${ isActive ? 'active' : ''}` }
        
        to="home" >

        home
      </NavLink>
      
      <NavLink
       className={ ( { isActive } )=> `nav-link ${ isActive ? 'active' : '' }` }
        
        to="/login" >

       login
      </NavLink>

      <NavLink
       className={ ( { isActive } )=> `nav-link ${ isActive ? 'active' : '' }` }
        
        to="/laorden" >

        laorden
      </NavLink>


      </ul>

    </div>

    <div >
      
      {status ? (
        <form className="d-flex">
          {' '}

          <Link className="navbar-brand" to="/">
          
          <button className='btn btn-outline-success' onClick={logout}>Logout</button>

          </Link>
          
          </form>
      ) 
      
    
      : (
        ''
      )}
   
    </div>


  </div>
</nav>
  ): ( "" )}
</>
  )

}
