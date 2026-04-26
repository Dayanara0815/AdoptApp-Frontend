import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './pages/Registro';
import VerificarRegistro from './pages/VerificarRegistro';
import RegistroExitoso from './pages/RegistroExitoso';
import Login from './pages/Login';
import RecuperarContrasena from './pages/RecuperarContrasena';
import VerificarRecuperacion from './pages/VerificarRecuperacion';
import NuevaContrasena from './pages/NuevaContrasena';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/verificar-registro" element={<VerificarRegistro />} />
        <Route path="/registro-exitoso" element={<RegistroExitoso />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="/verificar-recuperacion" element={<VerificarRecuperacion />} />
        <Route path="/nueva-contrasena" element={<NuevaContrasena />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
