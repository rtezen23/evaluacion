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
// import ErrorModal from './components/ErrorModal';

function App() {

  return (
    <>
    <Sidebar/>

    <div className="App">
      <Routes>
          <Route path='/login' element={<Login/>}/>
          {/* <Route element={<ProtectedRoutesLogin/>}> */}
            <Route path='/' element={<FichaEvaluacion/>}/>
            <Route path='/importacion' element={<Importacion/>}/>
            <Route path='/signup' element={<Signup/>}/>
          {/* </Route> */}
        </Routes>
    </div>

    </>
  )
}

export default App
