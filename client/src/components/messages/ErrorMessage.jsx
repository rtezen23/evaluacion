import React from 'react'
import './errorMessage.css'
import {VscError} from 'react-icons/vsc';

export const ErrorMessage = ({handleErrorMessage, message}) => {

  return (
    <div className='message-global'>
        <div className='message-container-error' >
            <VscError className='wrong'/>
            <h3>{message}</h3>
            <div className='message-close-error' onClick={handleErrorMessage}>Aceptar</div>
        </div>
    </div>
  )
}
