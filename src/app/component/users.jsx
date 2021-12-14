import React, { useEffect, useState } from 'react'
import User from './user'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import GroupList from './group-list'
import api from '../api'
import SearchStatus from './searchStatus'

const Users = ({ users: allUsers, ...rest }) => {
  const columnNames = [
    'Имя',
    'Качества',
    'Профессия',
    'Встретился, раз',
    'Оценка',
    'Избранное',
    '-'
  ]

  const pageSize = 2
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  useEffect(() => {
    console.log('send request')
    api.professions.fetchAll().then((result) => {
      setProfessions(result)
    })
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const filteredUser = selectedProf
    ? allUsers.filter((user) => user.profession._id === selectedProf._id)
    : allUsers
  const count = filteredUser.length
  const userCrop = paginate(filteredUser, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf(undefined)
  }

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex shrink-0 p-3">
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus usersCount={count} />
        {count > 0 && (
          <table className="table">
            <thead>
              <tr>
                {columnNames.map((name) => (
                  <th scope="col" key={name}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userCrop.map((user) => (
                <User key={user._id} {...user} {...rest} />
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Users
