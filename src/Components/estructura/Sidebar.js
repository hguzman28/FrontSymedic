import React, { useState, useEffect } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';



import { NavLink } from 'react-router-dom';
//  START INLCUIR 
import { Navigate } from 'react-router-dom';
import { GetStatusLogin } from "../GetStatusLogin";
import { useContext } from 'react';                     //Inlcuir
import { AccountContext } from '../useContext/Account'; //Inlcuir
//  END INLCUIR 

const Sidebar = () => {

  const [usuario, setUsuario] = useState('FCHARRIS');
  const [expanded, setExpanded] = useState(false);
  const [menuData, setMenuData] = useState(null);

  //  START INLCUIR 
  const { status } = GetStatusLogin(); //Inlcuir
  // const [status, setstatus] = useState(false); 
  const { getUser, logout } = useContext(AccountContext);
  const user = getUser();

  console.log("#########");
  console.log(user)
  console.log(status)
  //  END INLCUIR 

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (user)
    {
    setUsuario(user.username.toUpperCase());
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT_DATA}/usuarioopciones/find/${usuario}`);
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
    }
  }, []);

  const renderMenuItems = () => {
    if (menuData && menuData.carpetas) {
      return menuData.carpetas.map((carpeta, index) => (
        <CDBSidebarMenu key={index}>
          <CDBSidebarMenuItem icon="columns">{carpeta.carpeta}</CDBSidebarMenuItem>
          {carpeta.opciones.map((opcion, subIndex) => (
            <NavLink key={subIndex} exact to={opcion.ruta} activeClassName="activeClicked">
              <CDBSidebarMenuItem>{opcion.nombre}</CDBSidebarMenuItem>
            </NavLink>
          ))}
        </CDBSidebarMenu>
      ));
    }

    return null;
  };

  return (
    <>
      {user && user.username ? (
        <>
          <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333" expanded={expanded}>
              <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={toggleSidebar}></i>}>
                <a href="/Dashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
                  Menú
                </a>
                
              </CDBSidebarHeader>

              <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                  {renderMenuItems()}
                </CDBSidebarMenu>
              </CDBSidebarContent>

              <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div style={{ padding: '20px 5px' }}>Symedic</div>
                
              </CDBSidebarFooter>
            </CDBSidebar>
          </div>
                
        </>
      ) : ("")}

    </>);
};

export default Sidebar;
