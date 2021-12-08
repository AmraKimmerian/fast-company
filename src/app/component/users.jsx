import React, { useState } from 'react'
import api from '../api'
import User from './user'
import SearchStatus from './searchStatus'

const Users = ({users, ...rest}) => {

  const columnNames = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', 'Избранное','-']

  return (
    <>
      {users.length > 0 &&
        <table className='table'>
          <thead>
            <tr>
              {columnNames.map(name => <th scope='col' key={name}>{name}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.map(user => <User key={user._id} {...user} {...rest}/>)}
          </tbody>
        </table>
      }
    </>
  )

}

export default Users