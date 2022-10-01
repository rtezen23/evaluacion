import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {FaUserLock} from 'react-icons/fa';
import {FaUserAlt} from 'react-icons/fa';
import {ImArrowRight} from 'react-icons/im';
import './signup.css';

const optionsCargo = [
  { value: 'admin', label: 'admin' },
  { value: 'asesor', label: 'asesor' },
];

function Signup() {

  const [userData, setUserData] = useState({
      nombres: '',
      apellidos: '',
      cargo: '',
      usuario: '',
      password: '',
    })
console.log(userData)
    const API_URL = `${import.meta.env.VITE_API_URL}api/v1/users/signup`;
    
    const navigate = useNavigate();

    const handleChange = (event) => {
      setUserData(prevUserData => {
          return {
              ...prevUserData,
              [event.target.name]: event.target.value
          }
      })
  }

  const handleCargo = data => {
		setUserData(prevUserData => {
            return {
                ...prevUserData,
                cargo: data.value
            }
        })
	};

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
          .post(API_URL, userData)
          .then(res => {
              alert('Usuario creado')
              navigate('/login');
          })
          .catch(err => {
                console.log(err)
          });
    }

    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit} className='signup-form__container'>
              <div className='signup-form__header'>
                <FaUserAlt className='signup-form__icon'/>
                <h1 className='signup-form__h1'>Crear usuario</h1>
              </div>
              <div className='signup-form__container-label__input'>
                <div className='signup-form__container-label'>
                  <label htmlFor="nombres">Nombres</label>
                  <label htmlFor="apellidos">Apellidos</label>
                  <label htmlFor="cargo">Cargo</label>
                  <label htmlFor="usuarios">Usuarios</label>
                  <label htmlFor="password">Password</label>
                </div>
                <div className='signup-form__container-input'>
                  <input type="text" name='nombres' onChange={handleChange}/>
                  <input type="text" name='apellidos' onChange={handleChange}/>
                  <Select options={optionsCargo} onChange={handleCargo}/>
                  <input type="text" name='usuario' onChange={handleChange}/>
                  <input type="password" name='password' onChange={handleChange}/>
                </div>
              </div>
              <button className='signup-form__btn'>Registrar</button>
            </form>
        </div>
      );
}

export default Signup;