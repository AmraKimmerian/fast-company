import { Redirect, useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditUserPage from '../components/page/userEditPage'
import UserProvider from '../hooks/useUsers'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'
import UsersLoader from '../components/hoc/usersLoader'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  const currentUserId = useSelector(getCurrentUserId())

  return (
    <UsersLoader>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <EditUserPage userId={userId} />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </UsersLoader>
  )
}

export default Users
