import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const counterClasses = `badge m-1 p-2 ${users.length === 0 ? 'bg-danger' : 'bg-primary'}`
  const counterText = users.length === 0 ? 'Никто с тобой не тусанет' : `${users.length} человек тусует с тобой сегодня`
  const counter = <span className={counterClasses}>{counterText}</span>

  const columnNames = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', '']
  const header = (
    <thead>
    <tr>
      {columnNames.map(name => <th scope='col' key={name}>{name}</th>)}
    </tr>
    </thead>
  )

  const getQualityBadge = (quality) => {
    return (
      <span className={`badge m-1 p-1 bg-${quality.color}`} key={quality._id}>{quality.name}</span>
    )
  }

  const handleDeleteUser = userToDelete => {
    setUsers(users.filter(user => user._id !== userToDelete._id ))
  }

  const getRow = (user) => {
    return (
      <tr key={user._id}>
        <th scope='row'>{user.name}</th>
        <td>{user.qualities.map((quality) => getQualityBadge(quality))}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td><button type='button' className='btn btn-danger' onClick={() => handleDeleteUser(user)}>delete</button></td>
      </tr>
    )
  }
  const body = (
    <tbody>
      {users.map(user => getRow(user))}
    </tbody>
  )

  return (
    <>
      {counter}
      {users.length > 0 &&
        <table className='table'>
          {header}
          {body}
        </table>
      }
    </>
  )

}

export default Users