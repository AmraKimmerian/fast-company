import React, { useState } from 'react'
import api from '../api'
import User from './user'
import SearchStatus from './searchStatus'
import Pagination from './pagination'

const Users = ({users, ...rest}) => {

  const columnNames = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', 'Избранное','-']

  const count = users.length
  const pageSize = 4

  const handlePageChange = (pageIndex) => {
    console.log('page', pageIndex);
  }

  return (
    <>
      {count > 0 &&
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
      <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange}/>
    </>
  )

}

export default Users