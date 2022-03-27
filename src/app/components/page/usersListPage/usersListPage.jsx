import React, { useEffect, useState } from 'react'
import Pagination from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import GroupList from '../../common/group-list'
import api from '../../../api'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/userTable'
import _ from 'lodash'
import SearchBar from '../../common/searchBar'
import { useUsers } from '../../../hooks/useUsers'

const UsersListPage = () => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  const { users } = useUsers()

  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId))
    console.log(userId)
  }

  const handleToggleBookmark = (userId) => {
    const newArray = users.map((user) => {
      if (user._id === userId) return { ...user, bookmark: !user.bookmark }
      return user
    })
    // setUsers(newArray)
    console.log(newArray)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSearchQuery('')
    setSelectedProf(item)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  useEffect(() => {
    api.professions.fetchAll().then((result) => {
      setProfessions(result)
    })
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleSearchChange = (word) => {
    setSelectedProf(undefined)
    setSearchQuery(word)
  }

  if (users) {
    const filteredUser = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : searchQuery
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : users
    const count = filteredUser.length
    const sortedUsers = _.orderBy(filteredUser, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

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
          <SearchBar
            word={searchQuery}
            handleSearchChange={handleSearchChange}
          />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
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
  return 'loading'
}

export default UsersListPage
