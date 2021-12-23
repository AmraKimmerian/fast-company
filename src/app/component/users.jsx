import { useParams } from 'react-router-dom'
import User from './user'
import UsersList from './usersList'

const Users = () => {
  const params = useParams()
  const { userId } = params
  return userId ? <User userId={userId} /> : <UsersList />
}

export default Users
