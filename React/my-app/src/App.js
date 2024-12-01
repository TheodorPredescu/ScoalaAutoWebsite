import logo from './logo.svg';
import './App.css';
import {AfisareSedinte} from './AfisareSedinte';
import {Client} from './Client';
import { SedintaClient } from './SedintaClient';
import { ProbaScrisaClient } from './ProbaScrisaClient';
import { BrowserRouter, Route, NavLink, Routes} from 'react-router-dom';

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
              <NavLink className="btn btn-light btn-outline-primary" to={"/afisare-sedinte"}>AfisareSedinte</NavLink>
            </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/client"}>Client</NavLink>
            </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/sedinta-client"}>Sedinta Client</NavLink>
            </li>
            <li className="nav-item- m-2">
              <NavLink className="btn btn-light btn-outline-primary" to={"/proba-scrisa-client"}>Proba scrisa</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/afisare-sedinte" element={<AfisareSedinte />} />
          <Route path="/client" element={<Client />} />
          <Route path="/sedinta-client" element={<SedintaClient />} />
          <Route path="/proba-scrisa-client" element={<ProbaScrisaClient />} />
        </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
