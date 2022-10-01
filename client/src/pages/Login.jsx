import React from 'react';
import './login.css'
import { RiMapPinUserFill } from 'react-icons/ri';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Message } from '../components/messages/Message';
import { ErrorMessage } from '../components/messages/ErrorMessage';

const API_URL = `${import.meta.env.VITE_API_URL}api/v1/users/login`;

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
		e.preventDefault();

		axios
			.post(API_URL, {usuario, password})
			.then(res => {
				localStorage.setItem('token', res.data.token)
                setShowMessage(true);
			})
			.catch(error => {
                    console.log(error)
                    setShowErrorMessage(true);
            })
	};

    const handleMessage = () => {
        setShowMessage(false);
        navigate('/');
    }

    const handleErrorMessage = () => {
        setShowErrorMessage(false);
    }

  return (
    <div className='login-page'>
        { showMessage && <Message handleMessage={handleMessage} message='Usuario Correcto'/> }
        { showErrorMessage && <ErrorMessage handleErrorMessage={handleErrorMessage} message='Datos incorrectos'/> }
        <div className='login-body'>
            <RiMapPinUserFill className='login-title'/>
            <form className='login-container' onSubmit={onSubmit}>
                <div className='login-usuario'>
                    <label htmlFor="usuario" className='login-usuario__label'>Usuario</label>
                    <input type="text" name="usuario" id="usuario" className='login-usuario__input' value={usuario} onChange={e => setUsuario(e.target.value)} required/>
                </div>

                <div className='login-password'>
                    <label htmlFor="usuario" className='login-password__label'>Contraseña</label>
                    <input type="password" name="password" id="password" className='login-usuario__password' value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>

                <button className='login-button'>Enviar</button>
            </form>
        </div>
    </div>
  )
}

export default Login