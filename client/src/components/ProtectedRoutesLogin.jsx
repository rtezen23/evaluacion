import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoutesLogin = () => {

    // const token = localStorage.getItem('token');

    if(true){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }                     
};                        

export default ProtectedRoutesLogin;