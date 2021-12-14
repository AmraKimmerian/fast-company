import api from './api'
import { useEffect, useState } from 'react'
import Users from './component/users'

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {}, [
    api.users.fetchAll().then((result) => {
      setUsers(result)
    })
  ])

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
      {users && (
        <Users
          users={users}
          onDeleteUser={handleDeleteUser}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </>
  )
}

export default App
