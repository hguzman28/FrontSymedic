import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import { Account } from './Components/useContext/Account';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
import { NavBar } from './Components/estructura/NavBar';
import { Medico } from './Components/pages/Medico';
import { Laorden } from './Components/pages/Laorden';
import Sidebar from './Components/estructura/Sidebar';
import Resultados from './Components/formas/Resultados';
// import Mediospago from './Components/Forms/Mediospago';
import Labordenpago from './Components/Forms/Labordenpago';
import Examenemp from './Components/formas/Examenemp';
import Lista from './Components/formas/Lista';
import Mediospago from './Components/formas/Mediospago';
import Undnegocios from './Components/formas/Undnegocios';
import Agencias from './Components/formas/Agencias';
import Combos from './Components/formas/Combos';
import Combosdet from './Components/formas/Combosdet';
import Feriados from './Components/formas/Feriados';
import Ipsconsec from './Components/formas/Ipsconsec';
import Labdepends from './Components/formas/Labdepends';
import Labempresas from './Components/formas/Labempresas';
import Lablistas from './Components/formas/Lablistas';
import Labseccion from './Components/formas/Labseccion';
import Labvalores from './Components/formas/Labvalores';
import Medicos from './Components/formas/Medicos';
import Ocupaciones from './Components/formas/Ocupaciones';
import Tipomuestras from './Components/formas/Tipomuestras';
import Unidades from './Components/formas/Unidades';
import Vinculaciones from './Components/formas/Vinculaciones';
import Opciones from './Components/formas/Opciones';
import Roleopcion from './Components/formas/Roleopcion';
import Roles from './Components/formas/Roles';
import Usuarios from './Components/formas/Usuarios'; 
import Labtarifas from './Components/formas/Labtarifas'; 
import Pacientes from './Components/formas/Pacientes'; 
import Usuariorole from './Components/formas/Usuariorole'; 
import Examenana from './Components/formas/Examenana'; 
//import Examenes from './Components/formas/Examenes'; 
//import Analisis from './Components/formas/Analisis'; 
import Labnormal from './Components/formas/Labnormal'; 
import Dashboard from './Components/formas/Dashboard'; 
import Zbi from './Components/formas/Zbi'; 
import Reglasimp from './Components/formas/Reglasimp'; 
import Ordenlab from './Components/formas/Ordenlab'; 



//import Zbi from './Components/formas/Zbi';

function App() {
  return (
    <Account>
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Medico />} />
              <Route path="/laorden" element={<Laorden />} />
              <Route path="/Medico" element={<Medico />} />
              <Route path="/MedioDePagos" element={<Mediospago />} />
              <Route path="/Resultados" element={<Resultados />} />
              <Route path="/Mediospago" element={<Mediospago />} />
              <Route path="/Labordenpago" element={<Labordenpago />} />
              <Route path="/Examenemp" element={<Examenemp />} />
              <Route path="/Lista" element={<Lista />} />
              <Route path="/Mediospago" element={<Mediospago />} />
              <Route path="/Undnegocios" element={<Undnegocios />} />
              <Route path="/Agencias" element={<Agencias />} />
              <Route path="/Combos" element={<Combos />} />
              <Route path="/Combosdet" element={<Combosdet />} />
              <Route path="/Feriados" element={<Feriados />} />
              <Route path="/Ipsconsec" element={<Ipsconsec />} />
              <Route path="/Labdepends" element={<Labdepends />} />
              <Route path="/Labempresas" element={<Labempresas />} />
              <Route path="/Lablistas" element={<Lablistas />} />
              <Route path="/Labseccion" element={<Labseccion />} />
              <Route path="/Labvalores" element={<Labvalores />} />
              <Route path="/Medicos" element={<Medicos />} />
              <Route path="/Ocupaciones" element={<Ocupaciones />} />
              <Route path="/Tipomuestras" element={<Tipomuestras />} />
              <Route path="/Unidades" element={<Unidades />} />
              <Route path="/Vinculaciones" element={<Vinculaciones />} />
              <Route path="/Opciones" element={<Opciones />} />
              <Route path="/Roleopcion" element={<Roleopcion />} />
              <Route path="/Roles" element={<Roles />} />
              <Route path="/Usuarios" element={<Usuarios />} /> 
              <Route path="/Dashboard" element={<Dashboard />} /> 
              <Route path="/Labtarifas" element={<Labtarifas />} />
              <Route path="/Pacientes" element={<Pacientes />} />
              <Route path="/Usuariorole" element={<Usuariorole />} />
              <Route path="/Examenana" element={<Examenana />} />   
              <Route path="/Labnormal" element={<Labnormal />} />  
              <Route path="/Zbi" element={<Zbi />} /> 
              <Route path="/Reglasimp" element={<Reglasimp />} /> 
              <Route path="/Ordenlab" element={<Ordenlab />} /> 
              {/* Resto de las rutas */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Account>
  );
}

export default App;
