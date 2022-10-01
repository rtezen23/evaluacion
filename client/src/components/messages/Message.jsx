import React from 'react'
import './message.css'
import {AiFillCheckCircle} from 'react-icons/ai';

export const Message = ({handleMessage, message}) => {
  return (
    <div className='message-global'>
        <div className='message-container' >
            <AiFillCheckCircle className='check'/>
            <h3>{message}</h3>
            <div className='message-close' onClick={handleMessage}>Aceptar</div>
        </div>
    </div>
  )
}
