import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import { FichaEvaluacion } from './pages/FichaEvaluacion';
import ProtectedRoutesLogin from './components/ProtectedRoutesLogin';
import Signup from './pages/Signup';
import Sidebar from './components/sidebarDropdown/Sidebar';
import { Importacion } from './pages/Importacion';
import { ReporteBase } from './pages/ReporteBase';
import { FichaEvaluacionTable } from './pages/FichaEvaluacionTable';
import { useSelector } from 'react-redux';
import UsuariosView from './pages/UsuariosView';
// import ErrorModal from './components/ErrorModal';

function App() {

  const user = useSelector( state => state.user.user );

  return (
    <>

    {
      user && <Sidebar/>
    }

    <div className="App">
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route element={<ProtectedRoutesLogin/>}>
            
            {
              user?.cargo === 'admin' ? <Route path='/' element={<Importacion/>}/>
              : <Route path='/' element={<FichaEvaluacion/>}/>
            }
            <Route path='/table' element={<FichaEvaluacionTable/>}/>
            <Route path='/base' element={<ReporteBase/>}/>
            <Route path='/importacion' element={<Importacion/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/users' element={<UsuariosView/>}/>
          </Route>
        </Routes>
    </div>

    </>
  )
}

export default App
