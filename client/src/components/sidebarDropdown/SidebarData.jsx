import React from 'react';
import * as RiIcons from 'react-icons/ri';
import {CgPhone} from 'react-icons/cg';
import {VscBook} from 'react-icons/vsc';
import {BiPowerOff} from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Ficha evaluación',
    path: '/',
    icon: <VscBook />,
    cName: 'nav-text'
  },
  {
    title: 'Importación',
    path: '/importacion',
    icon: <CgPhone/>,
    cName: 'nav-text'
  },
  {
    title: 'Registro usuario',
    path: '/signup',
    icon: <RiIcons.RiPencilRulerFill />,
    cName: 'nav-text'
  },
  {
    title: 'Cerrar sesión',
    path: '/login',
    icon: <BiPowerOff />,
    cName: 'nav-text'
  }
];