import './App.css';
import {AfisareSedinte} from './AfisareSedinte';
import {Client} from './Client';
import { SedintaClient } from './SedintaClient';
import { ProbaScrisaClient } from './ProbaScrisaClient';
import { AfisareProbe } from './AfisareProbe';
import { BrowserRouter, Route, NavLink, Routes} from 'react-router-dom';
import { ProbaPracticaClient } from './ProbaPracticaClient';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Scoala de Soferi
        </h3>
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/afisare-sedinte"}>Afisare sedinte</NavLink>
            </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/afisare-probe"}>Afisare probe</NavLink>
              </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/client"}>Lista clienti</NavLink>
            </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/sedinta-client"}>Sedinte clienti</NavLink>
            </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/proba-scrisa-client"}>Proba scrisa</NavLink>
            </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/proba-practica-client"}>Proba practica</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/afisare-probe" element={<AfisareProbe />} />
          <Route path="/afisare-sedinte" element={<AfisareSedinte />} />
          <Route path="/client" element={<Client />} />
          <Route path="/sedinta-client" element={<SedintaClient />} />
          <Route path="/proba-scrisa-client" element={<ProbaScrisaClient />} />
          <Route path="/proba-practica-client" element={<ProbaPracticaClient />} />
        </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
