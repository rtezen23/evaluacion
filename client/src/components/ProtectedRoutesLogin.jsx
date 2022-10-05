import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutesLogin = () => {

    const token = localStorage.getItem('token');
    const isAuth = useSelector(state => state.user.isAuth);

    if(token && isAuth){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }                     
};                        

export default ProtectedRoutesLogin;