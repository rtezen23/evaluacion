import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import {BiPowerOff} from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { BiImport } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { SidebarData } from './SidebarData';
import './sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/user.actions';
import {HiDocumentText} from 'react-icons/hi';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const user = useSelector(state => state.user.user);
  const isAuth = useSelector(state => state.user.isAuth);

  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          {
            isAuth &&
            <div className='log-out' onClick={handleLogOut}>
              <BiPowerOff className='log-out__icon' />
              <p className='log-out__text'>Log Out</p>
            </div>
          }
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className='sidebar-username'>{user?.nombres} {user?.apellidos}</li>
            
            {
              user.cargo === 'monitor' && SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })
            }
            { user &&
            <>
                  <li className={`nav-text ${user?.cargo !=='admin' ? 'item-hidden' : ''}`}>
                    <Link to='/importacion'>
                      <BiImport className='nav-icon'/>
                      <span>IMPORTAR BASE</span>
                    </Link>
                  </li>
                  <li className={`nav-text ${user?.cargo !=='admin' ? 'item-hidden' : ''}`}>
                    <Link to='/base'>
                      <HiDocumentText className='nav-icon'/>
                      <span>REGISTRO BASE</span>
                    </Link>
                  </li>
                  <li className={`nav-text ${user?.cargo !=='admin' ? 'item-hidden' : ''}`}>
                    <Link to='/table'>
                      <HiDocumentText className='nav-icon'/>
                      <span>REGISTRO FICHAS</span>
                    </Link>
                  </li>
                  <li className={`nav-text ${user?.cargo !=='admin' ? 'item-hidden' : ''}`}>
                    <Link to='/users'>
                      <FiUsers className='nav-icon'/>
                      <span>LISTA USUARIOS</span>
                    </Link>
                  </li>
                  <li className={`nav-text ${user?.cargo !=='admin' ? 'item-hidden' : ''}`}>
                  <Link to='/signup'>
                    <FiUserPlus className='nav-icon'/>
                    <span>CREAR USUARIO</span>
                  </Link>
                </li>
                </>
             }
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;