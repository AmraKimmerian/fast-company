import api from './api'
import { useState } from 'react'
import Users from './component/users'
import SearchStatus from './component/searchStatus'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookmark = (userId) => {
    console.log(userId)
    setUsers(
      users.map((user) => {
        if (user._id === userId) return { ...user, bookmark: !user.bookmark }
        return user
      })
    )
  }

  return (
    <>
      <SearchStatus usersCount={users.length} />
      <Users
        users={users}
        onDeleteUser={handleDeleteUser}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  )
}

export default App
