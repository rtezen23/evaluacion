import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import './usuariosView.css';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import ChangePassword from './ChangePassword';

const USERS_URL = `${import.meta.env.VITE_API_URL}api/v1/users/`;

const UsuariosView = () => {

    const [users, setUsers] = useState([])
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
      axios.get(USERS_URL)
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err))
    }, [])

    const handleEditUser = (id) => {
        setShowChangePassword(true)
        setCurrentUser(id)
    }
    
  return (
    <div>
        <h1 className='usersView-insert-table-title'>Usuarios</h1>
        { showChangePassword && <ChangePassword setShowChangePassword={setShowChangePassword} currentUser={currentUser}/> }
        <table className='usersView-insert-table'>
            <thead className='usersView-insert-table__head'>
                <tr className='usersView-insert-table__header'>
                    <th className='usersView-insert-table__header-item'>NOMBRES</th>
                    <th className='usersView-insert-table__header-item'>USUARIO</th>
                    <th className='usersView-insert-table__header-item'>EDITAR</th>
                </tr>
            </thead>
            <tbody className='usersView-insert-table__body'>
                {
                    users.map((user) => (
                            <tr className='usersView-insert-table__row' key={user.id}>
                                <td className='usersView-insert-table__cell usersView-insert-table-nombres'>{user.nombres}</td>
                                <td className='usersView-insert-table__cell usersView-insert-table-usuario'>{user.usuario}</td>
                                <td className='usersView-insert-table__options'>
                                    <AiFillEdit className='usersView-edit' onClick={()=>handleEditUser(user.usuario)}/>
                                    <AiFillDelete className='usersView-delete'/>
                                </td>
                            </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default UsuariosView