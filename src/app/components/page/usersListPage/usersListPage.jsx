import React, { useEffect, useState } from 'react'
import Pagination from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import GroupList from '../../common/group-list'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/userTable'
import _ from 'lodash'
import SearchBar from '../../common/searchBar'
import { useUsers } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'

const UsersListPage = () => {
  const pageSize = 8
  const { currentUser } = useAuth()
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const [currentPage, setCurrentPage] = useState(1)
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
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleSearchChange = (word) => {
    setSelectedProf(undefined)
    setSearchQuery(word)
  }

  function filterUsers(data) {
    const filteredUsers = selectedProf
      ? data.filter((user) => user.profession._id === selectedProf._id)
      : searchQuery
      ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data
    return filteredUsers.filter((u) => u._id !== currentUser._id)
  }

  if (users) {
    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf(undefined)
    }

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
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
